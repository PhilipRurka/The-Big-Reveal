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
    .from('post_base')
    .select(`
      profiles!post_base_user_id_fkey (
        username
      )
    `)
    .eq('profiles.path', ctx.query['profile-path'])
    .limit(1)
    .single()

  const profile = data?.profiles as ProfileType

  if(!profile) {
    return {
      notFound: true
    }
  }

  return { props: {
    username: profile.username,
    profile_path: ctx.query['profile-path'],
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