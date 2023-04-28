import { FC } from "react";
import { HomeWrapper } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { PostType } from "../post/Post";

const Home: FC<PostType> = ({
  username,
  created_at,
  cleanBase,
  cleanDescription
}) => {
  return (
    <HomeWrapper>
      <PostDisplay
        username={username}
        created_at={created_at}
        cleanBase={cleanBase}
        cleanDescription={cleanDescription} />
    </HomeWrapper>
  )
}

export default Home