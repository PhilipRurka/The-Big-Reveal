import { FC } from "react";
import { TinyStyled } from "./Tiny.styled";
import { Editor as EditorReact } from "@tinymce/tinymce-react";
import { Fonts } from "../../styled";
import { Editor } from "tinymce";

type TinyType = {
  onInit: (_: unknown, editor: Editor) => void
  tinyId: string,
  handleChange: (value: string) => void
}

const Tiny: FC<TinyType> = ({
  onInit,
  tinyId,
  handleChange
}) => {
  return (
    <TinyStyled>
      <EditorReact
        id={tinyId}
        onInit={onInit}
        tinymceScriptSrc={`/tinymce/tinymce.min.js`}
        initialValue=''
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: `body { ${Fonts.tiny} font-size:16px }`,
        }}
        onEditorChange={handleChange} />
    </TinyStyled>
  )
}

export default Tiny