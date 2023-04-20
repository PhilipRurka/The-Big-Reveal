import { FC } from "react";
import { NormalLayoutWrapper } from "./NormalLayout.styled";

type NormalLayoutType = {
  children: JSX.Element | JSX.Element[]
}

const NormalLayout: FC<NormalLayoutType> = ({
  children
}) => {
  return (
    <NormalLayoutWrapper>
      { children }
    </NormalLayoutWrapper>
  )
}

export default NormalLayout