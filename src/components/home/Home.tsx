import { FC } from "react";
import { HomeWrapper } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { PostType } from "../post/Post";

const Home: FC<PostType> = ({
  author_username,
  created_at,
  cleanBase
}) => {
  return (
    <HomeWrapper>
      <PostDisplay
        author_username={author_username}
        created_at={created_at}
        cleanBase={cleanBase} />
    </HomeWrapper>
  )
}

export default Home