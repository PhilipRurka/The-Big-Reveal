import { FC } from "react"
import NormalLayout from "./NormalLayout"

type NormalLayoutType = {
  children: JSX.Element | JSX.Element[]
}

const NormalLayoutContainer: FC<NormalLayoutType> = ({
  children
}) => {
  return (
    <NormalLayout>
      { children }
    </NormalLayout>
  )
}

export default NormalLayoutContainer