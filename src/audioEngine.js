import bgUrl from './assets/bg.mp3?url'

function el() {
  let a = document.getElementById('fm-bg')
  if (!a) {
    a = document.createElement('audio')
    a.id = 'fm-bg'
    a.loop = true
    a.playsInline = true
    a.preload = 'auto'
    document.body.appendChild(a)
  }
  if (a.getAttribute('data-src') !== bgUrl) {
    a.src = bgUrl
    a.setAttribute('data-src', bgUrl)
  }
  return a
}

export function isMusicPlaying() {
  const a = document.getElementById('fm-bg')
  return !!(a && !a.paused && !a.muted)
}

export async function playMusic() {
  const a = el()
  a.loop = true
  a.volume = 0.55
  a.muted = false
  try {
    await a.play()
    return true
  } catch (err) {
    console.warn('[fatalmed audio]', err)
    return false
  }
}

export function pauseMusic() {
  const a = document.getElementById('fm-bg')
  if (a) a.pause()
}

export function toggleMusic() {
  const a = el()
  if (a.paused) {
    a.muted = false
    a.volume = 0.55
    a.play().catch((e) => console.warn('[fatalmed audio]', e))
    return true
  }
  a.pause()
  return false
}
