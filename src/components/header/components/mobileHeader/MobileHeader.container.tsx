import { FC } from "react"
import MobileHeader from "./MobileHeader"
import { NavigationsType } from "../../../../utils/navigation"
import { useRouter } from "next/router"

type MobileHeaderType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
}

const MobileHeaderContainer: FC<MobileHeaderType> = ({
  navigationItems,
  handleLogout
}) => {
  const router = useRouter()

  return (
    <MobileHeader
      navigationItems={navigationItems}
      handleLogout={handleLogout}
      router={router} />
  )
}

export default MobileHeaderContainer