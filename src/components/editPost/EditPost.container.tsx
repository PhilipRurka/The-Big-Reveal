import { FC, useEffect } from "react"
import EditPost from "./EditPost"

type EditPostType = {
  baseContent: string
  descriptionContent: string
  handleTriggerEditView: () => void
}

const EditPostContainer: FC<EditPostType> = ({
  baseContent,
  descriptionContent,
  handleTriggerEditView
}) => {

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'unset'
    }
  }, [])

  return (
    <EditPost
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      handleTriggerEditView={handleTriggerEditView} />
  )
}

export default EditPostContainer