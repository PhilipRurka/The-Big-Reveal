import { createGlobalStyle } from "styled-components";

export const BreakObj = {
  xs: {
    breakpoint: {
      break: 576,
      media: '@media (max-width: 576px)',
    },
    container: {
      value: 540,
      maxWidth: 'max-width: 540px;'
    }
  },
  sm: {
    breakpoint: {
      break: 767,
      media: '@media (max-width: 767px)',
    },
    container: {
      value: 720,
      maxWidth: 'max-width: 720px;'
    }
  },
  md: {
    breakpoint: {
      break: 991,
      media: '@media (max-width: 991px)',
    },
    container: {
      value: 960,
      maxWidth: 'max-width: 960px;'
    }
  },
  lg: {
    breakpoint: {
      break: 1199,
      media: '@media (max-width: 1199px)',
    },
    container: {
      value: 1140,
      maxWidth: 'max-width: 1140px;'
    }
  },
  xl: {
    breakpoint: {
      break: 1399,
      media: '@media (max-width: 1399px)',
    },
    container: {
      value: 1320,
      maxWidth: 'max-width: 1320px;'
    }
  }
} as const;

export const Container = (size: keyof typeof BreakObj): string => {
  return `
    ${BreakObj[size].container.maxWidth}
    margin: auto;
    padding-left: 50px;
    padding-right: 50px;
  `
};

export const LayoutStyles = createGlobalStyle`
  main {
    padding-top: 72px;
  }
`