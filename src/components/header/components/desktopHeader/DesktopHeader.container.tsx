import { FC } from "react"
import DesktopHeader from "./DesktopHeader"
import { NavigationsType } from "../../../../utils/navigation"
import { useRouter } from "next/router"

type DesktopHeaderType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>,
  isXs: undefined | boolean
}

const DesktopHeaderContainer: FC<DesktopHeaderType> = ({
  navigationItems,
  handleLogout,
  isXs
}) => {
  const router = useRouter()

  return (
    <DesktopHeader
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      router={router}
      isXs={isXs} />
  )
}

export default DesktopHeaderContainer