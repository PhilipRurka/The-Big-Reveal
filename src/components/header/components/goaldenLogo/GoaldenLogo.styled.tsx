import styled from "styled-components"
import { default as ImageNext } from 'next/image'
import { default as LinkNext } from 'next/link'

export const GoaldenLogoWrapper = styled.div``

export const GoaldenLogoAnchor = styled(LinkNext)``

export const GoaldenImg = styled(ImageNext)`
  height: 30px;
  width: 30px;
  object-fit: contain;
`