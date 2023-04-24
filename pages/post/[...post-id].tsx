import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Post from "../../src/components/post/Post.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase) {
    return res
  }

  const { supabase } = res

  const id = ctx.query['post-id']

  const {
    data: postBaseData,
    error: postBaseError
  } = await supabase
    .from("post_base")
    .select('is_published, post_content, created_at, author_username, profile_path')
    .eq('id', id)
    .order("created_at")

  const {
    data: postDescriptionData,
    error: postDescriptionError
  } = await supabase
    .from("post_description")
    .select('post_content')
    .eq('post_id', id)

  if(postBaseError || postDescriptionError || !postBaseData || !postDescriptionData) {
    console.log({
      postBaseError,
      postDescriptionError
    })

    return { props: {} }
  }

  return {props: {
    postBase: postBaseData[0],
    postDescription: postDescriptionData[0] || null
  }}
}

export type PostBaseType = {
  profile_path: string
  author_username: string | null
  created_at: string | null;
  post_content: string;
}

export type PostDescriptionType = {
  post_content: string
}

export type PostDataType = {
  postBase: PostBaseType
  postDescription: PostDescriptionType
}

function PostPage(props: PostDataType) {
  
  return <Post {...props} />
}

export default PostPage