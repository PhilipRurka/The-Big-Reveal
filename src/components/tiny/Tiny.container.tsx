import { FC, MutableRefObject, useCallback } from "react"
import Tiny from "./Tiny"
import { Editor } from "tinymce"

type TinyType = {
  tinyRef: MutableRefObject<Editor>
  tinyId: string
}

const TinyContainer: FC<TinyType> = ({
  tinyRef,
  tinyId
}) => {
  const onInit = (_: unknown, editor: Editor) => { tinyRef.current = editor }

  const handleChange = useCallback((value: string) => {
    console.log(value.length)
  }, [])

  return (
    <Tiny
      onInit={onInit}
      tinyId={tinyId}
      handleChange={handleChange} />
  )
}

export default TinyContainer