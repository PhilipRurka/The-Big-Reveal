# Lets get your project up and running!
## Steps to initialize projects
### Contentful
As for Contentful configurations, its simple. Just do the following
1. Your page's Content Type must have `page` as a prefix followed by any page name. For example, `pageHome`, `pageBlogs`, ...

2. Within their record types, you will need to have a slug field, which will have a `slug` id.
The homepage value should be a simple `/`, then every other slug beyond that is simple, let me list some examples, `/`, `blogs`, ...


### .env file configurations
Add these properties to your .env file and replace the PLACEHOLDER values
```
GATSBY_ACCESS_TOKEN = PLACEHOLDER
GATSBY_MANAGEMENT_ACCESS_TOKEN = PLACEHOLDER
GATSBY_SPACE_ID = PLACEHOLDER
GATSBY_ENVIRONMENT = PLACEHOLDER
```
---

## Patterns used
---
 
## Tips
To use the Contentful Rich Render, use this
```
import { renderRichText } from "gatsby-source-contentful/rich-text";

<>{renderRichText(content as any)}</>
```

## Dump
If you want to update every packages to its latest version, run
```
yarn upgrade-interactive --latest
```
If however, you want to update a single pakage, run
```
yarn upgrade <package-name> --latest
```
Note that you must first require a `yarn.lock`. That said, if you don't already have one, go ahead and run `yarn` and once complete you can run the command above.

You may have to update your node version to handle all of these cool new package updates. If you are cool like me and managing your node versions via, well, Node Version Manager (nvm) then just run `nvm install node`. That will install the latest version. You then want to take that node version and update your `.nvmrc` file that lives on your project.