import { useState, useEffect, useRef, useCallback } from 'react'
import { PRETEST_QUESTIONS } from './data/pretest.js'
import { MODULES } from './data/modules.js'
import { QUESTION_BANK } from './data/questions.js'
import { MODULE_ENHANCEMENTS } from './data/moduleEnhancements.js'

// ─── localStorage persistence ─────────────────────────────────────────────────
const STORAGE_KEY = 'rbt-exam-prep-v1'
const loadPersisted = () => {
  try {
    const r = localStorage.getItem(STORAGE_KEY)
    return r ? JSON.parse(r) : null
  } catch { return null }
}
const savePersisted = d => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) } catch {} }
const clearPersisted = () => { try { localStorage.removeItem(STORAGE_KEY) } catch {} }

// ─── study stats helpers ──────────────────────────────────────────────────────
const todayISO = () => new Date().toISOString().slice(0, 10)
function calculateStreak(daysStudied) {
  if (!daysStudied?.length) return 0
  const daySet = new Set(daysStudied)
  const today = new Date()
  const todayStr = todayISO()
  const yesterdayStr = new Date(today.getTime() - 86400000).toISOString().slice(0, 10)
  if (!daySet.has(todayStr) && !daySet.has(yesterdayStr)) return 0
  let streak = 0
  let checkDate = new Date(daySet.has(todayStr) ? todayStr : yesterdayStr)
  while (daySet.has(checkDate.toISOString().slice(0, 10))) {
    streak++
    checkDate = new Date(checkDate.getTime() - 86400000)
  }
  return streak
}
function formatDuration(minutes) {
  if (!minutes) return '0 min'
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60), m = minutes % 60
  return m ? `${h}h ${m}m` : `${h}h`
}
const bumpStat = (stats, key, by=1) => ({ ...(stats||{}), [key]: (stats?.[key]||0) + by })

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

