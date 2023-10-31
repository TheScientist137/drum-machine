/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { drumSounds } from '../../util/sounds'

function DrumMachine () {
  const [displayText, setDisplayText] = useState('')

  const playSound = keyTrigger => {
    const sound = drumSounds.find(sound => sound.keyTrigger === keyTrigger)
    if (sound) {
      const audioElement = document.getElementById(keyTrigger)
      if (audioElement) {
        audioElement.currentTime = 0
        audioElement.play()
        setDisplayText(sound.sound || sound.keyTrigger)
      }
    }
  }

  const handleKeyPress = event => {
    const key = event.key.toUpperCase()
    const validKeys = drumSounds.map(sound => sound.keyTrigger)
    if (validKeys.includes(key)) {
      playSound(key)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div id='drum-machine' className='container text-center vh-100'>
      <h1>Drum Machine</h1>
      <div id='display' className='mt-4'>
        {displayText}
      </div>
      <div className='row mt-4 h-75 w-100'>
        {drumSounds.map(sound => (
          <div className='col-4 h-auto' key={sound.keyTrigger}>
            <div
              className='drum-pad btn btn-light w-100 h-75 text-center fs-1 d-flex align-items-center justify-content-center'
              onClick={() => playSound(sound.keyTrigger)}
              id={sound.sound}
            >
              <p>{sound.keyTrigger}</p>
              <audio
                id={sound.keyTrigger}
                className='clip'
                src={sound.url}
              ></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DrumMachine
