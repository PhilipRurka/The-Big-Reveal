import type { GetServerSidePropsContext } from 'next';
import { authRequired } from '../lib/authRequired';
import YourSpace from '../src/components/yourSpace/YourSpace.container';

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
    data: yourSpaceData,
    error
  } = await supabase
    .from('profiles')
    .select('username, path')
    .eq('id', session.user.id)

  if(error) {
    console.log(error)
    return {
      props: {}
    }
  }

  return { props: {
    yourSpaceData: yourSpaceData[0]
  }}
}

export type YourSpaceType = {
  yourSpaceData: {
    username: string
    path: string
  }
}

function YourSpacePage({ yourSpaceData }: YourSpaceType) {
  return <YourSpace yourSpaceData={yourSpaceData} />
}

export default YourSpacePage