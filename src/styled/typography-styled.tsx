import { createGlobalStyle } from "styled-components";

export const Fonts = {
  primary:   'font-family: "Noto Sans", sans-serif;',
  secondary: 'font-family: "Varela Round", sans-serif;'
};

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Varela Round';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/VarelaRound-Regular.ttf');
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/noto-sans-v21-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans'),
         local('Noto-Sans'),
         url('./fonts/noto-sans-v21-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-v21-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-v21-latin-regular.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-v21-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-v21-latin-regular.svg#NotoSans') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 400;
    src: url('./fonts/noto-sans-v21-latin-italic.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans'),
         local('Noto-Sans'),
         url('./fonts/noto-sans-v21-latin-italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-v21-latin-italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-v21-latin-italic.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-v21-latin-italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-v21-latin-italic.svg#NotoSans') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    src: url('./fonts/noto-sans-v21-latin-700.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans'),
         local('Noto-Sans'),
         url('./fonts/noto-sans-v21-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-v21-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-v21-latin-700.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-v21-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-v21-latin-700.svg#NotoSans') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans';
    font-style: italic;
    font-weight: 700;
    src: url('./fonts/noto-sans-v21-latin-700italic.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans'),
         local('Noto-Sans'),
         url('./fonts/noto-sans-v21-latin-700italic.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./fonts/noto-sans-v21-latin-700italic.woff2') format('woff2'), /* Super Modern Browsers */
         url('./fonts/noto-sans-v21-latin-700italic.woff') format('woff'), /* Modern Browsers */
         url('./fonts/noto-sans-v21-latin-700italic.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./fonts/noto-sans-v21-latin-700italic.svg#NotoSans') format('svg'); /* Legacy iOS */
  }
`;