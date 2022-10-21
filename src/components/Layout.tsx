import { PageProps } from "gatsby";
import React, { FC } from "react";
import { Reset } from "../styled/base";
import FontStyles from "../styled/fonts";
import { LayoutStyled } from "../styled/layout";
import Head from "./Head";
import Header from "./header";

const Layout: FC<PageProps> = (props) => {
  const { children } = props;

  return (
    <LayoutStyled>
      <FontStyles />
      <Reset />
      <Head  />
      <Header />
      {children}
    </LayoutStyled>
  );
};

export default Layout;




// FRONTEND This needs to be adusted to pull in the correct data for the Head Component.