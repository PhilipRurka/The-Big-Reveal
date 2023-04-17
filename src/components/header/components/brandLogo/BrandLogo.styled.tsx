import styled from "styled-components"
import { default as ImageNext } from 'next/image'
import { default as LinkNext } from 'next/link'

export const BrandLogoWrapper = styled.div``

export const BrandLogoAnchor = styled(LinkNext)``

export const BrandImg = styled(ImageNext)`
  height: 30px;
  width: 30px;
  object-fit: contain;
`