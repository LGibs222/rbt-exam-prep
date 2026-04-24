import { useState, useEffect, useRef, useCallback } from 'react'
import { PRETEST_QUESTIONS } from './data/pretest.js'
import { MODULES } from './data/modules.js'
import { QUESTION_BANK } from './data/questions.js'

// ─── constants ────────────────────────────────────────────────────────────────
const DOMAIN_NAMES = [
  'Data Collection and Graphing',
  'Behavior Assessment',
  'Behavior Acquisition',
  'Behavior Reduction',
  'Documentation and Reporting',
  'Ethics',
]

const DOMAIN_LETTERS = { A: 'Data Collection and Graphing', B: 'Behavior Assessment', C: 'Behavior Acquisition', D: 'Behavior Reduction', E: 'Documentation and Reporting', F: 'Ethics' }
const LETTER_OF = Object.fromEntries(Object.entries(DOMAIN_LETTERS).map(([k, v]) => [v, k]))

const DOMAIN_COLORS = {
  'Data Collection and Graphing': '#2c6e49',
  'Behavior Assessment': '#1d4ed8',
  'Behavior Acquisition': '#7c3aed',
  'Behavior Reduction': '#dc2626',
  'Documentation and Reporting': '#b45309',
  'Ethics': '#0f766e',
}

const CONCEPT_TYPES = [
  { label: 'Core Concept',          icon: '📖', color: '#1a3a5c', bg: '#e8f0fb', border: '#93c5fd' },
  { label: 'Key Principles',        icon: '⚙️',  color: '#166534', bg: '#f0fdf4', border: '#86efac' },
  { label: 'Critical Distinction',  icon: '⚠️',  color: '#92400e', bg: '#fffbeb', border: '#fcd34d' },
  { label: 'Exam Strategy',         icon: '💡', color: '#5b21b6', bg: '#f5f3ff', border: '#c4b5fd' },
]

const DOMAIN_ICONS = {
  'Data Collection and Graphing': '📊',
  'Behavior Assessment': '🔍',
  'Behavior Acquisition': '🎓',
  'Behavior Reduction': '📉',
  'Documentation and Reporting': '📋',
  'Ethics': '⚖️',
}

// Exam proportions per domain (75 total)
const EXAM_DOMAIN_COUNTS = { A: 12, B: 9, C: 19, D: 14, E: 10, F: 11 }
const EXAM_DURATION = 90 * 60 // seconds

// ─── helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function shuffleQuestion(q) {
  const idx = [0,1,2,3]
  for (let i = 3; i > 0; i--) { const j = Math.floor(Math.random()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]] }
  return {...q, options: idx.map(i => q.options[i]), correct: idx.indexOf(q.correct)}
}

function shuffleQuestions(qs) {
  return [...qs].sort(() => Math.random() - 0.5).map(shuffleQuestion)
}

function buildExam() {
  const result = []
  for (const [letter, count] of Object.entries(EXAM_DOMAIN_COUNTS)) {
    const pool = QUESTION_BANK.filter(q => q.domain === letter)
    const picked = shuffle(pool).slice(0, count)
    result.push(...picked)
  }
  return shuffle(result).map(shuffleQuestion)
}

function scoreDomains(questions, answers) {
  const totals = {}, corrects = {}
  DOMAIN_NAMES.forEach(d => { totals[d] = 0; corrects[d] = 0 })
  questions.forEach((q, i) => {
    const dn = q.domain_name
    if (!totals[dn] === undefined) return
    totals[dn] = (totals[dn] || 0) + 1
    if (answers[i] === q.correct) corrects[dn] = (corrects[dn] || 0) + 1
  })
  return DOMAIN_NAMES.map(dn => ({
    name: dn,
    total: totals[dn] || 0,
    correct: corrects[dn] || 0,
    pct: totals[dn] ? Math.round(((corrects[dn] || 0) / totals[dn]) * 100) : null,
  }))
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0')
  const s = (sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ─── initial state ────────────────────────────────────────────────────────────
const INITIAL = {
  phase: 'welcome',
  // pretest
  pretestQuestions: [],
  pretestAnswers: {},  // index → choice
  pretestSubmitted: false,
  pretestDomainScores: null, // array of {name, total, correct, pct}
  weakDomains: [],
  // modules
  moduleStatus: {},    // domain_name → 'locked'|'available'|'passed'
  activeModule: null,  // domain_name
  modulePhase: 'content', // 'content'|'quiz'
  moduleQuizAnswers: {},
  moduleQuizSubmitted: false,
  // exam
  examQuestions: null, // array
  examAnswers: {},     // index → choice
  examFlagged: {},     // index → bool
  examCurrentIdx: 0,
  examStartTime: null,
  examTimeLeft: EXAM_DURATION,
  examSubmitted: false,
  examDomainScores: null,
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ phase, pretestSubmitted, moduleStatus, weakDomains, onNav, onReset }) {
  const allPassed = weakDomains.length > 0 && weakDomains.every(d => moduleStatus[d] === 'passed')
  const examUnlocked = pretestSubmitted && (weakDomains.length === 0 || allPassed)

  const navItems = [
    { id: 'welcome', label: 'Home', icon: '🏠', always: true },
    { id: 'pretest', label: 'Pretest', icon: '📝', unlock: true },
    { id: 'pretest_results', label: 'Results', icon: '📊', unlock: pretestSubmitted },
    { id: 'modules', label: 'Study', icon: '📚', unlock: pretestSubmitted && weakDomains.length > 0 },
    { id: 'exam_intro', label: 'Exam', icon: '🏁', unlock: examUnlocked },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#2c6e49', borderBottom: '3px solid #1e4d33',
      boxShadow: '0 2px 8px rgba(0,0,0,.18)',
    }}>
      <div style={{
        maxWidth: 860, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '.6rem 1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.25rem', flexWrap: 'wrap' }}>
          {navItems.map(item => {
            const active = phase === item.id || (item.id === 'modules' && phase === 'module')
            const locked = !item.always && !item.unlock
            return (
              <button
                key={item.id}
                onClick={() => !locked && onNav(item.id)}
                disabled={locked}
                style={{
                  background: active ? 'rgba(255,255,255,.22)' : 'transparent',
                  color: locked ? 'rgba(255,255,255,.35)' : '#fff',
                  border: active ? '1.5px solid rgba(255,255,255,.5)' : '1.5px solid transparent',
                  borderRadius: 8, padding: '.35rem .75rem',
                  fontSize: '.82rem', fontWeight: 600, cursor: locked ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '.3rem',
                  transition: 'all .15s',
                }}
              >
                <span>{item.icon}</span>
                <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>{item.label}</span>
                {locked && <span style={{ fontSize: '.7rem' }}>🔒</span>}
              </button>
            )
          })}
        </div>
        <button
          onClick={onReset}
          className="btn btn-sm"
          style={{ background: 'rgba(255,255,255,.15)', color: '#fff', borderColor: 'rgba(255,255,255,.3)', fontSize: '.78rem' }}
        >
          ↺ Reset
        </button>
      </div>
    </nav>
  )
}

