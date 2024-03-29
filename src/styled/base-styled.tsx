import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const Fonts = {
  primary:   'font-family: var(--font-noto), sans-serif;',
  secondary:   'font-family: var(--font-roboto), sans-serif;',
  tiny: 'font-family: Helvetica,Arial,sans-serif;'
} as const;

export const ResetStyles = createGlobalStyle`
  ${reset}

  :root {
    --bubble-layout-side-padding: 30px;
  }

  * {
    box-sizing: border-box;
  }

  a,
  span, label {
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
    font: inherit;
  }

  header,
  main {
    ${Fonts.primary}
  }
`