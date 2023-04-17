import { FC } from "react"
import DesktopHeader from "./DesktopHeader"
import { NavigationsType } from "../../../../utils/navigation"
import { useRouter } from "next/router"
import { MobileBurgerType } from "../mobileBurger/MobileBurger.container"

type DesktopHeaderType = MobileBurgerType & {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>,
  isXs: undefined | boolean
}

const DesktopHeaderContainer: FC<DesktopHeaderType> = ({
  navigationItems,
  handleLogout,
  openedBurger,
  handleUpdateBurger,
  isXs
}) => {
  const router = useRouter()

  return (
    <DesktopHeader
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      openedBurger={openedBurger}
      handleUpdateBurger={handleUpdateBurger}
      router={router}
      isXs={isXs} />
  )
}

export default DesktopHeaderContainer