// ─── WelcomeScreen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onBegin }) {
  return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: '2.5rem 0 2rem' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '.75rem' }}>🧠</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#2c6e49', marginBottom: '.5rem' }}>
          RBT Exam Prep
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: 480, margin: '0 auto 2rem' }}>
          3rd Edition Task List · Adaptive Study System
        </p>
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#1e293b' }}>
          How This Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
          {[
            { step: '1', icon: '📝', title: 'Diagnostic Pretest', desc: '24 questions across all 6 domains' },
            { step: '2', icon: '📊', title: 'Identify Weak Areas', desc: 'Domains below 70% get targeted review' },
            { step: '3', icon: '📚', title: 'Study Modules', desc: 'Read concepts, then pass an 80% quiz' },
            { step: '4', icon: '🏁', title: 'Full 75-Question Exam', desc: '90 minutes · 70% to pass' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: 10, padding: '1rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{icon}</div>
              <div style={{
                width: 24, height: 24, background: '#2c6e49', color: '#fff',
                borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.75rem', fontWeight: 800, marginBottom: '.5rem',
              }}>{step}</div>
              <p style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: '.25rem' }}>{title}</p>
              <p style={{ fontSize: '.8rem', color: '#64748b' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>6 BACB Task List Domains</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '.75rem' }}>
          {DOMAIN_NAMES.map(dn => (
            <div key={dn} style={{
              display: 'flex', alignItems: 'center', gap: '.75rem',
              padding: '.75rem 1rem', background: '#f8fafc',
              border: `1.5px solid ${DOMAIN_COLORS[dn]}22`,
              borderLeft: `4px solid ${DOMAIN_COLORS[dn]}`,
              borderRadius: 8,
            }}>
              <span style={{ fontSize: '1.4rem' }}>{DOMAIN_ICONS[dn]}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '.82rem', color: DOMAIN_COLORS[dn] }}>
                  Domain {LETTER_OF[dn]}
                </p>
                <p style={{ fontSize: '.8rem', color: '#475569' }}>{dn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '.8rem 2.5rem' }} onClick={onBegin}>
          Begin Diagnostic Pretest →
        </button>
        <p style={{ marginTop: '.75rem', fontSize: '.82rem', color: '#94a3b8' }}>
          {PRETEST_QUESTIONS.length} questions · untimed · no feedback during test
        </p>
      </div>
    </div>
  )
}

