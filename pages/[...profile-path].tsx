import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";
import YourPosts from "../src/components/yourPosts/YourPosts.container";

export type CardsType = {
  id: string;
  created_at: string | null;
  author_username: string;
  post_title: string;
}

export type YourPostsDataType = {
  cards: CardsType[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  const { supabase } = res

  const {
    data: cardsData,
    error
  } = await supabase
    .from("post_base")
    .select('id, created_at, post_title, author_username')
    .eq('profile_path', ctx.query['profile-path'])
    .order("created_at")

  if(error || !cardsData) {
    console.log(error)
    return {}
  }

  return { props: {
    cards: cardsData
  }}
}

function YourPostsPage({ cards }: YourPostsDataType) {
  
  return <YourPosts cards={cards} />
}

export default YourPostsPage