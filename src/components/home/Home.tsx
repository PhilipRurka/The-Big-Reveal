import { FC } from "react";
import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { StaticHookCopyType } from "./Home.container";

const Home: FC<StaticHookCopyType> = ({
  username,
  created_at,
  profilePath,
  post
}) => {
  return (
    <HomeStyled>
      <PostDisplay
        username={username}
        profilePath={profilePath}
        created_at={created_at}
        post={post} />
    </HomeStyled>
  )
}

export default Home