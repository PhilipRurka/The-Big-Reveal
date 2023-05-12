import { GetServerSidePropsContext } from "next";
import Profile from "../components/profile/Profile.container";
import { authRequired } from "../../lib/authRequired";

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
    error
  } = await supabase
    .from('profiles')
    .select('username, full_name')
    .eq('profile_id', session.user.id)
    .single()

  if(error) {
    console.log(error)
    return {
      props: {}
    }
  }

  return { props: {
    profileData
  }}
}

export type ProfilePageData = {
  profileData: {
    username: string
    full_name: string
  }
}

function ProfilePage({ profileData }: ProfilePageData) {
  return <Profile profileData={profileData} />
}

export default ProfilePage