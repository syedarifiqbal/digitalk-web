import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout.vue';
import AdminLayout from '../components/admin/Layout.vue';
import tasks from '../routes/tasks';
import adminTasks from '../routes/admin/tasks';
import adminUsers from '../routes/admin/users';
import adminLocations from '../routes/admin/locations';
import locations from '../routes/locations';
import Login from '../components/auth/Login';
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'match-active',
    linkExactActiveClass: "active",
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                ...tasks,
                ...locations,
                { path: '', redirect: {name: 'tasks.index'}}
            ],
            meta: {
                auth: true,
                admin: false,
            }
        },
        {
            path: '/admin',
            component: AdminLayout,
            children: [
                ...adminTasks,
                ...adminUsers,
                ...adminLocations,
            ],
            meta: {
                auth: true,
                admin: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: route => ({isAdmin: false})
        },
        {
            path: '/admin/login',
            name: 'admin.login',
            component: Login,
            props: route => ({isAdmin: true})
        }
    ],
});

router.beforeEach(async (to, from, next) => {

    if(!store.getters.authUser){
        try {
            await store.dispatch('LOAD_USER');
        } catch (error) {
            console.log("Unauthenticated!");
        }
    }
    
    const isAuth = Vue.prototype.$auth.isAuthenticated();
    const isAdminRoute = (to.name || '').startsWith('admin.');
    
    if(to.matched.some(record => record.meta.auth)){
        if(isAuth) next();
        else next({ name: 'login' });
    }

    if(to.matched.some(record => record.meta.auth && record.meta.admin)){

        if(isAuth && store.getters.authUser && store.getters.authUser.is_admin) next()
        else next({name: 'admin.login'})

    }
    
    next();
});

export default router;