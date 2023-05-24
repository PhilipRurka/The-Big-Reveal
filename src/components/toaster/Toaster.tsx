import {FC } from "react";
import type { ToasterState } from "../../redux/slices/toasterSlice";

import { forwardRef } from "react";
import { AnchorContent, StaticContent, Subtitle, Title, ToasterStyled } from "./Toaster.styled";

type ToasterProps = ToasterState

type ToasterContentProps = {
  children: JSX.Element[]
  to?: string
}

const Toaster = forwardRef<HTMLDivElement, ToasterProps>(({
  title,
  subtitle,
  to
}, ref) => {
  return (
    <ToasterStyled
      id='toaster'
      ref={ref} >
      <ToasterContent to={to}>
        <Title>
          { title }
        </Title>
        <Subtitle>
          { subtitle }
        </Subtitle>
      </ToasterContent>
    </ToasterStyled>
  )
})

const ToasterContent: FC<ToasterContentProps> = ({
  children,
  to
}) => {
  if(to) {
    return (
      <AnchorContent href={to}>
        { children }
      </AnchorContent>
    )

  } else {
    return (
      <StaticContent>
        { children }
      </StaticContent>
    )
  }
}

Toaster.displayName = 'Toaster'

export default Toaster