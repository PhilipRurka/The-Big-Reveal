import { FC } from "react"
import DesktopHeader, { DesktopHeaderType } from "./DesktopHeader"

const DesktopHeaderContainer: FC<DesktopHeaderType> = ({
  navigationItems,
  handleLogout
}) => {
  return (
    <DesktopHeader
      navigationItems={navigationItems}
      handleLogout={handleLogout} />
  )
}

export default DesktopHeaderContainer