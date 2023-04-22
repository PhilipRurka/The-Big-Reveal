import { FC } from "react"
import YourSpace from "./YourSpace"
import { YourSpaceDataType } from "../../../pages/your-space"

const YourSpaceContainer: FC<YourSpaceDataType> = ({
  profileData,
  baseData
}) => {
  return (
    <YourSpace
      {...profileData}
      yourWorkList={baseData} />
  )
}

export default YourSpaceContainer