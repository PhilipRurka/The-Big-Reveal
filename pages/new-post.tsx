import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";
import NewPost from "../src/components/newPost/NewPost.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function NewPostPage() {
  
  return <NewPost />
}

export default NewPostPage