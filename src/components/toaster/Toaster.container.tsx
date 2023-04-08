import { FC } from "react";
import Toaster, { ToasterType } from "./Toaster";
import { useAppSelector } from "../../redux/redux_hooks";
import { selectToast } from "../../redux/slices/toasterSlice";

const ToasterContainer: FC = () => {
  const content = useAppSelector(selectToast) as ToasterType

  return (
    <Toaster
      title={content.title}
      subtitle={content.subtitle}
      to={content.to} />
  )
}

export default ToasterContainer