// ─── PretestScreen ────────────────────────────────────────────────────────────
function PretestScreen({ questions, answers, onAnswer, onSubmit, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const q = questions[currentIdx]
  const total = questions.length
  const answered = Object.keys(answers).length
  const allAnswered = answered === total

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Diagnostic Pretest</h2>
        <span style={{ fontSize: '.85rem', color: '#64748b' }}>{answered}/{total} answered</span>
      </div>

      <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-fill" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '.78rem', fontWeight: 700, color: DOMAIN_COLORS[q.domain_name], background: `${DOMAIN_COLORS[q.domain_name]}18`, borderRadius: 6, padding: '.15rem .55rem' }}>
            {DOMAIN_ICONS[q.domain_name]} {q.domain_name}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '.82rem', color: '#94a3b8' }}>Q{currentIdx + 1} of {total}</span>
        </div>

        <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1.25rem', lineHeight: 1.65 }}>{q.stem}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {q.options.map((opt, i) => {
            const selected = answers[currentIdx] === i
            return (
              <button
                key={i}
                onClick={() => onAnswer(currentIdx, i)}
                style={{
                  textAlign: 'left', padding: '.85rem 1.1rem',
                  border: `2px solid ${selected ? '#2c6e49' : '#e2e8f0'}`,
                  background: selected ? '#d1fae5' : '#fff',
                  borderRadius: 8, fontSize: '.92rem', cursor: 'pointer',
                  transition: 'all .12s', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'flex-start', gap: '.75rem',
                }}
              >
                <span style={{
                  minWidth: 26, height: 26, borderRadius: '50%',
                  background: selected ? '#2c6e49' : '#f1f5f9',
                  color: selected ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.78rem', fontWeight: 700, flexShrink: 0, marginTop: '.05rem',
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Question dot navigator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', marginBottom: '1.25rem' }}>
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: i === currentIdx ? '#2c6e49' : answers[i] !== undefined ? '#d1fae5' : '#f1f5f9',
              color: i === currentIdx ? '#fff' : answers[i] !== undefined ? '#166534' : '#94a3b8',
              border: `1.5px solid ${i === currentIdx ? '#2c6e49' : answers[i] !== undefined ? '#86efac' : '#e2e8f0'}`,
              fontSize: '.72rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Home</button>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>← Prev</button>
          {currentIdx < total - 1
            ? <button className="btn btn-primary btn-sm" onClick={() => setCurrentIdx(currentIdx + 1)}>Next →</button>
            : <button className="btn btn-primary btn-sm" onClick={onSubmit} disabled={!allAnswered} title={!allAnswered ? `Answer all ${total - answered} remaining questions` : ''}>
                Submit Pretest ✓
              </button>
          }
        </div>
      </div>
      {!allAnswered && currentIdx === total - 1 && (
        <p style={{ marginTop: '.75rem', fontSize: '.82rem', color: '#dc2626', textAlign: 'right' }}>
          {total - answered} question{total - answered !== 1 ? 's' : ''} unanswered
        </p>
      )}
    </div>
  )
}

// ─── PretestResultsScreen ─────────────────────────────────────────────────────
function PretestResultsScreen({ domainScores, weakDomains, onStudy, onSkip }) {
  const totalQ = domainScores.reduce((s, d) => s + d.total, 0)
  const totalC = domainScores.reduce((s, d) => s + d.correct, 0)
  const overall = Math.round((totalC / totalQ) * 100)

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.5rem' }}>Pretest Results</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Here's how you did across all 6 domains</p>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 900, color: overall >= 70 ? '#16a34a' : '#dc2626' }}>{overall}%</div>
        <p style={{ color: '#64748b', fontSize: '.9rem' }}>{totalC} / {totalQ} correct</p>
        <p style={{ marginTop: '.5rem', fontWeight: 600, color: overall >= 70 ? '#16a34a' : '#dc2626' }}>
          {overall >= 70 ? '✓ Strong baseline — ready to proceed!' : '⚠ Some domains need review before your exam'}
        </p>
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1.1rem' }}>Domain Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
          {domainScores.map(d => (
            <div key={d.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.35rem' }}>
                <span style={{ fontSize: '.88rem', fontWeight: 600 }}>{DOMAIN_ICONS[d.name]} {d.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span style={{ fontSize: '.82rem', color: '#64748b' }}>{d.correct}/{d.total}</span>
                  <span style={{
                    fontSize: '.82rem', fontWeight: 700,
                    color: d.pct === null ? '#94a3b8' : d.pct >= 70 ? '#16a34a' : '#dc2626',
                  }}>{d.pct === null ? 'N/A' : `${d.pct}%`}</span>
                  {weakDomains.includes(d.name)
                    ? <span className="badge badge-danger">Weak</span>
                    : d.pct !== null ? <span className="badge badge-success">Good</span> : null}
                </div>
              </div>
              {d.total > 0 && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{
                    width: `${d.pct}%`,
                    background: d.pct >= 70 ? '#16a34a' : '#dc2626',
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {weakDomains.length > 0 && (
        <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderColor: '#fca5a5', background: '#fff5f5' }}>
          <p style={{ fontWeight: 700, color: '#dc2626', marginBottom: '.4rem' }}>⚠ Domains Requiring Review:</p>
          <ul style={{ paddingLeft: '1.25rem', color: '#7f1d1d', fontSize: '.9rem' }}>
            {weakDomains.map(d => <li key={d}>{DOMAIN_ICONS[d]} {d}</li>)}
          </ul>
          <p style={{ marginTop: '.6rem', fontSize: '.82rem', color: '#9f1239' }}>
            You must pass each module quiz (≥4/5) to unlock the full exam.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {weakDomains.length > 0 && (
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={onStudy}>
            📚 Begin Study Plan
          </button>
        )}
        <button className={`btn ${weakDomains.length === 0 ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1 }} onClick={onSkip}>
          {weakDomains.length === 0 ? '🏁 Proceed to Full Exam' : 'Skip to Exam (not recommended)'}
        </button>
      </div>
    </div>
  )
}

// ─── ModulesScreen ────────────────────────────────────────────────────────────
function ModulesScreen({ weakDomains, moduleStatus, onSelectModule, onStartExam }) {
  const allPassed = weakDomains.length > 0 && weakDomains.every(d => moduleStatus[d] === 'passed')

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.4rem' }}>Study Plan</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Complete each module to unlock the full exam. Pass the quiz (≥4/5) to mark a domain complete.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {weakDomains.map(dn => {
          const status = moduleStatus[dn] || 'available'
          const color = DOMAIN_COLORS[dn]
          return (
            <div key={dn} className="card" style={{ padding: '1.5rem', borderTop: `4px solid ${color}`, cursor: 'pointer' }}
              onClick={() => onSelectModule(dn)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{DOMAIN_ICONS[dn]}</span>
                {status === 'passed'
                  ? <span className="badge badge-success">✓ Passed</span>
                  : <span className="badge badge-warning">In Progress</span>}
              </div>
              <p style={{ fontWeight: 700, fontSize: '.92rem', color, marginBottom: '.3rem' }}>Domain {LETTER_OF[dn]}</p>
              <p style={{ fontSize: '.88rem', color: '#475569', marginBottom: '1rem' }}>{dn}</p>
              <p style={{ fontSize: '.8rem', color: '#94a3b8', marginBottom: '.9rem' }}>
                4 concept cards · 5 practice questions
              </p>
              <button
                className={`btn btn-sm ${status === 'passed' ? 'btn-ghost' : 'btn-primary'}`}
                style={{ width: '100%', ...(status !== 'passed' ? { background: color, borderColor: color } : {}) }}
              >
                {status === 'passed' ? '↺ Review Again' : '▶ Start Module'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          style={{ fontSize: '1.05rem', padding: '.8rem 2.5rem', opacity: allPassed ? 1 : .45 }}
          disabled={!allPassed}
          onClick={onStartExam}
          title={!allPassed ? 'Pass all module quizzes first' : ''}
        >
          🏁 Begin Full Exam
        </button>
        {!allPassed && (
          <p style={{ marginTop: '.6rem', fontSize: '.82rem', color: '#94a3b8' }}>
            Pass all {weakDomains.length} module quizzes to unlock
          </p>
        )}
      </div>
    </div>
  )
}

// ─── ModuleScreen (content + quiz) ───────────────────────────────────────────
function ModuleScreen({ domainName, modulePhase, quizAnswers, quizSubmitted, onAnswer, onSubmitQuiz, onRetryQuiz, onBackToModules, onStartQuiz }) {
  const mod = MODULES[domainName]
  const [conceptIdx, setConceptIdx] = useState(0)
  const [quizIdx, setQuizIdx] = useState(0)
  const color = DOMAIN_COLORS[domainName]

  if (!mod) return <div className="page"><p>Module not found.</p></div>

  if (modulePhase === 'content') {
    const concept = mod.concepts[conceptIdx]
    const ctype = CONCEPT_TYPES[conceptIdx % CONCEPT_TYPES.length]
    return (
      <div className="page">
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={onBackToModules}>← Back</button>
          <h2 style={{ fontWeight: 800, color, fontSize: '1.2rem' }}>
            {DOMAIN_ICONS[domainName]} {domainName}
          </h2>
        </div>

        <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: `${((conceptIdx + 1) / mod.concepts.length) * 100}%`, background: color }} />
        </div>

        <div style={{ marginBottom: '1.25rem', borderRadius: 12, overflow: 'hidden', border: `1px solid ${ctype.border}`, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <div style={{ background: ctype.bg, padding: '9px 16px', borderBottom: `1px solid ${ctype.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>{ctype.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: ctype.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ctype.label}</span>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {mod.concepts.map((c, i) => (
                <button key={i} onClick={() => setConceptIdx(i)} style={{
                  padding: '.3rem .75rem', borderRadius: 99,
                  background: i === conceptIdx ? color : '#f1f5f9',
                  color: i === conceptIdx ? '#fff' : '#64748b',
                  border: 'none', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
                }}>
                  {i + 1}. {c.title.length > 20 ? c.title.slice(0, 18) + '…' : c.title}
                </button>
              ))}
            </div>

            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: ctype.color, marginBottom: '.75rem' }}>{concept.title}</h3>
            <p style={{ lineHeight: 1.75, color: '#374151', fontSize: '.95rem', whiteSpace: 'pre-wrap' }}>{concept.body}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setConceptIdx(Math.max(0, conceptIdx - 1))} disabled={conceptIdx === 0}>← Prev</button>
          {conceptIdx < mod.concepts.length - 1
            ? <button className="btn btn-primary btn-sm" onClick={() => setConceptIdx(conceptIdx + 1)}>Next Concept →</button>
            : <button className="btn btn-primary" onClick={onStartQuiz} style={{ background: color, borderColor: color }}>
                Take Quiz →
              </button>
          }
        </div>
      </div>
    )
  }

  // Quiz phase
  const q = mod.practice[quizIdx]
  const totalQ = mod.practice.length
  const answered = Object.keys(quizAnswers).length

  if (quizSubmitted) {
    const correct = mod.practice.filter((q, i) => quizAnswers[i] === q.correct).length
    const passed = correct >= 4
    return (
      <div className="page">
        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem' }}>
          {DOMAIN_ICONS[domainName]} Module Quiz Results
        </h2>
        <div className="card" style={{ padding: '1.75rem', marginBottom: '1.25rem', textAlign: 'center', borderTop: `4px solid ${passed ? '#16a34a' : '#dc2626'}` }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: passed ? '#16a34a' : '#dc2626' }}>{correct}/{totalQ}</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: passed ? '#16a34a' : '#dc2626', marginTop: '.4rem' }}>
            {passed ? '✓ Passed! Domain unlocked.' : '✗ Not quite — review and retry'}
          </p>
          <p style={{ color: '#64748b', fontSize: '.88rem', marginTop: '.3rem' }}>Need ≥ 4/5 (80%) to pass</p>
        </div>

        {mod.practice.map((q, i) => {
          const chosen = quizAnswers[i]
          const isCorrect = chosen === q.correct
          return (
            <div key={i} className="card" style={{ padding: '1.25rem', marginBottom: '.75rem', borderLeft: `4px solid ${isCorrect ? '#16a34a' : '#dc2626'}` }}>
              <p style={{ fontWeight: 600, marginBottom: '.5rem', fontSize: '.92rem' }}>{i + 1}. {q.stem}</p>
              <p style={{ fontSize: '.85rem', marginBottom: '.35rem' }}>
                <span style={{ color: isCorrect ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                  {isCorrect ? '✓' : '✗'} You chose:
                </span> {chosen !== undefined ? q.options[chosen] : 'No answer'}
              </p>
              {!isCorrect && <p style={{ fontSize: '.85rem', color: '#16a34a', marginBottom: '.35rem' }}>✓ Correct: {q.options[q.correct]}</p>}
              <p style={{ fontSize: '.82rem', color: '#64748b', background: '#f8fafc', padding: '.5rem .75rem', borderRadius: 6, marginTop: '.4rem' }}>
                💡 {q.rationale}
              </p>
            </div>
          )
        })}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={onBackToModules}>← Back to Study Plan</button>
          {!passed && (
            <button className="btn btn-primary" onClick={onRetryQuiz} style={{ background: color, borderColor: color }}>
              ↺ Retry Quiz
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontWeight: 800, color, fontSize: '1.1rem' }}>{DOMAIN_ICONS[domainName]} Module Quiz</h2>
        <span style={{ fontSize: '.85rem', color: '#64748b' }}>Q{quizIdx + 1} of {totalQ}</span>
      </div>

      <div className="progress-bar" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-fill" style={{ width: `${((quizIdx + 1) / totalQ) * 100}%`, background: color }} />
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
        <p style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '1.25rem', lineHeight: 1.65 }}>{q.stem}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {q.options.map((opt, i) => {
            const selected = quizAnswers[quizIdx] === i
            return (
              <button key={i} onClick={() => onAnswer(quizIdx, i)} style={{
                textAlign: 'left', padding: '.85rem 1.1rem',
                border: `2px solid ${selected ? color : '#e2e8f0'}`,
                background: selected ? `${color}18` : '#fff',
                borderRadius: 8, fontSize: '.92rem', cursor: 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'flex-start', gap: '.75rem',
                transition: 'all .12s',
              }}>
                <span style={{
                  minWidth: 26, height: 26, borderRadius: '50%',
                  background: selected ? color : '#f1f5f9',
                  color: selected ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.78rem', fontWeight: 700, flexShrink: 0, marginTop: '.05rem',
                }}>{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'space-between' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setQuizIdx(Math.max(0, quizIdx - 1))} disabled={quizIdx === 0}>← Prev</button>
        {quizIdx < totalQ - 1
          ? <button className="btn btn-primary btn-sm" onClick={() => setQuizIdx(quizIdx + 1)} style={{ background: color, borderColor: color }}>Next →</button>
          : <button className="btn btn-primary btn-sm" onClick={() => { setQuizIdx(0); onSubmitQuiz() }}
              disabled={answered < totalQ} style={{ background: color, borderColor: color }}>
              Submit Quiz ✓
            </button>
        }
      </div>
    </div>
  )
}

// ─── ExamIntroScreen ──────────────────────────────────────────────────────────
function ExamIntroScreen({ onBegin }) {
  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏁</div>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '.5rem' }}>Full Practice Exam</h2>
      <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
        RBT 3rd Edition Task List · Mock Exam
      </p>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem', textAlign: 'left', maxWidth: 480, margin: '0 auto 2rem' }}>
        <div style={{ display: 'grid', gap: '.75rem' }}>
          {[
            { icon: '❓', label: '75 Questions', sub: 'Proportional across all 6 domains' },
            { icon: '⏱', label: '90 Minutes', sub: 'Countdown timer shown throughout' },
            { icon: '🎯', label: '70% to Pass', sub: '53 or more correct answers' },
            { icon: '🚩', label: 'Flag for Review', sub: 'Mark questions to revisit' },
          ].map(({ icon, label, sub }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.6rem .75rem', background: '#f8fafc', borderRadius: 8 }}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '.9rem' }}>{label}</p>
                <p style={{ fontSize: '.8rem', color: '#64748b' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '.9rem 3rem' }} onClick={onBegin}>
        Begin Full Exam →
      </button>
      <p style={{ marginTop: '.75rem', fontSize: '.82rem', color: '#94a3b8' }}>
        Timer starts immediately upon clicking
      </p>
    </div>
  )
}

// ─── ExamScreen ───────────────────────────────────────────────────────────────
function ExamScreen({ questions, answers, flagged, timeLeft, onAnswer, onFlag, onSubmit }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showNav, setShowNav] = useState(false)
  const q = questions[currentIdx]
  const total = questions.length
  const answered = Object.keys(answers).length
  const urgent = timeLeft <= 300

  return (
    <div className="page">
      {/* Timer + header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem', flexWrap: 'wrap', gap: '.5rem',
      }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Full Exam</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <span style={{ fontSize: '.82rem', color: '#64748b' }}>{answered}/{total} answered</span>
          <div style={{
            background: urgent ? '#fee2e2' : '#f0fdf4',
            color: urgent ? '#dc2626' : '#166534',
            border: `2px solid ${urgent ? '#fca5a5' : '#86efac'}`,
            borderRadius: 8, padding: '.3rem .75rem',
            fontWeight: 800, fontSize: '1rem', fontVariantNumeric: 'tabular-nums',
            animation: urgent && timeLeft % 2 === 0 ? 'none' : 'none',
          }}>
            ⏱ {fmtTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="progress-bar" style={{ marginBottom: '1.25rem' }}>
        <div className="progress-fill" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.78rem', fontWeight: 700, color: DOMAIN_COLORS[q.domain_name], background: `${DOMAIN_COLORS[q.domain_name]}18`, borderRadius: 6, padding: '.15rem .55rem' }}>
            {DOMAIN_ICONS[q.domain_name]} {q.domain_name}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '.82rem', color: '#94a3b8' }}>Q{currentIdx + 1}/{total}</span>
          <button
            onClick={() => onFlag(currentIdx)}
            style={{
              background: flagged[currentIdx] ? '#fef9c3' : '#f8fafc',
              border: `1.5px solid ${flagged[currentIdx] ? '#fbbf24' : '#e2e8f0'}`,
              borderRadius: 6, padding: '.2rem .55rem', fontSize: '.8rem', cursor: 'pointer',
              color: flagged[currentIdx] ? '#92400e' : '#94a3b8',
            }}
            title="Flag for review"
          >
            {flagged[currentIdx] ? '🚩 Flagged' : '🏳 Flag'}
          </button>
        </div>

        <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1.25rem', lineHeight: 1.65 }}>{q.stem}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {q.options.map((opt, i) => {
            const selected = answers[currentIdx] === i
            return (
              <button key={i} onClick={() => onAnswer(currentIdx, i)} style={{
                textAlign: 'left', padding: '.85rem 1.1rem',
                border: `2px solid ${selected ? '#2c6e49' : '#e2e8f0'}`,
                background: selected ? '#d1fae5' : '#fff',
                borderRadius: 8, fontSize: '.92rem', cursor: 'pointer',
                fontFamily: 'inherit', display: 'flex', alignItems: 'flex-start', gap: '.75rem',
                transition: 'all .12s',
              }}>
                <span style={{
                  minWidth: 26, height: 26, borderRadius: '50%',
                  background: selected ? '#2c6e49' : '#f1f5f9',
                  color: selected ? '#fff' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.78rem', fontWeight: 700, flexShrink: 0, marginTop: '.05rem',
                }}>{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Question navigator toggle */}
      <button
        onClick={() => setShowNav(!showNav)}
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '.75rem' }}
      >
        {showNav ? '▲ Hide' : '▼ Show'} Question Navigator
      </button>

      {showNav && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrentIdx(i)} style={{
              width: 30, height: 30, borderRadius: 6,
              background: flagged[i] ? '#fef9c3' : i === currentIdx ? '#2c6e49' : answers[i] !== undefined ? '#d1fae5' : '#f1f5f9',
              color: flagged[i] ? '#92400e' : i === currentIdx ? '#fff' : answers[i] !== undefined ? '#166534' : '#94a3b8',
              border: `1.5px solid ${flagged[i] ? '#fbbf24' : i === currentIdx ? '#2c6e49' : answers[i] !== undefined ? '#86efac' : '#e2e8f0'}`,
              fontSize: '.7rem', fontWeight: 700, cursor: 'pointer',
            }}>
              {i + 1}
            </button>
          ))}
          <div style={{ width: '100%', marginTop: '.5rem', display: 'flex', gap: '1rem', fontSize: '.75rem', color: '#64748b' }}>
            <span>⬜ Unanswered</span><span style={{ color: '#16a34a' }}>🟩 Answered</span><span style={{ color: '#92400e' }}>🟨 Flagged</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>← Prev</button>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          {currentIdx < total - 1
            ? <button className="btn btn-primary btn-sm" onClick={() => setCurrentIdx(currentIdx + 1)}>Next →</button>
            : <button className="btn btn-primary" onClick={onSubmit}>
                Submit Exam ✓
              </button>
          }
        </div>
      </div>

      {timeLeft === 0 && (
        <div style={{ marginTop: '1rem', padding: '.75rem', background: '#fee2e2', border: '2px solid #fca5a5', borderRadius: 8, color: '#dc2626', textAlign: 'center', fontWeight: 700 }}>
          ⏱ Time's up! Your exam has been submitted automatically.
        </div>
      )}
    </div>
  )
}

