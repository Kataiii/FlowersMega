import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './swagger.json',
  apiFile: './store/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFiles: {
    './store/city.ts': {
        filterEndpoints: [/cities/i],
      },
  },
  hooks: true,
}

export default config