import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import NewPost from "../components/newPost/NewPost.container";

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
    .single()

  if(error) {
    console.log(error)
    return {}
  }

  return { props: {
    username: data.username,
    profile_path: data.path
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