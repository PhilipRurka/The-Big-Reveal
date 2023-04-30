import styled, { css } from "styled-components";
import { default as LinkNext } from 'next/link'
import { Colors, Fonts } from "../../styled";

type NavLinkType = {
  $isActive?: boolean
}

const sharedBasicLink = (isActive: boolean | undefined) => ({
  color: isActive ? Colors.eucalyptus : 'initial',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: Colors.persimmon
  },

  // '&:active': {
  //   color: Colors.dodger
  // }
} as const)

export const NavLinkStyled = styled.div`
  display: flex;
  align-content: center;
  height: 100%;
  flex-wrap: wrap;

  a,
  button {
    ${Fonts.primary}
    font-size: 16px;
    line-height: 16px;
    display: inline-block;
  }
`;

export const NavLinkAnchor = styled(LinkNext)<NavLinkType>(({ $isActive }) => {
  return css`
    ${sharedBasicLink($isActive)}
  `
})

export const NavLinkButton = styled.button<NavLinkType>(({ $isActive }) => {
  return css`
    ${sharedBasicLink($isActive)}
    cursor: pointer;
  `
})

export const NewPostButton = styled(LinkNext)<NavLinkType>`
  position: relative;
  padding: 8px 30px 8px 12px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  color: #fff;
  background-color: ${(props) => props.$isActive ? Colors.eucalyptus : 'black'};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background-image: url('/assets/svg/plus-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }

  &:hover {
    background-color: ${Colors.persimmon}
  }

  &:active {
    color: white;
    background-color: ${Colors.dodger}
  }

  &:focus {
    color: #fff;
  }
`;