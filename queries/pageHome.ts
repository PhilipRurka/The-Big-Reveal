import gql from 'graphql-tag';

export const GET_PAGE_HOME = gql`
  query PageHome {
    pageHome {
      recordTitle
      slug
    }
  }
`;