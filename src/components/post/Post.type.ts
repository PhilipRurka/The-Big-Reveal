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

export type PostContainerProps = PostPageData

export type PostProps = {
  isEditView: boolean
  isDeleteView: boolean
  handleTriggerEditView: () => void
  handleTriggerDeleteView: () => void
}