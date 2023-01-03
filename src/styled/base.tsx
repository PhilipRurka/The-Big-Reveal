import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Fonts } from '.'

export const ResetStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    ${Fonts.primary}
  }

  a,
  span {
    display: block;
  }

  a {
    text-decoration: none;

    &:active,
    &:focus {
      color: black;
    }
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }
`