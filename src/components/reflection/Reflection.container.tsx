import { FC } from "react";
import Reflection from "./Reflection";
import { ReflectionDataType } from "../../../pages/feed/reflection";

const ReflectionContainer: FC<ReflectionDataType> = ({ postBase }) => {
  return (
    <Reflection postBase={postBase} />
  )
}

export default ReflectionContainer