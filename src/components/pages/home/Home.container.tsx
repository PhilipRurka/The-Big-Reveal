import React, { FC } from 'react';
import { graphql, PageProps } from 'gatsby';
import Home from './Home';
import { IPageHomeFields } from '../../../../@types/generated/contentful';

interface HomePage_type {
  contentfulPageHome: IPageHomeFields
}

const HomeContainer: FC<PageProps<HomePage_type>> = (props) => {
  const {
    contentfulPageHome: data
  } = props.data;

  return <Home data={data} />;
};

export const query = graphql`
  query Homepage {
    contentfulPageHome {
      content {
        raw
      }
      tags
      title
    }
  }
`

export default HomeContainer;