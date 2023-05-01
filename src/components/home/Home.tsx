import { FC } from "react";
import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { PostDataType } from "../../pages/post/[...post-id]";

const Home: FC<PostDataType> = ({
  username,
  created_at,
  profilePath,
  baseContent,
  descriptionContent
}) => {
  return (
    <HomeStyled>
      <PostDisplay
        username={username}
        profilePath={profilePath}
        created_at={created_at}
        baseContent={baseContent}
        descriptionContent={descriptionContent} />
    </HomeStyled>
  )
}

export default Home