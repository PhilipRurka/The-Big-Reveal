import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const Reset = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'REPLACE'
  }

  a,
  span {
    display: block;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }
`;