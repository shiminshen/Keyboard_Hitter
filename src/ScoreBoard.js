import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
`

export default ({ score, addScore }) => {
  return <Wrapper>Score: {score}</Wrapper>
}
