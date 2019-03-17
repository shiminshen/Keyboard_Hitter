import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import ScoreBoard from './ScoreBoard'
import Keyboard from './Keyboard'

const Title = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: center;
  font-size: 40px;
`

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TIME_COUNT_DOWN_MAX = 30

export default () => {
  const intervalRef = useRef()
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState(false)
  const [timeCountdown, setTimeCountdown] = useState(TIME_COUNT_DOWN_MAX)
  const addScore = (s = 1) => setScore(score + s)

  useEffect(() => {
    const id = setInterval(() => {
      if (timeCountdown === 0) {
        setStatus(false)
      }

      if (status && timeCountdown > 0) {
        setTimeCountdown(timeCountdown - 1)
      }
    }, 1000)
    intervalRef.current = id
    return () => {
      clearInterval(intervalRef.current)
    }
  })

  return (
    <div>
      <Title>Keyboard Hitter</Title>
      <ControlPanel>
        <div>Time: {timeCountdown}s</div>
        <button
          type='button'
          onClick={() => {
            setStatus(true)
            setTimeCountdown(TIME_COUNT_DOWN_MAX)
            setScore(0)
          }}
        >
          {status ? 'Restart' : 'Start'}
        </button>
      </ControlPanel>
      <ScoreBoard score={score} addScore={addScore} />
      {status && <Keyboard addScore={addScore} />}
    </div>
  )
}
