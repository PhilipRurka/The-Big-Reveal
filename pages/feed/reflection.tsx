import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Reflection from "../../src/components/reflection/Reflection.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function ReflectionPage() {
  
  return <Reflection />
}

export default ReflectionPage