import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../../lib/authRequired";
import Post from "../../components/post/Post.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase) {
    return res
  }

  const { supabase } = res

  const id = ctx.query['post-id']

  const {
    data,
    error
  } = await supabase
    .from('post_base')
    .select(`
      post_content,
      created_at,
      post_description!post_base_id_fkey (
        post_content
      ),
      profiles!post_base_user_id_fkey (
        username,
        path,
        id
      )
    `)
    .eq('id', id)
    .single()

  if(error || !data) {
    console.error(error)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
  }

  const profile = data.profiles as profileType
  const description = data.post_description as PostDescriptionType

  return {props: {
    username: profile.username,
    profilePath: profile.path,
    baseContent: data.post_content,
    descriptionContent: description.post_content,
    created_at: data.created_at
  }}
}

type profileType = {
  username: string | null;
  path: string | null;
  id: string;
}

export type PostBaseType = {
  created_at: string | null;
  post_content: string;
}

type PostDescriptionType = {
  post_content: string
}

export type PostDataType = {
  username: string
  profilePath: string
  baseContent: string
  descriptionContent: string
  created_at: string
}

function PostPage(props: PostDataType) {
  
  return <Post {...props} />
}

export default PostPage