import { FC } from "react"
import BubbleLayout from "./BubbleLayout"

export type BubbleLayoutContainerType = {
  children: JSX.Element | JSX.Element[]
}

const BubbleLayoutContainer: FC<BubbleLayoutContainerType> = ({
  children
}) => {

  return (
    <BubbleLayout >
      { children }
    </BubbleLayout>
  )
}

export default BubbleLayoutContainer