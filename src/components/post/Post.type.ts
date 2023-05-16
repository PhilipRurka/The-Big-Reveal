import type { UpdateOriginalPostType } from "../editPost/EditPost.container";
import type { FormMessageContainerType } from "../formMessage/FormMessage.container";

export type ProfileData = {
  username: string | null
  path: string | null
  profile_id: string
}

export type DescriptionData = {
  description_content: string
}

export type Contents = {
  baseContent: string
  descriptionContent: string
}

export type PostPageData = {
  username: string
  collectionPath: string
  postTitle: string
  createdAt: string
  isAuthor: boolean
  postId: string
  post: Contents
}

export type UpdateOriginalPostFunction = (updatedData: UpdateOriginalPostType) => void

export type PostContainerProps = PostPageData

export type PostProps = {
  isEditView: boolean
  isDeleteView: boolean
  updateOriginalPost: UpdateOriginalPostFunction
  handleTriggerEditView: () => void
  formMessage?: FormMessageContainerType
  handleTriggerDeleteView: () => void
}