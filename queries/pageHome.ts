import gql from 'graphql-tag';

export const GET_PAGE_HOME = gql`
  query PageHome {
    pageHomeCollection {
      items {
        recordTitle
        slug
      }
    }
  }
`;