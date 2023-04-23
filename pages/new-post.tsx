import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";
import NewPost from "../src/components/newPost/NewPost.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  const {
    supabase,
    session
  } = res

  const {
    data,
    error
  } = await supabase
    .from('profiles')
    .select('username, path')
    .eq('id', session.user.id)

  if(error) {
    console.log(error)
    return {}
  }

  return { props: {
    username: data[0].username,
    profile_path: data[0].path
  }}

  return {props: {}}
}

export type NewPostPageType = {
  username: string
  profile_path: string
}

function NewPostPage(props: NewPostPageType) {
  
  return <NewPost {...props} />
}

export default NewPostPage