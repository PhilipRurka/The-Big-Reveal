import { FC } from "react";
import { HomeStyled } from "./Home.styled";
import PostDisplay from "../postDisplay";
import { StaticHookCopyType } from "./Home.container";

const Home: FC<StaticHookCopyType> = () => {
  return (
    <HomeStyled>
      <PostDisplay />
    </HomeStyled>
  )
}

export default Home