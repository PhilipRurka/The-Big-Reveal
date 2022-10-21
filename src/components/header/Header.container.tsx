import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import { HeaderQuery } from '../../@types/generated/graphql';
import Header from './Header';

const HeaderContainer: FC = () => {
  const data: HeaderQuery = useStaticQuery(graphql`
    query Header {
      site {
        siteMetadata {
          menuLinks {
            link
            name
          }
        }
      }
    }
  `);

  return <Header queryData={data} />;
};

export default HeaderContainer;