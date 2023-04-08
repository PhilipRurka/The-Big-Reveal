import type { GetServerSidePropsContext } from "next";
import { authRequired } from "../../lib/authRequired";
import Exploration from "../../src/components/exploration/Exploration.container";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await authRequired(ctx)
  
  if(!res?.supabase || !res?.session) {
    return res
  }

  return {props: {}}
}

function ExplorationPage() {
  
  return <Exploration />
}

export default ExplorationPage