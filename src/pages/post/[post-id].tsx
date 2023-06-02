import type { GetServerSidePropsContext } from "next";
import type { PostPageData } from "../../components/post/Post.type";

import { authRequired } from "../../../lib/authRequired";
import PostContainer from "../../components/post/Post.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase) {
    return res
  }

  const {
    supabase,
    session
  } = res

  const id = ctx.query['post-id']

  const {
    data,
    error
  } = await supabase
    .from('post_base')
    .select(`
      post_title,
      base_content,
      created_at,
      post_description (
        description_content
      ),
      profiles (
        profile_id,
        username,
        path,
        profile_id
      )
    `)
    .eq('base_id', id)
    .single()

  if(error || !data) {
    return {
      notFound: true
    }
  }

  const profile = data.profiles[0]
  const description = data.post_description[0]

  return {props: {
    username: profile.username,
    collectionPath: profile.path,
    postTitle: data.post_title,
    post: {
      baseContent: data.base_content,
      descriptionContent: description.description_content,
    },
    createdAt: data.created_at,
    isAuthor: profile.profile_id === session.user.id,
    postId: id
  }}
}

function PostPage(props: PostPageData) {
  
  return <PostContainer {...props} />
}

export default PostPage