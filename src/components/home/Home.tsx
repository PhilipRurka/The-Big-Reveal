import { FC } from "react";
import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { PostType } from "../post/Post";

const Home: FC<PostType> = ({
  username,
  created_at,
  cleanBase,
  cleanDescription
}) => {
  return (
    <HomeStyled>
      <PostDisplay
        username={username}
        created_at={created_at}
        cleanBase={cleanBase}
        cleanDescription={cleanDescription} />
    </HomeStyled>
  )
}

export default Home