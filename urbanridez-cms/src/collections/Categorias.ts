import { CollectionConfig } from 'payload/types';

const Categorias: CollectionConfig = {
  slug: 'categorias',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: false,
}

export default Categorias;