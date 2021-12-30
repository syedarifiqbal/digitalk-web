import Index from '../../components/admin/users/Index';
import Create from '../../components/admin/users/Create';

export default [
    {
        path: 'users',
        name: 'admin.users.index',
        component: Index
    },
    {
        path: 'users/create',
        name: 'admin.users.create',
        component: Create
    },
    {
        path: 'users/:ID/edit',
        name: 'admin.users.edit',
        component: Create,
        props: route => ({ ID: route.params.ID })
    }
]