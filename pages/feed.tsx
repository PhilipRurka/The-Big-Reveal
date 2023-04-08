import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";
import Feed from "../src/components/feed/Feed.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function FeedPage() {
  
  return <Feed />
}

export default FeedPage