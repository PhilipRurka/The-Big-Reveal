import styled from 'styled-components';
import { Button as styledButton } from "../../styled/button";
import { default as LinkNext } from 'next/link'
import { Colors } from '../../styled';

export const PostDisplayStyled = styled.div`
  line-height: 1.4;
  font-size: 16px;

  /** START - Grabbed from Tiny Styles */
  h1 {
    /* display: block; */
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    /** END - Grabbed from Tiny Styles */
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  h5 {
    display: block;
    font-size: 0.83em;
    margin-block-start: 1.67em;
    margin-block-end: 1.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  h6 {
    display: block;
    font-size: 0.67em;
    margin-block-start: 2.33em;
    margin-block-end: 2.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  pre {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1em 0px;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  p {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  ul, ol {
    span {
      display: inline;
    }
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  ol:not([style]) {
    li::marker {
      unicode-bidi: isolate;
      font-variant-numeric: tabular-nums;
      text-transform: none;
      text-indent: 0px !important;
      text-align: start !important;
      text-align-last: start !important;
    }
  }
`;

export const BaseSection = styled.div`
  
`;

export const DescriptionSection = styled.div`
  overflow: hidden;
  height: 0;
`;

export const Date = styled.span`

`;

export const Author = styled(LinkNext)`
  color: ${Colors.eucalyptus};
`;

export const BaseInformation = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 40px;
`;

export const Button = styled(styledButton)`
  margin-top: 50px;
`;

export const DescriptionContent = styled.div`
  
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  & > button {
    margin-left: 20px;
    
    &:first-child {
      margin-left: 0;
    }
  }
`;