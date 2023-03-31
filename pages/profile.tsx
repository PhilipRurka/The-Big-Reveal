import Profile from "../src/components/profile/Profile.container";
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "../src/types/supabase-types";

export const getServerSideProps = async (ctx: any) => {

  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(!session?.user.id) return { props: {}}

  const {
    data: profileDataArray,
    error
  } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user.id)

  if(error) {
    console.log(error)
    return {}
  }

  return { props: {
    profileData: profileDataArray[0]
  }}
}

export type ProfilePageType = {
  profileData: Database['public']['Tables']['profiles']['Row']
}

function ProfilePage({ profileData }: ProfilePageType) {
  return <Profile profileData={profileData} />
}

export default ProfilePage