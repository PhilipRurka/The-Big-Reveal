import { createGlobalStyle } from "styled-components";

export const Fonts = {
  primary:   'font-family: "Noto Sans", sans-serif;',
};

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 100;
    src: url('./fonts/NotoSans-Thin.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 100;
    src: url('./fonts/NotoSans-ThinItalic.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/NotoSans-Regular.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 400;
    src: url('./fonts/NotoSans-Italic.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 600;
    src: url('./fonts/NotoSans-SemiBold.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 600;
    src: url('./fonts/NotoSans-SemiBoldItalic.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 900;
    src: url('./fonts/NotoSans-Black.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 900;
    src: url('./fonts/NotoSans-BlackItalic.ttf');
  }
`