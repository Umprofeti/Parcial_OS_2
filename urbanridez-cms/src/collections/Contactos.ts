import { CollectionConfig } from 'payload/types';

const Contactos: CollectionConfig = {
    slug: 'contactos',
    admin: {
        defaultColumns: ['email', 'nombre', 'apellido'],
        useAsTitle: 'email',
    },
    access: {
        read: () => true,
        create: () =>  true
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true
        },
        {
            name:'nombre',
            type: 'text',
            required: true
        },
        {
            name: 'apellido',
            type: 'text',
            required: true
        },
        {
            name: 'asunto',
            type: 'textarea',
            required: true
        }
    ]
}

export default Contactos