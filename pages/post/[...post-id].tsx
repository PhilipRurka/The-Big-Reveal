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
    .select('post_content, created_at, user_id')
    .eq('id', id)
    .order("created_at")
    .single()

  const {
    data: postDescriptionData,
    error: postDescriptionError
  } = await supabase
    .from("post_description")
    .select('post_content')
    .eq('post_id', id)
    .single()
  
  const {
    data: profileData,
    error: profileError
  } = await supabase
    .from("profiles")
    .select('username, path')
    .eq('id', postBaseData?.user_id)
    .single()

  if(postBaseError || postDescriptionError || !postBaseData || !postDescriptionData || !profileData || profileError) {
    console.log({
      postBaseError,
      postDescriptionError,
      profileError
    })

    return { props: {} }
  }

  return {props: {
    username: profileData.username,
    profilePath: profileData.path,
    postBase: postBaseData,
    postDescription: postDescriptionData || null
  }}
}

export type PostBaseType = {
  created_at: string | null;
  post_content: string;
}

export type PostDescriptionType = {
  post_content: string
}

export type PostDataType = {
  username: string
  profilePath: string
  postBase: PostBaseType
  postDescription: PostDescriptionType
}

function PostPage(props: PostDataType) {
  
  return <Post {...props} />
}

export default PostPage