import { FC, MutableRefObject, useMemo } from "react"
import Tiny from "./Tiny"
import { Editor } from "tinymce"
import { Fonts } from "../../styled"

type TinyType = {
  tinyRef: MutableRefObject<Editor>
  tinyId: string
}

const TinyContainer: FC<TinyType> = ({
  tinyRef,
  tinyId
}) => {
  const onInit = (_: unknown, editor: Editor) => tinyRef.current = editor

  const TinyConfigs = useMemo(() => {
    return {
      tinymceScriptSrc: `/tinymce/tinymce.min.js`,
      initialValue: '',
      init: {
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
          'help',
          'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: `body { ${Fonts.tiny} font-size:16px }`
      }
    }
  }, [])

  return (
    <Tiny
      {...TinyConfigs}
      onInit={onInit}
      tinyId={tinyId} />
  )
}

export default TinyContainer