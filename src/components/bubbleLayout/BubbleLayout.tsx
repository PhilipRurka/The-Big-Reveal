import { FC } from "react";
import { BubbleLayoutStyled } from "./BubbleLayout.styled";
import { BubbleLayoutContainerType } from "./BubbleLayout.container";

type BubbleLayoutType = {
  children: BubbleLayoutContainerType['children']
}

const BubbleLayout: FC<BubbleLayoutType> = ({
  children
}) => {
  return (
    <BubbleLayoutStyled>
      { children }
    </BubbleLayoutStyled>
  )
}

export default BubbleLayout