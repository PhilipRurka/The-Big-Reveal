import { FC, useCallback, useState } from "react";
import { PostPageType } from "../../pages/post/[post-id]";
import Post from "./Post";

const PostContainer: FC<PostPageType> = ({
    username,
    profilePath,
    baseContent,
    descriptionContent,
    created_at,
    isAuthor,
    postId
}) => {
  const [isEditView, setIsEditView] = useState(false)

  const handleTriggerEditView = useCallback(() => {
    setIsEditView(!isEditView)
    // Get version of edited post
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
      handleTriggerEditView={handleTriggerEditView}
      postId={postId} />
  )
}

export default PostContainer