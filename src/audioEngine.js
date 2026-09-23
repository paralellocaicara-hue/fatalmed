/** Player global — fora do React pra nao perder o audio no remount */
const CANDIDATES = ['/audio/bg.mp3', '/bg.mp3']

let audio
let unlocked = false
let srcIndex = 0

function ensure() {
  if (!audio) {
    audio = new Audio(CANDIDATES[srcIndex])
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.6
    audio.setAttribute('playsinline', 'true')
    audio.addEventListener('error', () => {
      if (srcIndex < CANDIDATES.length - 1) {
        srcIndex += 1
        audio.src = CANDIDATES[srcIndex]
        audio.load()
      }
    })
  }
  return audio
}

export function getAudio() {
  return ensure()
}

export function isMusicPlaying() {
  const a = ensure()
  return unlocked && !a.paused && !a.muted
}

export async function playMusic() {
  const a = ensure()
  a.muted = false
  a.volume = 0.6
  try {
    await a.play()
    unlocked = true
    return true
  } catch (err) {
    console.warn('[fatalmed audio]', err)
    if (srcIndex < CANDIDATES.length - 1) {
      srcIndex += 1
      a.src = CANDIDATES[srcIndex]
      a.load()
      try {
        await a.play()
        unlocked = true
        return true
      } catch (e2) {
        console.warn('[fatalmed audio fallback]', e2)
      }
    }
    return false
  }
}

export function pauseMusic() {
  ensure().pause()
}

export function toggleMute() {
  const a = ensure()
  a.muted = !a.muted
  return a.muted
}

export function setMuted(v) {
  ensure().muted = !!v
}

export function preloadMusic() {
  ensure().load()
}
