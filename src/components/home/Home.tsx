import type { FC } from "react";
import type { StaticHookCopyType } from "./Home.container";

import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";

const Home: FC<StaticHookCopyType> = () => {
  return (
    <HomeStyled>
      <PostDisplay />
    </HomeStyled>
  )
}

export default Home