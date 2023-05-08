import { FC } from "react";
import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { StaticHookCopyType } from "./Home.container";

const Home: FC<StaticHookCopyType> = ({
  username,
  createdAt,
  profilePath,
  post
}) => {
  return (
    <HomeStyled>
      <PostDisplay
        username={username}
        profilePath={profilePath}
        createdAt={createdAt}
        post={post} />
    </HomeStyled>
  )
}

export default Home