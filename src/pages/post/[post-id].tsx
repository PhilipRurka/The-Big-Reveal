import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../../lib/authRequired";
import Post from "../../components/post/Post.container";

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

  const profile = data.profiles as profileType
  const description = data.post_description as PostDescriptionType

  return {props: {
    username: profile.username,
    profilePath: profile.path,
    baseContent: data.base_content,
    descriptionContent: description.description_content,
    created_at: data.created_at,
    isAuthor: profile.profile_id === session.user.id,
    postId: id
  }}
}

type profileType = {
  username: string | null;
  path: string | null;
  profile_id: string;
}

type PostDescriptionType = {
  description_content: string
}

export type PostPageType = {
  username: string
  profilePath: string
  baseContent: string
  descriptionContent: string
  created_at: string
  isAuthor: boolean
  postId: string
}

function PostPage(props: PostPageType) {
  
  return <Post {...props} />
}

export default PostPage