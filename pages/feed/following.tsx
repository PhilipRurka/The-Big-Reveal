import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Following from "../../src/components/following/Following.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function FollowingPage() {
  
  return <Following />
}

export default FollowingPage