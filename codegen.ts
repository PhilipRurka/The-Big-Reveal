import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://uiukaitaiuqxyrnhsvtb.supabase.co',
  generates: {
    './src/types/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}

export default config
