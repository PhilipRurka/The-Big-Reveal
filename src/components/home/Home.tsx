import { FC } from "react";
import { HomeWrapper } from "./Home.styled";
import PostDisplay from "../postDisplay";
import type { PostDisplayType } from "../postDisplay/PostDisplay.container";

type HomeType = {
  staticHookCopy: PostDisplayType
}

const Home: FC<HomeType> = ({
  staticHookCopy
}) => {
  return (
    <HomeWrapper>
      <PostDisplay post={staticHookCopy} />
    </HomeWrapper>
  )
}

export default Home