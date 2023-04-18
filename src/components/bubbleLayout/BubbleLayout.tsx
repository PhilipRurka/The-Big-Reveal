import { FC } from "react";
import { BubbleLayoutWrapper } from "./BubbleLayout.styled";
import { BubbleLayoutContainerType } from "./BubbleLayout.container";

type BubbleLayoutType = {
  children: BubbleLayoutContainerType['children']
  backgroundColor: string
  copyColor: string
}

const BubbleLayout: FC<BubbleLayoutType> = ({
  children,
  backgroundColor,
  copyColor
}) => {
  return (
    <BubbleLayoutWrapper
      backgroundColor={backgroundColor}
      copyColor={copyColor} >
      { children }
    </BubbleLayoutWrapper>
  )
}

export default BubbleLayout