// ─── FinalResultsScreen ───────────────────────────────────────────────────────
function FinalResultsScreen({ examQuestions, examAnswers, examDomainScores, pretestDomainScores, onRetakeExam, onReset }) {
  const total = examQuestions.length
  const correct = examQuestions.filter((q, i) => examAnswers[i] === q.correct).length
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= 70

  return (
    <div className="page">
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '.5rem' }}>Final Results</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Full Practice Exam · 75 Questions</p>

      <div className="card" style={{
        padding: '2rem', marginBottom: '1.5rem', textAlign: 'center',
        borderTop: `6px solid ${passed ? '#16a34a' : '#dc2626'}`,
      }}>
        <div style={{ fontSize: '4rem', fontWeight: 900, color: passed ? '#16a34a' : '#dc2626' }}>{pct}%</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: passed ? '#16a34a' : '#dc2626', marginTop: '.3rem' }}>
          {passed ? '✓ PASSED' : '✗ NOT PASSED'}
        </p>
        <p style={{ color: '#64748b', marginTop: '.3rem' }}>{correct} / {total} correct · Need 70% (≥53) to pass</p>
      </div>

      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Domain Performance</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {examDomainScores.map(d => {
            const pre = pretestDomainScores ? pretestDomainScores.find(p => p.name === d.name) : null
            const growth = pre && pre.pct !== null && d.pct !== null ? d.pct - pre.pct : null

            return (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.35rem', flexWrap: 'wrap', gap: '.3rem' }}>
                  <span style={{ fontSize: '.88rem', fontWeight: 600 }}>{DOMAIN_ICONS[d.name]} {d.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    {pre && pre.pct !== null && (
                      <span style={{ fontSize: '.78rem', color: '#94a3b8' }}>
                        Pre: {pre.pct}%
                      </span>
                    )}
                    <span style={{
                      fontSize: '.9rem', fontWeight: 800,
                      color: d.pct === null ? '#94a3b8' : d.pct >= 70 ? '#16a34a' : '#dc2626',
                    }}>{d.pct === null ? 'N/A' : `${d.pct}%`}</span>
                    {growth !== null && (
                      <span style={{
                        fontSize: '.78rem', fontWeight: 700,
                        color: growth > 0 ? '#16a34a' : growth < 0 ? '#dc2626' : '#64748b',
                      }}>
                        {growth > 0 ? `▲+${growth}%` : growth < 0 ? `▼${growth}%` : '→0%'}
                      </span>
                    )}
                  </div>
                </div>
                {d.total > 0 && (
                  <div style={{ position: 'relative', height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                    {pre && pre.pct !== null && (
                      <div style={{ position: 'absolute', height: '100%', width: `${pre.pct}%`, background: '#cbd5e1', borderRadius: 99 }} />
                    )}
                    <div style={{ position: 'absolute', height: '100%', width: `${d.pct}%`, background: d.pct >= 70 ? '#16a34a' : '#dc2626', borderRadius: 99 }} />
                  </div>
                )}
                <p style={{ fontSize: '.78rem', color: '#94a3b8', marginTop: '.2rem' }}>{d.correct}/{d.total} correct</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onRetakeExam}>↺ Retake Exam</button>
        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onReset}>🏠 Start Over</button>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState(INITIAL)
  const timerRef = useRef(null)

  // Timer for exam
  useEffect(() => {
    if (state.phase === 'fullexam' && !state.examSubmitted) {
      timerRef.current = setInterval(() => {
        setState(s => {
          if (s.examTimeLeft <= 1) {
            clearInterval(timerRef.current)
            return {
              ...s,
              examTimeLeft: 0,
              examSubmitted: true,
              examDomainScores: scoreDomains(s.examQuestions, s.examAnswers),
              phase: 'final_results',
            }
          }
          return { ...s, examTimeLeft: s.examTimeLeft - 1 }
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [state.phase, state.examSubmitted])

  const reset = useCallback(() => {
    clearInterval(timerRef.current)
    setState(INITIAL)
  }, [])

  const handleNav = useCallback((phase) => {
    setState(s => ({ ...s, phase }))
  }, [])

  // PRETEST handlers
  const handlePretestAnswer = useCallback((idx, choice) => {
    setState(s => ({ ...s, pretestAnswers: { ...s.pretestAnswers, [idx]: choice } }))
  }, [])

  const handlePretestSubmit = useCallback(() => {
    setState(s => {
      const scores = scoreDomains(s.pretestQuestions, s.pretestAnswers)
      const weak = scores.filter(d => d.pct !== null && d.pct < 70).map(d => d.name)
      const modStatus = {}
      weak.forEach(d => { modStatus[d] = 'available' })
      return {
        ...s,
        pretestSubmitted: true,
        pretestDomainScores: scores,
        weakDomains: weak,
        moduleStatus: modStatus,
        phase: 'pretest_results',
      }
    })
  }, [])

  // MODULE handlers
  const handleSelectModule = useCallback((domainName) => {
    setState(s => ({
      ...s,
      activeModule: domainName,
      modulePhase: 'content',
      moduleQuizAnswers: {},
      moduleQuizSubmitted: false,
      phase: 'module',
    }))
  }, [])

  const handleModuleStartQuiz = useCallback(() => {
    setState(s => ({ ...s, modulePhase: 'quiz' }))
  }, [])

  const handleModuleAnswer = useCallback((idx, choice) => {
    setState(s => ({ ...s, moduleQuizAnswers: { ...s.moduleQuizAnswers, [idx]: choice } }))
  }, [])

  const handleModuleSubmitQuiz = useCallback(() => {
    setState(s => {
      const mod = MODULES[s.activeModule]
      const correct = mod.practice.filter((q, i) => s.moduleQuizAnswers[i] === q.correct).length
      const passed = correct >= 4
      const newStatus = { ...s.moduleStatus }
      if (passed) newStatus[s.activeModule] = 'passed'
      return {
        ...s,
        moduleQuizSubmitted: true,
        moduleStatus: newStatus,
      }
    })
  }, [])

  const handleModuleRetryQuiz = useCallback(() => {
    setState(s => ({ ...s, moduleQuizAnswers: {}, moduleQuizSubmitted: false }))
  }, [])

  const handleBackToModules = useCallback(() => {
    setState(s => ({ ...s, phase: 'modules', activeModule: null }))
  }, [])

  // EXAM handlers
  const handleStartExam = useCallback(() => {
    setState(s => ({
      ...s,
      examQuestions: buildExam(),
      examAnswers: {},
      examFlagged: {},
      examCurrentIdx: 0,
      examTimeLeft: EXAM_DURATION,
      examSubmitted: false,
      examDomainScores: null,
      phase: 'exam_intro',
    }))
  }, [])

  const handleBeginExam = useCallback(() => {
    setState(s => ({
      ...s,
      examStartTime: Date.now(),
      phase: 'fullexam',
    }))
  }, [])

  const handleExamAnswer = useCallback((idx, choice) => {
    setState(s => ({ ...s, examAnswers: { ...s.examAnswers, [idx]: choice } }))
  }, [])

  const handleExamFlag = useCallback((idx) => {
    setState(s => ({
      ...s,
      examFlagged: { ...s.examFlagged, [idx]: !s.examFlagged[idx] },
    }))
  }, [])

  const handleExamSubmit = useCallback(() => {
    clearInterval(timerRef.current)
    setState(s => {
      const scores = scoreDomains(s.examQuestions, s.examAnswers)
      return {
        ...s,
        examSubmitted: true,
        examDomainScores: scores,
        phase: 'final_results',
      }
    })
  }, [])

  const handleRetakeExam = useCallback(() => {
    setState(s => ({
      ...s,
      examQuestions: buildExam(),
      examAnswers: {},
      examFlagged: {},
      examCurrentIdx: 0,
      examTimeLeft: EXAM_DURATION,
      examSubmitted: false,
      examDomainScores: null,
      phase: 'exam_intro',
    }))
  }, [])

  const { phase } = state

  return (
    <>
      <NavBar
        phase={phase}
        pretestSubmitted={state.pretestSubmitted}
        moduleStatus={state.moduleStatus}
        weakDomains={state.weakDomains}
        onNav={handleNav}
        onReset={reset}
      />

      {phase === 'welcome' && (
        <WelcomeScreen onBegin={() => setState(s => ({ ...s, phase: 'pretest', pretestQuestions: shuffleQuestions(PRETEST_QUESTIONS) }))} />
      )}

      {phase === 'pretest' && (
        <PretestScreen
          questions={state.pretestQuestions.length ? state.pretestQuestions : PRETEST_QUESTIONS}
          answers={state.pretestAnswers}
          onAnswer={handlePretestAnswer}
          onSubmit={handlePretestSubmit}
          onBack={() => setState(s => ({ ...s, phase: 'welcome' }))}
        />
      )}

      {phase === 'pretest_results' && state.pretestDomainScores && (
        <PretestResultsScreen
          domainScores={state.pretestDomainScores}
          weakDomains={state.weakDomains}
          onStudy={() => setState(s => ({ ...s, phase: 'modules' }))}
          onSkip={handleStartExam}
        />
      )}

      {phase === 'modules' && (
        <ModulesScreen
          weakDomains={state.weakDomains}
          moduleStatus={state.moduleStatus}
          onSelectModule={handleSelectModule}
          onStartExam={handleStartExam}
        />
      )}

      {phase === 'module' && state.activeModule && (
        <ModuleScreen
          domainName={state.activeModule}
          modulePhase={state.modulePhase}
          quizAnswers={state.moduleQuizAnswers}
          quizSubmitted={state.moduleQuizSubmitted}
          onAnswer={handleModuleAnswer}
          onSubmitQuiz={handleModuleSubmitQuiz}
          onRetryQuiz={handleModuleRetryQuiz}
          onBackToModules={handleBackToModules}
          onStartQuiz={handleModuleStartQuiz}
        />
      )}

      {phase === 'exam_intro' && (
        <ExamIntroScreen onBegin={handleBeginExam} />
      )}

      {phase === 'fullexam' && state.examQuestions && (
        <ExamScreen
          questions={state.examQuestions}
          answers={state.examAnswers}
          flagged={state.examFlagged}
          timeLeft={state.examTimeLeft}
          onAnswer={handleExamAnswer}
          onFlag={handleExamFlag}
          onSubmit={handleExamSubmit}
        />
      )}

      {phase === 'final_results' && state.examDomainScores && (
        <FinalResultsScreen
          examQuestions={state.examQuestions}
          examAnswers={state.examAnswers}
          examDomainScores={state.examDomainScores}
          pretestDomainScores={state.pretestDomainScores}
          onRetakeExam={handleRetakeExam}
          onReset={reset}
        />
      )}
    </>
  )
}
