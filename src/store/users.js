import Vue from 'vue';

export default {
    state: () => ({
        users: undefined,
    }),
    mutations: {
        ADD_USERS(state, users) {
            state.users = users;
        },
    },
    actions: {
        LOAD_USERS({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.get('/admin/users', { params })
                    .then(({ data }) => {
                        commit('ADD_USERS', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
    },
    getters: {
        users: state => state.users,
    }
}