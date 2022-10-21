import dotenv from 'dotenv';
dotenv.config({
  path: '.env'
})

const {
  GATSBY_ACCESS_TOKEN,
  GATSBY_SPACE_ID
} = process.env

export default {
  siteMetadata: {
    siteUrl: "https://www.goalden.com",
    title: "Goalden",
    description: `Everyting goals related`,
    author: "Philip Rurka",
    menuLinks:[
      {
        name:'home',
        link:'/'
      }
    ]
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          backgroundColor: `transparent`
        }
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: GATSBY_ACCESS_TOKEN,
        spaceId: GATSBY_SPACE_ID,
      },
    },
  ]
};