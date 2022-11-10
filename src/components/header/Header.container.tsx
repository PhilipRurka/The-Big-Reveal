import { FC } from "react"
import Header from "./Header"

export type HeaderType = {
  componentName: string
}

const HeaderContainer: FC<HeaderType> = ({
  componentName
}) => {

  return (
    <Header componentName={componentName} />
  )
}

export default HeaderContainer