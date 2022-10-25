import { createClient } from 'contentful'

type Options_type = {
  getType: 'content_type'
  getValue: string
  additionalOptions?: unknown
}

const defaultOptions = {
  include: 3
} as const

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || ''
})


export const getEntries = async (options: Options_type): Promise<any> => {
  const {
    getType,
    getValue,
    additionalOptions
  } = options

  let entries

  if(getType === 'content_type') {
    entries = await client.getEntries<any>({
      ...defaultOptions,
      [getType]: getValue,
      ...additionalOptions as object
    })
  }

  return entries;
}

