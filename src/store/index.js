import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks'
import locations from './locations'
import users from './users'
import auth from './auth'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        tasks,
        locations,
        auth,
        users,
    }
});


export default store;