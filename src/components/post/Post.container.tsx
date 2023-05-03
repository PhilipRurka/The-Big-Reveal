import { FC, useCallback, useState } from "react";
import { PostDataType } from "../../pages/post/[post-id]";
import Post from "./Post";

const PostContainer: FC<PostDataType> = ({
    username,
    profilePath,
    baseContent,
    descriptionContent,
    created_at,
    isAuthor
}) => {
  const [isEditView, setIsEditView] = useState(false)

  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
  }, [isEditView])

  return (
    <Post
      username={username}
      profilePath={profilePath}
      baseContent={baseContent}
      descriptionContent={descriptionContent}
      created_at={created_at}
      isEditView={isEditView}
      isAuthor={isAuthor}
      handleTriggerEditView={handleTriggerEditView} />
  )
}

export default PostContainer