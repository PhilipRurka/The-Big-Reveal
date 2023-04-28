import type { GetServerSidePropsContext } from 'next';
import { authRequired } from '../lib/authRequired';
import YourSpace from '../src/components/yourSpace/YourSpace.container';
import { PostCardListType } from '../src/components/postCardList/PostCardList.container';

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
    .single()

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
    .select('id, created_at, post_title')
    .eq('user_id', session.user.id)
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

  const list = []

  for (let i = 0; i < baseData.length; i++) {
    const item = baseData[i];
    list.push({
      ...item,
      profiles: {
        username: profileData.username
      }
    })
  }

  return { props: {
    list,
    username: profileData.username,
    path: profileData.path,
    host: ctx.req.headers.host
  }}
}

export type YourSpaceDataType = {
  list: PostCardListType
  host: string
  path: string
  username: string
}

function YourSpacePage(props: YourSpaceDataType) {
  return <YourSpace {...props}/>
}

export default YourSpacePage