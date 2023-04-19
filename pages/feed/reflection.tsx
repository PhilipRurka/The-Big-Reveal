import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Reflection from "../../src/components/reflection/Reflection.container";

export type PostBaseType = {
  id: string;
  created_at: string | null;
  post_content: string;
}

export type ReflectionDataType = {
  postBase: PostBaseType[]
}

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
    data: postBaseData,
    error
  } = await supabase
    .from("post_base")
    .select('id, is_published, post_content, created_at')
    .eq('user_id', session.user.id)
    .order("created_at")

  if(error || !postBaseData) {
    console.log(error)
    return {}
  }

  return {props: {
    postBase: postBaseData
  }}
}

function ReflectionPage({ postBase }: ReflectionDataType) {
  
  return <Reflection postBase={postBase} />
}

export default ReflectionPage