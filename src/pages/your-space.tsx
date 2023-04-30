import type { GetServerSidePropsContext } from 'next';
import { authRequired } from '../../lib/authRequired';
import YourSpace from '../components/yourSpace/YourSpace.container';
import { PostCardListType } from '../components/postCardList/PostCardList.container';

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
    data,
    error
  } = await supabase
    .from("post_base")
    .select(`
      id,
      created_at,
      post_title,
      profiles!post_base_user_id_fkey (
        username,
        path
      )
    `)
    .order("created_at", { ascending: false })

  if(error) {
    console.error(error)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  console.log(data)

  const profile = data[0].profiles as ProfileType

  return { props: {
    list: data,
    username: profile?.username,
    path: profile?.path,
    host: ctx.req.headers.host
  }}
}

type ProfileType = {
  username: string
  path: string
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