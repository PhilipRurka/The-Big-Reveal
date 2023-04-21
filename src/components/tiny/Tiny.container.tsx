import { FC, MutableRefObject, useMemo } from "react"
import Tiny from "./Tiny"
import { Editor } from "tinymce"
import { Fonts } from "../../styled"

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
      initialValue: `
        <h1 dir="ltr"><span style="color: rgb(0, 0, 0);">Heading 1</span></h1>
        <h2><span style="color: rgb(0, 0, 0);">Heading 2</span></h2>
        <h3><span style="color: rgb(0, 0, 0);">Heading 3</span></h3>
        <h4><span style="color: rgb(0, 0, 0);">Heading 4</span></h4>
        <h5><span style="color: rgb(0, 0, 0);">Heading 5</span></h5>
        <h6><span style="color: rgb(0, 0, 0);">Heading 6</span></h6>
        <pre><span style="color: rgb(0, 0, 0);">Preformatted<br></span></pre>
        <p><span style="color: rgb(0, 0, 0);"><strong>This is bold!<br></strong><em>This is italic!<br></em><span style="color: rgb(224, 62, 45);">This is red!</span></span></p>
        <p style="text-align: center;">This is aligned middle!<span style="color: rgb(0, 0, 0);"><span style="color: rgb(224, 62, 45);"><br></span></span></p>
        <p style="text-align: right;">This is aligned right!</p>
        <p style="text-align: justify;">This is aligned ... full width?</p>
        <ul>
        <li style="text-align: justify;">Bullet</li>
        <li style="text-align: justify;">Another</li>
        </ul>
        <ul style="list-style-type: circle;">
        <li>Circle</li>
        <li>Another</li>
        </ul>
        <ul style="list-style-type: square;">
        <li>Squares</li>
        <li>Another</li>
        </ul>
        <ol>
        <li>Number</li>
        <li>Another</li>
        </ol>
        <ol style="list-style-type: lower-alpha;">
        <li>Letters</li>
        <li>Another</li>
        </ol>
        <ol style="list-style-type: lower-greek;">
        <li>Greek Letters</li>
        <li>Another</li>
        </ol>
        <ol style="list-style-type: lower-roman;">
        <li>Index</li>
        <li>Another</li>
        </ol>
        <ol style="list-style-type: upper-alpha;">
        <li>Cap Letters</li>
        <li>Another</li>
        </ol>
        <ol style="list-style-type: upper-roman;">
        <li>Cap Index</li>
        <li>Another</li>
        </ol>
        <p>&nbsp;</p>
        <p>This is a normal block of text.</p>
        <p style="padding-left: 40px;">This bock is indented once</p>
        <p style="padding-left: 40px;">This bock is indented once</p>
        <p style="padding-left: 80px;">This bock is indented twice</p>
        <p style="padding-left: 80px;">This bock is indented twice</p>
      `,
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
      onInit={onInit} />
  )
}

export default TinyContainer