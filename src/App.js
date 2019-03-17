import React, { useState } from 'react'
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
  justify-content: center;
`

export default () => {
  const [score, setScore] = useState(0)
  const addScore = () => setScore(score + 1)
  return (
    <div>
      <Title>Keyboard Hitter</Title>
      <ControlPanel>
        <button type='button' onClick={() => setScore(0)}>
          Restart
        </button>
      </ControlPanel>
      <ScoreBoard score={score} addScore={addScore} />
      <Keyboard addScore={addScore} />
    </div>
  )
}
