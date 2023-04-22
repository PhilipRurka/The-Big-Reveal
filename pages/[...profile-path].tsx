import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";
import AuthorPosts from "../src/components/authorPosts/AuthorPosts.container";

export type ListType = {
  id: string;
  created_at: string | null;
  author_username: string;
  post_title: string;
}

export type AuthorPostsDataType = {
  list: ListType[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  const { supabase } = res

  const {
    data: listData,
    error
  } = await supabase
    .from("post_base")
    .select('id, created_at, post_title, author_username')
    .eq('profile_path', ctx.query['profile-path'])
    .order("created_at")

  if(error || !listData) {
    console.log(error)
    return {}
  }

  if(!listData.length) {
    return {
      redirect: {
        destination: '/your-space',
        permanent: false,
      },
    }
  }

  return { props: {
    list: listData
  }}
}

function AuthorPostsPage({ list }: AuthorPostsDataType) {
  
  return <AuthorPosts list={list} />
}

export default AuthorPostsPage