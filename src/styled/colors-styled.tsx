import { css } from "styled-components";

export const Colors = {
  white:        '#ffffff',
  guardsman:    '#cc0002',
  persimmon:    '#ff5b5c',
  pippin:       '#FFDDDD',
  dodger:       '#6250ff',
  jewel:        '#176437',
  eucalyptus:   '#26A65B',
  algae:        '#7AE1A5',
  limedSpruce:  '#374650',
  parchment:    '#F1E6CF'
} as const;

export const StatusMessageColors = {
  success: css`
    color: ${Colors.jewel};
    background-color: ${Colors.algae};
  `,
  error: css`
    color: ${Colors.guardsman};
    background-color: ${Colors.pippin};
  `
}