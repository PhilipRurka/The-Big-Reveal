import React, { FC } from 'react';
import { HeaderQuery } from '../../../@types/generated/graphql';
import { HeaderStyled } from './Header.styled';

type Header_type = { queryData: HeaderQuery }

const Header: FC<Header_type> = (props) => {

  return (
    <HeaderStyled></HeaderStyled>
  );
};

export default Header;