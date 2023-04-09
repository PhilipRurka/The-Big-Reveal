import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const Fonts = {
  primary:   'font-family: var(--font-noto), sans-serif;',
};

export const ResetStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  a,
  span {
    display: block;
  }

  a {
    text-decoration: none;
    color: black;

    &:active,
    &:focus {
      color: black;
    }
  }

  button {
    display: block;
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  header,
  main {
    ${Fonts.primary}
  }
`