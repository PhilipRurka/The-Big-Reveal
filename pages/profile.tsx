import { GetServerSidePropsContext } from "next";
import Profile from "../src/components/profile/Profile.container";
import { Database } from "../src/types/supabase-types";
import { authRequired } from "../lib/authRequired";

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
    data: profileDataArray,
    error
  } = await supabase
    .from('profiles')
    .select('username, fullName')
    .eq('id', session.user.id)

  if(error) {
    console.log(error)
    return {
      props: {}
    }
  }

  return { props: {
    profileData: profileDataArray[0]
  }}
}

export type ProfilePageType = {
  profileData: {
    username: string
    full_name: string
  }
}

function ProfilePage({ profileData }: ProfilePageType) {
  return <Profile profileData={profileData} />
}

export default ProfilePage