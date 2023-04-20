import { FC, useMemo } from "react"
import BubbleLayout from "./BubbleLayout"
import { getContrast } from "../../utils/colors"

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