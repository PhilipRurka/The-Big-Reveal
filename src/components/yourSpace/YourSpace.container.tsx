import { FC } from "react"
import YourSpace from "./YourSpace"
import { YourSpaceType } from "../../../pages/your-space"

const YourSpaceContainer: FC<YourSpaceType> = ({ yourSpaceData }) => {
  return (
    <YourSpace {...yourSpaceData} />
  )
}

export default YourSpaceContainer