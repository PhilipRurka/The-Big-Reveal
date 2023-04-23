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
    data: profileData,
    error: profileError
  } = await supabase
    .from('profiles')
    .select('username, path')
    .eq('id', session.user.id)

    if(profileError || !profileData) {
      console.error(profileError)
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }

  const {
    data: baseData,
    error: baseError
  } = await supabase
    .from("post_base")
    .select('id, created_at, post_title, author_username')
    .eq('profile_path', profileData[0].path)
    .order("created_at")

    if(baseError || !baseData) {
      console.error(baseError)
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }

  return { props: {
    profileData: profileData[0],
    baseData: baseData,
    host: ctx.req.headers.host
  }}
}

export type YourSpaceDataType = {
  profileData: {
    username: string
    path: string
  }
  baseData: Array<{
    id: string
    created_at: string
    post_title: string
    author_username: string
  }>
  host: string
}

function YourSpacePage({
  profileData,
  baseData,
  host
}: YourSpaceDataType) {
  return <YourSpace
    profileData={profileData}
    baseData={baseData}
    host={host} />
}

export default YourSpacePage