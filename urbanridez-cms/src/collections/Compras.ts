import { CollectionConfig } from 'payload/types';

const Compras :CollectionConfig = {
  slug: 'compras',
  admin: {
    defaultColumns: ['Name', 'Last Name', 'Email', 'Car', 'status'],
    useAsTitle: 'Email',
  },
  access: {
    read: () => true,
    create: () => true
  },
  fields: [
    {
      name: 'Name',
      type: 'text',
      required: true
    },
    {
      name: 'Email',
      type: 'email',
      required: true 
    },
    {
      name: 'Car',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'delivered',
          label: 'Delivered'
        },
        {
          value: 'in_process',
          label: 'In Process'
        }
      ],
      defaultValue: 'in_process',
      admin: {
        position: 'sidebar',
      }
    }
  ]
}
export default Compras;