const contentfulManagement = require("contentful-management");
require('dotenv').config()

// env.config({ path: '.env' })

const {
  GATSBY_MANAGEMENT_ACCESS_TOKEN,
  GATSBY_SPACE_ID,
  GATSBY_ENVIRONMENT
} = process.env;

module.exports = () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: GATSBY_MANAGEMENT_ACCESS_TOKEN,
  });

  return contentfulClient
    .getSpace(GATSBY_SPACE_ID)
    .then(space => space.getEnvironment(GATSBY_ENVIRONMENT));
};