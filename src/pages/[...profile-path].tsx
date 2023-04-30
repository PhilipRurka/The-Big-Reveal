import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import AuthorPosts from "../components/authorPosts/AuthorPosts.container";
import { PostCardListType } from "../components/postCardList/PostCardList.container";

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
    data: profileData,
    error: profileError
  } = await supabase
    .from('profiles')
    .select('username, id')
    .eq('path', ctx.query['profile-path'])
    .single()

    if(profileError || !profileData) {
      console.error(profileError)
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }

  const {
    data: baseData,
    error: baseError
  } = await supabase
    .from("post_base")
    .select('id, created_at, post_title')
    .eq('user_id', profileData.id)
    .order("created_at")

  if(baseError || !baseData) {
    console.error(baseError)
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  const list = []

  for (let i = 0; i < baseData.length; i++) {
    const item = baseData[i];
    list.push({
      ...item,
      profiles: {
        username: profileData.username
      }
    })
  }

  return { props: {
    list,
    username: profileData.username,
    host: ctx.req.headers.host
  }}
}

export type UserSpaceDataType = {
  list: PostCardListType
  host: string
  username: string
}

function AuthorPostsPage(props: UserSpaceDataType) {
  
  return <AuthorPosts {...props} />
}

export default AuthorPostsPage