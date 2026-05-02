import { useEffect, useRef, useState } from 'react'

/**
 * One Love access gate — client-side soft password protection.
 *
 * SECURITY NOTE: this is a soft gate. The hash + bundle are public, so a
 * determined visitor with DevTools can still see the questions. It stops
 * casual access — for paying-client protection later, swap this for
 * Cloudflare Access in front of the site (see notes in repo README).
 *
 * To CHANGE THE PASSWORD:
 *   1. Pick a new password.
 *   2. In your terminal:
 *        node -e "const c=require('crypto');console.log(c.createHash('sha256').update('onelove-rbt:NEW_PASSWORD_HERE').digest('hex'))"
 *   3. Paste the resulting 64-char hex string into ACCESS_HASH below.
 *   4. Commit + push.
 *
 * To ENABLE LOGIN TRACKING (Google Sheet):
 *   1. Follow setup in repo README — deploy the Apps Script web app.
 *   2. Paste the deployment URL into LOG_ENDPOINT below.
 *   3. Commit + push. Each successful login will append a row.
 *   If LOG_ENDPOINT stays as the placeholder, logging is silently disabled.
 *
 * Access code is required on every page load — no "remember me", no
 * persisted session. Refreshing the tab returns the user to this gate.
 */
const ACCESS_SALT = 'onelove-rbt'
const ACCESS_HASH = '9b02115ed1838edc351ecfb27812c3e56cac1aba8c1bd6f3f96c71d225f175c2' // sha256("onelove-rbt:onelove2026")
const APP_NAME = 'RBT'
const LOG_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzPJa2EKhCGep6WRsbqWjq_eHBx-wQ58p92KkkiayzvHjFkCekaHRFlyk0FVvECd-ckjg/exec'

async function sha256Hex(s) {
  const bytes = new TextEncoder().encode(s)
  const buf = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

// Fire-and-forget login log. Uses no-cors so a failing endpoint never
// blocks the user, and does NOT await — the gate proceeds regardless.
function logLogin(name) {
  if (!LOG_ENDPOINT || LOG_ENDPOINT.startsWith('PASTE_')) return
  try {
    const payload = {
      app: APP_NAME,
      name: name.trim(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent || '',
      timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
      referrer: document.referrer || '',
      language: navigator.language || '',
    }
    const body = new Blob([JSON.stringify(payload)], { type: 'text/plain' })
    if (!navigator.sendBeacon || !navigator.sendBeacon(LOG_ENDPOINT, body)) {
      fetch(LOG_ENDPOINT, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload), keepalive: true }).catch(() => {})
    }
  } catch { /* never block login on a logging failure */ }
}

function OneLoveGateLogo() {
  return (
    <svg height={40} viewBox="0 0 380 80" xmlns="http://www.w3.org/2000/svg" aria-label="One Love" style={{ display: 'block' }}>
      <text x="170" y="60" textAnchor="end" fontFamily="Fraunces, Georgia, serif" fontWeight="900" fontSize="54" letterSpacing="-1.2" fill="#fbf7ea">One</text>
      <g transform="translate(190, 35)">
        <path d="M 10 4 C 10 -2, 4 -6, 0 -2 C -4 -6, -10 -2, -10 4 C -10 11, 0 17, 0 17 C 0 17, 10 11, 10 4 Z" fill="#c4493a"/>
      </g>
      <text x="208" y="60" fontFamily="Fraunces, Georgia, serif" fontWeight="900" fontStyle="italic" fontSize="54" letterSpacing="-1.2" fill="#fbf7ea">Love</text>
    </svg>
  )
}

export default function Gate({ children }) {
  const [authed, setAuthed] = useState(false)
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => { if (!authed) nameRef.current?.focus() }, [authed])

  async function onSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !pw || busy) return
    setBusy(true); setError('')
    try {
      const candidate = await sha256Hex(`${ACCESS_SALT}:${pw}`)
      if (candidate === ACCESS_HASH) {
        logLogin(name)
        setAuthed(true)
      } else {
        setError('That access code didn’t match. Check with your provider.')
      }
    } catch {
      setError('Browser couldn’t verify. Try a different browser.')
    } finally {
      setBusy(false); setPw('')
    }
  }

  if (authed) return children

  const fieldLabel = { display: 'block', fontSize: 11, fontWeight: 700, color: '#fbf7ea', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }
  const fieldInput = (errored) => ({
    width: '100%', padding: '12px 14px', fontSize: 15,
    border: `1.5px solid ${errored ? '#c4493a' : 'rgba(251,247,234,0.18)'}`,
    borderRadius: 10, background: '#15130c', color: '#fbf7ea',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  })

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: 'linear-gradient(180deg, #131311 0%, #1d1c18 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: 440, background: '#1f1d18', border: '1px solid rgba(217,153,22,0.22)',
        borderRadius: 18, padding: '36px 32px 28px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <OneLoveGateLogo/>
        </div>
        <div style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'rgba(251,247,234,0.55)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 22 }}>
          Licensed Behavior Analysts PLLC
        </div>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700, fontSize: 22, color: '#fbf7ea', margin: '0 0 6px', textAlign: 'center' }}>
          RBT Exam Prep
        </h1>
        <p style={{ fontSize: 13.5, color: 'rgba(251,247,234,0.7)', margin: '0 0 22px', textAlign: 'center', lineHeight: 1.5 }}>
          Sign in to continue.
        </p>
        <form onSubmit={onSubmit}>
          <label htmlFor="ol-name" style={fieldLabel}>Your name</label>
          <input
            id="ol-name" ref={nameRef} type="text" autoComplete="name" spellCheck={false}
            value={name} onChange={e => setName(e.target.value)} disabled={busy}
            placeholder="First and last name"
            style={fieldInput(false)}
          />
          <label htmlFor="ol-pw" style={{ ...fieldLabel, marginTop: 14 }}>Access code</label>
          <input
            id="ol-pw" type="password" autoComplete="off" spellCheck={false}
            value={pw} onChange={e => setPw(e.target.value)} disabled={busy}
            style={fieldInput(!!error)}
          />
          {error && <div style={{ marginTop: 8, fontSize: 12.5, color: '#e8a597' }}>{error}</div>}
          <button type="submit" disabled={busy || !pw || !name.trim()}
            style={{
              width: '100%', marginTop: 16, padding: '13px', borderRadius: 10, border: 'none',
              background: (busy || !pw || !name.trim()) ? 'rgba(217,153,22,0.4)' : '#d99916', color: '#131311',
              fontSize: 14.5, fontWeight: 700, letterSpacing: '0.02em',
              cursor: (busy || !pw || !name.trim()) ? 'default' : 'pointer',
              fontFamily: 'inherit',
            }}>
            {busy ? 'Verifying…' : 'Enter'}
          </button>
        </form>
        <p style={{ fontSize: 11, color: 'rgba(251,247,234,0.5)', margin: '22px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
          Need a code? Email <a href="mailto:lenwoodjr@gmail.com" style={{ color: '#d99916', fontWeight: 600 }}>lenwoodjr@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
