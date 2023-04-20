import { FC } from "react";
import { TinyWrapper } from "./Tiny.styled";
import { Editor } from "@tinymce/tinymce-react";

type TinyType = any

const Tiny: FC<TinyType> = ({
  onInit,
  ...TinyConfigs
}) => {
  return (
    <TinyWrapper>
      <Editor
        {...TinyConfigs}
        onInit={onInit} />
    </TinyWrapper>
  )
}

export default Tiny