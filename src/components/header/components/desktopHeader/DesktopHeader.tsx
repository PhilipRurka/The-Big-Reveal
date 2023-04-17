import { FC } from "react";
import { DesktopHeaderWrapper } from "./DesktopHeader.styled";
import { NavigationsType } from "../../../../utils/navigation";

export type DesktopHeaderType = {
  navigationItems: NavigationsType
  handleLogout: () => Promise<void>
}

const DesktopHeader: FC<DesktopHeaderType> = () => {
  return (
    <DesktopHeaderWrapper>
      
    </DesktopHeaderWrapper>
  )
}

export default DesktopHeader