import type { FC } from "react";

import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";

const Home: FC = () => {
  return (
    <HomeStyled>
      <PostDisplay />
    </HomeStyled>
  )
}

export default Home