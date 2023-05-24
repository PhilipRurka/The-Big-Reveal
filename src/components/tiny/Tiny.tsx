import { FC } from "react";
import { tinyContentStyles, TinyStyled } from "./Tiny.styled";
import { Editor as EditorReact } from "@tinymce/tinymce-react";
import { Colors, Fonts } from "../../styled";
import { Editor } from "tinymce";

type TinyType = {
  onInit: (_: unknown, editor: Editor) => void
  tinyId: string,
  tinyInitValue?: string
  handleChange: (value: string) => void
}

const Tiny: FC<TinyType> = ({
  onInit,
  tinyId,
  tinyInitValue = '',
  handleChange
}) => {
  return (
    <TinyStyled>
      <EditorReact
        id={tinyId}
        onInit={onInit}
        tinymceScriptSrc={`/tinymce/tinymce.min.js`}
        initialValue={tinyInitValue}
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
          toolbar: `
            undo redo |
            blocks |
            bold italic forecolor |
            alignleft aligncenter alignright alignjustify | 
            bullist numlist outdent indent |
            removeformat |
            help
          `,
          content_style: tinyContentStyles,
        }}
        onEditorChange={handleChange} />
    </TinyStyled>
  )
}

export default Tiny