import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { getRandomLetter } from './lib'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

const Row = styled.div`
  display: flex;

  & + & {
    margin-top: 8px;
  }
`

const FirstRow = styled(Row)`
  margin-top: 8px;
  padding: 0 20px;
`

const SecondRow = styled(Row)`
  margin-top: 8px;
  padding: 0 40px;
`

const ThirdRow = styled(Row)`
  margin-top: 8px;
  padding: 0 60px;
`

const Button = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.highlight ? '#eee' : '#aaa')};
  border-radius: 5px;
  font-size: 24px;

  & + & {
    margin-left: 8px;
  }
`

const KEYBORAD_MAP = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

export default ({ addScore }) => {
  const [buttonStatus, setButtonStatus] = useState({})
  const intervalRef = useRef()

  const clearHighlightButton = (letter, valid = false) => {
    const currentTimer = buttonStatus[letter]
    if (valid) {
      addScore(currentTimer ? 1 : -1)
    }

    clearTimeout(currentTimer)
    setButtonStatus(buttonStatus => ({
      ...buttonStatus,
      [letter]: null
    }))
  }

  useEffect(() => {
    const setClearHighlightTimer = randomLetter =>
      setTimeout(
        () => clearHighlightButton(randomLetter),
        Math.floor(Math.random() * 3000)
      )

    const id = setInterval(() => {
      const randomLetters = getRandomLetter(Math.floor(Math.random() * 3))
      const addKeys = randomLetters.reduce((R, V) => {
        if (!buttonStatus[V]) {
          R[V] = setClearHighlightTimer(V)
        }
        return R
      }, {})
      setButtonStatus(buttonStatus => ({
        ...buttonStatus,
        ...addKeys
      }))
    }, Math.floor(Math.random() * 700))
    intervalRef.current = id

    const handleKeyDown = e => clearHighlightButton(e.key, true)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearInterval(intervalRef.current)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <Wrapper>
      <FirstRow>
        {KEYBORAD_MAP[0].map(I => (
          <Button
            key={I}
            highlight={buttonStatus[I]}
            onClick={() => clearHighlightButton(I)}
          >
            {I}
          </Button>
        ))}
      </FirstRow>
      <SecondRow>
        {KEYBORAD_MAP[1].map(I => (
          <Button
            key={I}
            highlight={buttonStatus[I]}
            onClick={() => clearHighlightButton(I)}
          >
            {I}
          </Button>
        ))}
      </SecondRow>
      <ThirdRow>
        {KEYBORAD_MAP[2].map(I => (
          <Button
            key={I}
            highlight={buttonStatus[I]}
            onClick={() => clearHighlightButton(I)}
          >
            {I}
          </Button>
        ))}
      </ThirdRow>
    </Wrapper>
  )
}
