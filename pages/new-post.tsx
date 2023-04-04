import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../lib/authRequired";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function NewPost() {
  
  return (
    <main>
      <h1>New Post</h1>
    </main>
  );
}

export default NewPost