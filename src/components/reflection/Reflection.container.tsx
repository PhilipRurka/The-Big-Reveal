import { FC } from "react";
import Reflection from "./Reflection";
import { ReflectionDataType } from "../../../pages/feed/reflection";

const ReflectionContainer: FC<ReflectionDataType> = ({ publicData }) => {
  return (
    <Reflection publicData={publicData} />
  )
}

export default ReflectionContainer