import { QueryDataPages_type } from "../gatsby-node";
// import { ContentfulPageHomeSys, Query } from "./gatsby-graphql";

interface Result_type {
  data: {
    allContentfulPageHome: Nodes_type;
    allContentfulPageResume: Nodes_type;
  }
};

interface Nodes_type {
  nodes: Content_type[];
};

interface Content_type {
  slug: string;
  sys: {
    contentType: {
      sys: {
        id: string;
      }
    }
  }
};

const pageLists = [
  'Home',
  'Resume'
] as const;

export const getQueryData = async (graphql: any): Promise<QueryDataPages_type[]> => {
  let innerQuery: string = '';

  for (let i = 0; i < pageLists.length; i++) {
    const page = pageLists[i];
    innerQuery += `allContentfulPage${page} {
      nodes {
        slug
        sys {
          contentType {
            sys {
              id
            }
          }
        }
      }
    }`
  };

  const result: Result_type = await graphql(`query PagesTest { ${innerQuery} }`);

  let formattedData: QueryDataPages_type[] = [];
  let key: keyof typeof result.data;
  for (key in result.data) {
    const {
      nodes: [{
        slug,
        sys: { contentType: { sys: {
          id: contentType
        }}}
      }]
    } = result.data[key];

    formattedData.push({slug, contentType});
  };

  return formattedData;
};