// ─── global styles + interactive primitives ───────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes conceptIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    .concept-in{animation:conceptIn .32s ease forwards}
    .kt-card:hover{filter:brightness(.96)}
  `}</style>
)

function KeyTermCard({term,def,color,bg,border}) {
  const [flipped,setFlipped] = useState(false)
  return (
    <div className="kt-card" onClick={()=>setFlipped(f=>!f)}
      style={{cursor:'pointer',minHeight:72,perspective:800,userSelect:'none'}}>
      <div style={{position:'relative',width:'100%',minHeight:72,transformStyle:'preserve-3d',
        transition:'transform .45s cubic-bezier(.4,0,.2,1)',
        transform:flipped?'rotateY(180deg)':'rotateY(0deg)'}}>
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',
          background:bg,border:`1.5px solid ${border}`,borderRadius:10,
          display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'8px 12px',minHeight:72}}>
          <span style={{fontSize:10,color,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4,opacity:.7}}>tap to define</span>
          <span style={{fontSize:13,fontWeight:800,color,textAlign:'center',lineHeight:1.3}}>{term}</span>
        </div>
        <div style={{position:'absolute',inset:0,backfaceVisibility:'hidden',WebkitBackfaceVisibility:'hidden',
          transform:'rotateY(180deg)',background:'#fff',border:`1.5px solid ${border}`,borderRadius:10,
          display:'flex',alignItems:'center',justifyContent:'center',padding:'8px 12px',minHeight:72}}>
          <span style={{fontSize:12,color:'#1e293b',textAlign:'center',lineHeight:1.5}}>{def}</span>
        </div>
      </div>
    </div>
  )
}

// ─── SVG visual components ────────────────────────────────────────────────────
function FAChart() {
  const bars=[{l:'Alone',v:9,c:'#dc2626'},{l:'Attention',v:1,c:'#93c5fd'},{l:'Demand',v:1,c:'#93c5fd'},{l:'Play',v:1,c:'#93c5fd'}]
  const W=280,H=100,pL=28,bW=42,gap=14
  return (
    <svg viewBox={`0 0 ${W} ${H+50}`} style={{width:'100%',maxWidth:280,display:'block',margin:'0 auto'}}>
      <text x={W/2} y={13} textAnchor="middle" fontSize={10} fontWeight="700" fill="#64748b">FA Pattern — Automatic Reinforcement</text>
      <line x1={pL-2} y1={18} x2={pL-2} y2={H+18} stroke="#e2e8f0" strokeWidth={1}/>
      <text x={pL-4} y={22} textAnchor="end" fontSize={8} fill="#94a3b8">High</text>
      <text x={pL-4} y={H+18} textAnchor="end" fontSize={8} fill="#94a3b8">Low</text>
      {bars.map((b,i)=>{const x=pL+(bW+gap)*i,bh=(b.v/10)*H;return(
        <g key={i}><rect x={x} y={H-bh+18} width={bW} height={bh} fill={b.c} rx={4} opacity={.9}/>
          <text x={x+bW/2} y={H+32} textAnchor="middle" fontSize={9} fill="#64748b">{b.l}</text></g>
      )})}
      <text x={W/2} y={H+48} textAnchor="middle" fontSize={9} fill="#dc2626" fontStyle="italic">↑ Alone = high rate → automatic (sensory) reinforcement</text>
    </svg>
  )
}

function ExtinctionGraph() {
  const pts=[5,5,5,5,9,8,7,5,4,3,2,1,1,3,1,1]
  const W=290,H=88,pL=24
  const pp=pts.map((v,i)=>[pL+(i/(pts.length-1))*(W-pL-6),H-(v/10)*H+16])
  const burstX=pL+(4/(pts.length-1))*(W-pL-6)
  const recX=pL+(11/(pts.length-1))*(W-pL-6)
  return (
    <svg viewBox={`0 0 ${W} ${H+50}`} style={{width:'100%',maxWidth:290,display:'block',margin:'0 auto'}}>
      <text x={W/2} y={13} textAnchor="middle" fontSize={10} fontWeight="700" fill="#64748b">Extinction Pattern</text>
      <line x1={pL-2} y1={16} x2={pL-2} y2={H+16} stroke="#e2e8f0" strokeWidth={1}/>
      <line x1={burstX} y1={16} x2={burstX} y2={H+16} stroke="#f59e0b" strokeDasharray="4,3" strokeWidth={1.5}/>
      <text x={burstX+2} y={26} fontSize={8} fill="#92400e">Extinction begins</text>
      <line x1={recX} y1={16} x2={recX} y2={H+16} stroke="#94a3b8" strokeDasharray="3,2" strokeWidth={1}/>
      <polyline points={pp.map(p=>p.join(',')).join(' ')} fill="none" stroke="#dc2626" strokeWidth={2}/>
      {pp.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={2.5} fill="#dc2626"/>)}
      <text x={pL-4} y={20} textAnchor="end" fontSize={8} fill="#94a3b8">Hi</text>
      <text x={pL-4} y={H+16} textAnchor="end" fontSize={8} fill="#94a3b8">Lo</text>
      <text x={(burstX+recX)/2} y={H+28} textAnchor="middle" fontSize={8.5} fill="#dc2626">Burst ↑</text>
      <text x={(recX+W-6)/2} y={H+28} textAnchor="middle" fontSize={8} fill="#64748b">Spont. Recovery</text>
      <text x={W/2} y={H+44} textAnchor="middle" fontSize={8.5} fill="#475569" fontStyle="italic">Extinction burst = temporary — not treatment failure</text>
    </svg>
  )
}

function PromptHierarchyChart() {
  const levels=[
    {l:'Full Physical Prompt',c:'#dc2626',w:230},{l:'Partial Physical Prompt',c:'#ea580c',w:200},
    {l:'Model Prompt',c:'#d97706',w:170},{l:'Gestural Prompt',c:'#65a30d',w:140},
    {l:'Vocal / Textual Prompt',c:'#0ea5e9',w:110},{l:'Independent (Goal)',c:'#6366f1',w:80},
  ]
  const W=290,rH=26,top=18
  return (
    <svg viewBox={`0 0 ${W} ${levels.length*rH+top+24}`} style={{width:'100%',maxWidth:290,display:'block',margin:'0 auto'}}>
      <text x={W/2} y={13} textAnchor="middle" fontSize={10} fontWeight="700" fill="#64748b">Prompting Hierarchy (Most → Least Restrictive)</text>
      {levels.map((l,i)=>{const y=top+i*rH,x=(W-l.w)/2;return(
        <g key={i}><rect x={x} y={y} width={l.w} height={rH-3} fill={l.c} rx={4} opacity={.88}/>
          <text x={W/2} y={y+rH-9} textAnchor="middle" fontSize={9} fontWeight="700" fill="#fff">{l.l}</text></g>
      )})}
      <text x={W/2} y={levels.length*rH+top+18} textAnchor="middle" fontSize={9} fill="#64748b">Use the least restrictive prompt that produces the correct response</text>
    </svg>
  )
}

function MeasurementTypesChart() {
  const types=[
    {n:'Duration',desc:'How long behavior lasts each occurrence',c:'#2563eb'},
    {n:'Frequency',desc:'Count of how many times behavior occurs',c:'#7c3aed'},
    {n:'Rate',desc:'Frequency divided by observation time',c:'#0891b2'},
    {n:'Latency',desc:'Time from SD presentation to behavior onset',c:'#16a34a'},
    {n:'IRT',desc:'Time elapsed between successive responses',c:'#dc2626'},
  ]
  const W=290,rH=34,pL=8,top=18
  return (
    <svg viewBox={`0 0 ${W} ${types.length*rH+top+14}`} style={{width:'100%',maxWidth:290,display:'block',margin:'0 auto'}}>
      <text x={W/2} y={13} textAnchor="middle" fontSize={10} fontWeight="700" fill="#64748b">Continuous Measurement Types</text>
      {types.map((t,i)=>{const y=top+i*rH;return(
        <g key={i}>
          <rect x={pL} y={y} width={W-pL*2} height={rH-4} fill={`${t.c}15`} rx={6} stroke={`${t.c}40`} strokeWidth={1}/>
          <rect x={pL} y={y} width={8} height={rH-4} fill={t.c} rx={3} opacity={.85}/>
          <text x={pL+14} y={y+rH-12} fontSize={11} fontWeight="800" fill={t.c}>{t.n}</text>
          <text x={pL+100} y={y+rH-12} fontSize={9} fill="#64748b">{t.desc}</text>
        </g>
      )})}
    </svg>
  )
}

function GraphElementsChart() {
  const W=290,H=90,pL=30,pB=28
  const data=[6,6,5,6,5,2,2,1,2,1]
  const pts=data.map((v,i)=>[pL+(i/(data.length-1))*(W-pL-10),H-(v/8)*H+16])
  const bx=pL+(4/(data.length-1))*(W-pL-10)
  return (
    <svg viewBox={`0 0 ${W} ${H+pB+14}`} style={{width:'100%',maxWidth:290,display:'block',margin:'0 auto'}}>
      <text x={W/2} y={13} textAnchor="middle" fontSize={10} fontWeight="700" fill="#64748b">Graph Elements — What to Look For</text>
      <line x1={pL-2} y1={16} x2={pL-2} y2={H+16} stroke="#e2e8f0" strokeWidth={1}/>
      <line x1={pL-2} y1={H+16} x2={W-10} y2={H+16} stroke="#e2e8f0" strokeWidth={1}/>
      <line x1={bx} y1={16} x2={bx} y2={H+16} stroke="#2c6e49" strokeDasharray="4,3" strokeWidth={1.5}/>
      <text x={bx+2} y={26} fontSize={8} fill="#166534">B→</text>
      <polyline points={pts.map(p=>p.join(',')).join(' ')} fill="none" stroke="#1a3a5c" strokeWidth={2}/>
      {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={3} fill="#1a3a5c"/>)}
      <text x={pL+30} y={H+26} textAnchor="middle" fontSize={8} fill="#64748b">Level</text>
      <text x={W/2} y={H+26} textAnchor="middle" fontSize={8} fill="#64748b">Trend ↘</text>
      <text x={W-30} y={H+26} textAnchor="middle" fontSize={8} fill="#64748b">Variability</text>
      <text x={pL-4} y={20} textAnchor="end" fontSize={8} fill="#94a3b8">Hi</text>
      <text x={pL-4} y={H+16} textAnchor="end" fontSize={8} fill="#94a3b8">Lo</text>
      <text x={W/2} y={H+38} textAnchor="middle" fontSize={8.5} fill="#475569" fontStyle="italic">Stable baseline → clear change → maintained effect</text>
    </svg>
  )
}

function ConceptVisual({type}) {
  const map={fa_chart:<FAChart/>,extinction_graph:<ExtinctionGraph/>,prompt_hierarchy:<PromptHierarchyChart/>,measurement_types:<MeasurementTypesChart/>,graph_analysis:<GraphElementsChart/>}
  return map[type]||null
}

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
  skippedPretest: false,
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
  // study stats
  stats: { daysStudied:[], todayDate:'', todayMinutes:0, totalMinutes:0, modulesPassed:0, pretestsCompleted:0, examAttempts:0 },
}

// ─── StatsCard ────────────────────────────────────────────────────────────────
function StatsCard({ stats }) {
  const days = stats?.daysStudied?.length || 0
  if (days === 0 && !stats?.pretestsCompleted && !stats?.modulesPassed && !stats?.examAttempts) return null
  const streak = calculateStreak(stats?.daysStudied)
  return (
    <div style={{
      marginBottom: '1.25rem',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      border: '1px solid #86efac', borderRadius: 14, padding: '1rem 1.1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10, flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: '#166534', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>📊 Your Progress</h3>
        {streak > 0 && (
          <div style={{ fontSize: 12, fontWeight: 800, color: '#166534', background: '#fff', padding: '4px 11px', borderRadius: 99, border: '1.5px solid #86efac', whiteSpace: 'nowrap' }}>
            🔥 {streak}-day streak
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px', fontSize: 13, color: '#1e293b' }}>
        <div>📅 <strong>{days}</strong> day{days === 1 ? '' : 's'} studied</div>
        <div>⏱️ Today: <strong>{formatDuration(stats?.todayMinutes || 0)}</strong></div>
        <div>✓ <strong>{stats?.modulesPassed || 0}</strong> quiz{(stats?.modulesPassed || 0) === 1 ? '' : 'zes'} passed</div>
        <div>🕐 Total: <strong>{formatDuration(stats?.totalMinutes || 0)}</strong></div>
      </div>
      {((stats?.pretestsCompleted || 0) > 0 || (stats?.examAttempts || 0) > 0) && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #86efac', fontSize: 12, color: '#64748b' }}>
          {(stats?.pretestsCompleted || 0) > 0 && <span style={{ marginRight: 14 }}>📝 {stats.pretestsCompleted} pretest{stats.pretestsCompleted === 1 ? '' : 's'}</span>}
          {(stats?.examAttempts || 0) > 0 && <span>🏁 {stats.examAttempts} exam attempt{stats.examAttempts === 1 ? '' : 's'}</span>}
        </div>
      )}
    </div>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ phase, pretestSubmitted, skippedPretest, moduleStatus, weakDomains, onNav, onReset }) {
  const studyStarted = pretestSubmitted || skippedPretest
  const allPassed = weakDomains.length > 0 && weakDomains.every(d => moduleStatus[d] === 'passed')
  const examUnlocked = studyStarted && (weakDomains.length === 0 || allPassed)

  const navItems = [
    { id: 'welcome', label: 'Home', icon: '🏠', always: true },
    { id: 'pretest', label: 'Pretest', icon: '📝', unlock: true },
    { id: 'pretest_results', label: 'Results', icon: '📊', unlock: pretestSubmitted },
    { id: 'modules', label: 'Study', icon: '📚', unlock: studyStarted && weakDomains.length > 0 },
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
function WelcomeScreen({ onBegin, onSkip, stats }) {
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

      <StatsCard stats={stats}/>

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
        <button onClick={onSkip}
          style={{ marginTop: '1.1rem', padding: '.7rem 1.8rem', background: 'transparent', color: '#2c6e49', border: '2px solid #2c6e49', borderRadius: 10, fontSize: '.92rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
          Skip pretest — study all 6 modules →
        </button>
        <p style={{ marginTop: '.5rem', fontSize: '.76rem', color: '#94a3b8', maxWidth: 400, margin: '.5rem auto 0' }}>
          Skipping unlocks every module. You'll still need to pass each quiz (≥80%) to unlock the full exam.
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
function ModuleScreen({ domainName, modulePhase, quizAnswers, quizSubmitted, onAnswer, onSubmitQuiz, onRetryQuiz, onBackToModules, onStartQuiz, onReviewConcepts }) {
  const mod = MODULES[domainName]
  const [conceptIdx, setConceptIdx] = useState(0)
  const [quizIdx, setQuizIdx] = useState(0)
  const color = DOMAIN_COLORS[domainName]

  if (!mod) return <div className="page"><p>Module not found.</p></div>

  if (modulePhase === 'content') {
    const enh = MODULE_ENHANCEMENTS[domainName]?.[conceptIdx] || {}
    const concept = { ...mod.concepts[conceptIdx], ...enh }
    const ctype = CONCEPT_TYPES[conceptIdx % CONCEPT_TYPES.length]
    return (
      <div className="page">
        <GlobalStyles/>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={onBackToModules}>← Back</button>
          <h2 style={{ fontWeight: 800, color, fontSize: '1.2rem' }}>
            {DOMAIN_ICONS[domainName]} {domainName}
          </h2>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', alignItems: 'center' }}>
          {mod.concepts.map((_,i) => (
            <div key={i} onClick={() => setConceptIdx(i)} style={{
              height: 8, borderRadius: 99, cursor: 'pointer', flexShrink: 0,
              width: i === conceptIdx ? 28 : 8,
              background: i <= conceptIdx ? ctype.color : '#e2e8f0',
              transition: 'all .3s ease',
            }}/>
          ))}
          <span style={{ fontSize: '.78rem', color: '#94a3b8', marginLeft: 6 }}>{conceptIdx + 1} / {mod.concepts.length}</span>
        </div>

        <div key={`${domainName}-${conceptIdx}`} className="concept-in"
          style={{ marginBottom: '1.25rem', borderRadius: 12, overflow: 'hidden', border: `1px solid ${ctype.border}`, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <div style={{ background: ctype.bg, padding: '9px 16px', borderBottom: `1px solid ${ctype.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{ctype.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: ctype.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ctype.label}</span>
            </div>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {mod.concepts.map((c, i) => (
                <button key={i} onClick={() => setConceptIdx(i)} style={{
                  padding: '.2rem .55rem', borderRadius: 99,
                  background: i === conceptIdx ? color : '#f1f5f9',
                  color: i === conceptIdx ? '#fff' : '#64748b',
                  border: 'none', fontSize: '.72rem', fontWeight: 600, cursor: 'pointer',
                }}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', padding: '1.4rem 1.5rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: ctype.color, marginBottom: '.75rem', lineHeight: 1.35 }}>{concept.title}</h3>
            <p style={{ lineHeight: 1.78, color: '#374151', fontSize: '.93rem', whiteSpace: 'pre-wrap', margin: 0 }}>{concept.body}</p>

            {concept.example && (
              <div style={{ marginTop: '1.1rem', background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '0 10px 10px 0', padding: '.85rem 1rem' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>📋</span> Applied Example
                </div>
                <p style={{ fontSize: '.88rem', lineHeight: 1.7, color: '#374151', margin: 0, fontStyle: 'italic' }}>{concept.example}</p>
              </div>
            )}

            {concept.visual && (
              <div style={{ marginTop: '1.1rem', background: '#f8fafc', borderRadius: 10, padding: '1rem .5rem' }}>
                <ConceptVisual type={concept.visual}/>
              </div>
            )}

            {concept.keyTerms && concept.keyTerms.length > 0 && (
              <div style={{ marginTop: '1.1rem' }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span>🔑</span> Key Terms · tap cards to reveal definitions
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(132px,1fr))', gap: 8 }}>
                  {concept.keyTerms.map((kt, ki) => (
                    <KeyTermCard key={ki} term={kt.term} def={kt.def} color={ctype.color} bg={ctype.bg} border={ctype.border}/>
                  ))}
                </div>
              </div>
            )}
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

        {!passed && (
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🔍</span> Review your {totalQ - correct} missed question{(totalQ - correct) > 1 ? 's' : ''} before retrying
          </div>
        )}

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

        <div style={{ display: 'flex', gap: '.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {!passed && (
            <button className="btn btn-secondary" onClick={onReviewConcepts} style={{ borderColor: color, color }}>
              📖 Re-read Concepts
            </button>
          )}
          {!passed && (
            <button className="btn btn-primary" onClick={onRetryQuiz} style={{ background: color, borderColor: color }}>
              ↺ Retry Quiz
            </button>
          )}
          <button className="btn btn-ghost" onClick={onBackToModules}>← Back to Study Plan</button>
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

// ─── ExamReviewScreen ─────────────────────────────────────────────────────────
function ExamReviewScreen({ examQuestions, examAnswers, onBack }) {
  const [filter, setFilter] = useState('all')
  const [domainFilter, setDomainFilter] = useState('')
  const [idx, setIdx] = useState(0)
  const [showNav, setShowNav] = useState(false)

  const allDomains = [...new Set(examQuestions.map(q => q.domain_name))].sort()
  const missedCount = examQuestions.filter((q, i) => examAnswers[i] !== q.correct).length
  const correctCount = examQuestions.length - missedCount

  const filtered = examQuestions
    .map((q, i) => ({ ...q, _origIdx: i, _userAns: examAnswers[i], _isCorrect: examAnswers[i] === q.correct }))
    .filter(q => {
      if (filter === 'missed' && q._isCorrect) return false
      if (filter === 'correct' && !q._isCorrect) return false
      if (domainFilter && q.domain_name !== domainFilter) return false
      return true
    })

  useEffect(() => { setIdx(0) }, [filter, domainFilter])

  const q = filtered[Math.min(idx, Math.max(0, filtered.length - 1))]
  const filterBtn = (val, label, count, color) => (
    <button onClick={() => setFilter(val)}
      style={{
        padding: '6px 12px', borderRadius: 99,
        border: `1.5px solid ${filter === val ? color : '#e2e8f0'}`,
        background: filter === val ? color : '#fff',
        color: filter === val ? '#fff' : color,
        cursor: 'pointer', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'inherit',
      }}>
      {label} ({count})
    </button>
  )

  return (
    <div className="page">
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: '.75rem' }}>← Back to Results</button>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '.75rem' }}>📖 Exam Review</h2>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {filterBtn('all', 'All', examQuestions.length, '#1d4ed8')}
        {filterBtn('missed', 'Missed', missedCount, '#dc2626')}
        {filterBtn('correct', 'Correct', correctCount, '#16a34a')}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}
          style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, background: '#fff', color: '#1e293b', fontFamily: 'inherit', width: '100%', maxWidth: 360 }}>
          <option value="">All domains</option>
          {allDomains.map(d => <option key={d} value={d}>{DOMAIN_ICONS[d] || ''} {d}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', margin: 0 }}>No questions match the current filters.</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: DOMAIN_COLORS[q.domain_name] || '#1d4ed8', background: `${DOMAIN_COLORS[q.domain_name] || '#1d4ed8'}18`, padding: '3px 10px', borderRadius: 99 }}>
              {DOMAIN_ICONS[q.domain_name]} {q.domain_name}
            </span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Question {idx + 1} of {filtered.length} · original #{q._origIdx + 1}</span>
          </div>

          <div style={{
            padding: '8px 14px', borderRadius: 10, marginBottom: 14, fontSize: 13, fontWeight: 700,
            background: q._userAns === undefined ? '#f1f5f9' : q._isCorrect ? '#dcfce7' : '#fee2e2',
            color: q._userAns === undefined ? '#64748b' : q._isCorrect ? '#16a34a' : '#dc2626',
            border: `1px solid ${q._userAns === undefined ? '#e2e8f0' : q._isCorrect ? '#86efac' : '#fca5a5'}`,
          }}>
            {q._userAns === undefined ? '— Unanswered' : q._isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </div>

          <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '.98rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{q.stem}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
            {q.options.map((opt, i) => {
              const isUser = i === q._userAns
              const isCorrect = i === q.correct
              let bg = '#fff', border = '#e2e8f0', labelColor = '#64748b'
              if (isCorrect) { bg = '#dcfce7'; border = '#86efac'; labelColor = '#16a34a' }
              if (isUser && !isCorrect) { bg = '#fee2e2'; border = '#fca5a5'; labelColor = '#dc2626' }
              return (
                <div key={i} style={{
                  padding: '11px 14px', borderRadius: 10, border: `2px solid ${border}`, background: bg,
                  fontSize: 14, color: '#1e293b', display: 'flex', alignItems: 'flex-start', gap: 10,
                }}>
                  <span style={{ fontWeight: 700, flexShrink: 0, color: labelColor, minWidth: 16 }}>{String.fromCharCode(65 + i)}.</span>
                  <span style={{ flex: 1, lineHeight: 1.55 }}>{opt}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, flexShrink: 0, color: labelColor, whiteSpace: 'nowrap' }}>
                    {isUser && isCorrect ? '✓ Your answer' : isCorrect ? '✓ Correct' : isUser ? '✗ Your answer' : ''}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="card" style={{ padding: '1.1rem 1.25rem', marginBottom: '1rem', background: '#f8fafc' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>📘 Rationale</div>
            <p style={{ fontSize: '.88rem', lineHeight: 1.7, margin: 0 }}>{q.rationale}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: '.75rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>← Previous</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowNav(v => !v)}>📋 Navigator</button>
            <button className="btn btn-primary btn-sm" onClick={() => setIdx(i => Math.min(filtered.length - 1, i + 1))} disabled={idx === filtered.length - 1}>Next →</button>
          </div>

          {showNav && (
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(32px,1fr))', gap: 4 }}>
                {filtered.map((fq, i) => (
                  <button key={i} onClick={() => { setIdx(i); setShowNav(false) }}
                    style={{
                      aspectRatio: '1', borderRadius: 6,
                      border: i === idx ? '2px solid #1d4ed8' : 'none',
                      background: fq._isCorrect ? '#dcfce7' : fq._userAns === undefined ? '#f1f5f9' : '#fee2e2',
                      color: fq._isCorrect ? '#16a34a' : fq._userAns === undefined ? '#94a3b8' : '#dc2626',
                      fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                    {fq._origIdx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─── FinalResultsScreen ───────────────────────────────────────────────────────
function FinalResultsScreen({ examQuestions, examAnswers, examDomainScores, pretestDomainScores, onRetakeExam, onReset, onReview }) {
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

      <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" style={{ flex: '2 1 220px' }} onClick={onReview}>📖 Review All Questions →</button>
        <button className="btn btn-secondary" style={{ flex: '1 1 140px' }} onClick={onRetakeExam}>↺ Retake Exam</button>
        <button className="btn btn-ghost" style={{ flex: '1 1 140px' }} onClick={onReset}>🏠 Start Over</button>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState(() => {
    const p = loadPersisted()
    return p ? { ...INITIAL, ...p } : INITIAL
  })

  useEffect(() => {
    savePersisted(state)
  }, [state])
  const timerRef = useRef(null)

  // Daily activity tracking + session heartbeat (counts 1 min per visible-tab minute)
  useEffect(() => {
    const today = todayISO()
    setState(p => {
      const s = p.stats || {}
      const days = s.daysStudied || []
      const newDays = days.includes(today) ? days : [...days, today]
      const todayMinutes = s.todayDate === today ? (s.todayMinutes || 0) : 0
      return { ...p, stats: { ...s, daysStudied: newDays, todayDate: today, todayMinutes } }
    })
    const heartbeat = setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setState(p => ({
        ...p,
        stats: {
          ...(p.stats || {}),
          todayMinutes: ((p.stats?.todayMinutes) || 0) + 1,
          totalMinutes: ((p.stats?.totalMinutes) || 0) + 1,
        }
      }))
    }, 60000)
    return () => clearInterval(heartbeat)
  }, [])

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
              stats: bumpStat(s.stats, 'examAttempts'),
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
    clearPersisted()
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
        stats: bumpStat(s.stats, 'pretestsCompleted'),
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
        ...(passed ? { stats: bumpStat(s.stats, 'modulesPassed') } : {}),
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
        stats: bumpStat(s.stats, 'examAttempts'),
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
        skippedPretest={state.skippedPretest}
        moduleStatus={state.moduleStatus}
        weakDomains={state.weakDomains}
        onNav={handleNav}
        onReset={reset}
      />

      {phase === 'welcome' && (
        <WelcomeScreen
          stats={state.stats}
          onBegin={() => setState(s => ({ ...s, phase: 'pretest', pretestQuestions: shuffleQuestions(PRETEST_QUESTIONS) }))}
          onSkip={() => {
            const modStatus = {}
            DOMAIN_NAMES.forEach(d => { modStatus[d] = 'available' })
            setState(s => ({ ...s, phase: 'modules', skippedPretest: true, weakDomains: [...DOMAIN_NAMES], moduleStatus: modStatus }))
          }}/>
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
          onReviewConcepts={() => setState(s => ({ ...s, modulePhase: 'content', moduleQuizAnswers: {}, moduleQuizSubmitted: false }))}
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

      {phase === 'exam_review' && state.examQuestions && (
        <ExamReviewScreen
          examQuestions={state.examQuestions}
          examAnswers={state.examAnswers}
          onBack={() => setState(s => ({ ...s, phase: 'final_results' }))}
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
          onReview={() => setState(s => ({ ...s, phase: 'exam_review' }))}
        />
      )}
    </>
  )
}
