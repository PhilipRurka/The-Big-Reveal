import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import AuthorPosts from "../components/authorPosts/AuthorPosts.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  const { supabase } = res

  const {
    data,
    error
  } = await supabase
    .from('profiles')
    .select('username')
    .eq('path', ctx.query['collection'])
    .single()

  const username = data?.username

  if(!username) {
    return {
      notFound: true
    }
  }

  return { props: {
    username,
    profile_path: ctx.query['collection'],
    host: ctx.req.headers.host
  }}
}

type ProfileType = {
  username: string
}

export type UserSpaceDataType = {
  host: string
  username: string
  profile_path: string
}

function AuthorPostsPage(props: UserSpaceDataType) {
  
  return <AuthorPosts {...props} />
}

export default AuthorPostsPage