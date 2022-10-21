import React, { FC } from 'react';
import { HomeStyled } from './Home.styled';

interface Home_type {
  data: IPageHomeFields;
};

const Home: FC<Home_type> = (props) => {

  return (
    <HomeStyled>This is the Homepage</HomeStyled>
  );
};

export default Home;