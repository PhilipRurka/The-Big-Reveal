import { FC, MutableRefObject, useMemo } from "react"
import Tiny from "./Tiny"
import { Editor } from "tinymce"

type TinyType = {
  tinyRef: MutableRefObject<Editor>
}

const TinyContainer: FC<TinyType> = ({
  tinyRef
}) => {
  const onInit = (_: unknown, editor: Editor) => tinyRef.current = editor

  const TinyConfigs = useMemo(() => {
    return {
      tinymceScriptSrc: `/tinymce/tinymce.min.js`,
      initialValue: '<p>This is the initial content of the editor.</p>',
      init: {
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }
    }
  }, [])

  return (
    <Tiny
      {...TinyConfigs}
      onInit={onInit} />
  )
}

export default TinyContainer