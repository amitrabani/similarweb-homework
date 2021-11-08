import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  height: 100%;
  @media only screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    display: unset;
  }
`