import type { FC } from "react";

import { HomeStyled } from "./Home.styled";
import PageSection from "../pageSection";
import CtaHeroContainer from "../ctaHero";
import OurValuesContainer from "../ourValues";
import OurGoalsContainer from "../ourGoals";

const Home: FC = () => {
  return (
    <HomeStyled>
      <PageSection
        bgColor='parchment'
        size='xs' >
        <CtaHeroContainer />
      </PageSection>
      <PageSection
        bgColor='white'
        size='xs' >
        <OurValuesContainer />
      </PageSection>
      <PageSection
        bgColor='parchment'
        size='xs' >
        <OurGoalsContainer />
      </PageSection>
    </HomeStyled>
  )
}

export default Home