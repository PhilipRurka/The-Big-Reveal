import { FC, useMemo } from "react"
import BubbleLayout from "./BubbleLayout"
import { getContrast } from "../../utils/colors"

export type BubbleLayoutContainerType = {
  children: JSX.Element | JSX.Element[]
  backgroundColor: string
}

const BubbleLayoutContainer: FC<BubbleLayoutContainerType> = ({
  children,
  backgroundColor
}) => {

  const copyColor = useMemo(() => {
    return getContrast(backgroundColor)
  }, [backgroundColor])

  return (
    <BubbleLayout
      backgroundColor={backgroundColor}
      copyColor={copyColor} >
      { children }
    </BubbleLayout>
  )
}

export default BubbleLayoutContainer