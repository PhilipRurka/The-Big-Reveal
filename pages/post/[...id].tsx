import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase) {
    return res
  }

  const { supabase } = res

  const {
    data: publicData,
    error: publicError
  } = await supabase
    .from("public posts")
    .select('created_at, post_title, post_subtitle, post_content')
    .eq('id', ctx.query.id)
    .order("created_at")

    const {
      data: privateData,
      error: privateError
    } = await supabase
      .from("private posts")
      .select('post_content')
      .eq('post_id', ctx.query.id)

  if(publicError || privateError || !publicData || !privateData) {
    console.log({
      publicError,
      privateError
    })

    return { props: {}}
  }
  
  console.log({
    publicData,
    privateData
  })

  return {props: {
    publicData: publicData[0],
    // privateData: privateData[0]
  }}
}

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

function ReflectionPage({ publicData }: ReflectionDataType) {
  
  // return <Reflection publicData={publicData} />
  return <></>
}

export default ReflectionPage