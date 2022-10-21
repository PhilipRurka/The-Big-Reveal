import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import { getQueryData } from './gatsby/gatsby-helper';

export interface QueryDataPages_type {
  slug: string;
  contentType: string;
};

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  debugger

  const queryDataPages: QueryDataPages_type[] = await getQueryData(graphql);

  debugger

  console.log(' --- --- ---');
  console.log(`  Pages Ceated`);

  for (let i = 0; i < queryDataPages.length; i++) {
    const {
      slug,
      contentType
    } = queryDataPages[i];

    const componentCap = contentType.replace('page', '');
    const componentLow = componentCap.toLowerCase();

    console.log(`    - ${slug}`);

    createPage({
      path: slug,
      component: path.resolve(`src/components/pages/${componentLow}/${componentCap}.container.tsx`),
      context: {}
    });
  };

  console.log(' --- --- ---');
  console.log(`  ${queryDataPages.length} Pages Created`);
  console.log(' --- --- ---');
};