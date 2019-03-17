import React, { Component } from 'react'
import styled from 'styled-components'

import ScoreBoard from './ScoreBoard'
import Keyboard from './Keyboard'

const Title = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: center;
  font-size: 40px;
`

class App extends Component {
  render () {
    return (
      <div>
        <Title>Keyboard Hitter</Title>
        <ScoreBoard />
        <Keyboard />
      </div>
    )
  }
}

export default App
