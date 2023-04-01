import { GetServerSidePropsContext } from "next";
import Profile from "../src/components/profile/Profile.container";
import { Database } from "../src/types/supabase-types";
import { authRequired } from "./api/authRequired";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  console.log({ ctx })

  return authRequired(ctx)
    .then(async res => {
      if(!res?.supabase || !res?.id) {
        return res
      }

      const {
        supabase,
        id
      } = res

      const {
        data: profileDataArray,
        error
      } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
    
      if(error) {
        console.log(error)
        return {}
      }
    
      return { props: {
        profileData: profileDataArray[0]
      }}
    })
}

export type ProfilePageType = {
  profileData: Database['public']['Tables']['profiles']['Row']
}

function ProfilePage({ profileData }: ProfilePageType) {
  return <Profile profileData={profileData} />
}

export default ProfilePage