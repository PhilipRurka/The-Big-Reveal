import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Reflection from "../../src/components/reflection/Reflection.container";

export type PublicType = {
  id: string;
  created_at: string | null;
  post_title: string;
  post_subtitle: string;
  post_content: string;
}

export type ReflectionDataType = {
  publicData: PublicType[]
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
    data: publicData,
    error
  } = await supabase
    .from("public posts")
    .select('id, created_at, post_title, post_subtitle')
    .eq('user_id', session.user.id)
    .order("created_at")

  if(error || !publicData) {
    console.log(error)
    return {}
  }

  return {props: {
    publicData
  }}
}

function ReflectionPage({ publicData }: ReflectionDataType) {
  
  return <Reflection publicData={publicData} />
}

export default ReflectionPage