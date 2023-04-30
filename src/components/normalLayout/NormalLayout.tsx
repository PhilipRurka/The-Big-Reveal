import { FC } from "react";
import { NormalLayoutStyled } from "./NormalLayout.styled";

type NormalLayoutType = {
  children: JSX.Element | JSX.Element[]
}

const NormalLayout: FC<NormalLayoutType> = ({
  children
}) => {
  return (
    <NormalLayoutStyled>
      { children }
    </NormalLayoutStyled>
  )
}

export default NormalLayout