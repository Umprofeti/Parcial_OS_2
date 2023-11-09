import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categorias';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Compras from './collections/Compras';
import Users from './collections/Users';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import Media from './collections/Media';
import Contactos from './collections/Contactos';


export default buildConfig({
  serverURL: `http://localhost:3040`,
  admin: {
    user: Users.slug,
    bundler: webpackBundler()
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI
  }),
  editor: slateEditor({}),
  collections: [
    Categories,
    Posts,
    Tags,
    Users,
    Media,
    Contactos,
    Compras
  ],
  cors: '*',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
