import { FC } from "react";
import { BubbleLayoutWrapper } from "./BubbleLayout.styled";
import { BubbleLayoutContainerType } from "./BubbleLayout.container";

type BubbleLayoutType = {
  children: BubbleLayoutContainerType['children']
}

const BubbleLayout: FC<BubbleLayoutType> = ({
  children
}) => {
  return (
    <BubbleLayoutWrapper>
      { children }
    </BubbleLayoutWrapper>
  )
}

export default BubbleLayout