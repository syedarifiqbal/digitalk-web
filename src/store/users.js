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
        GET_USER({ commit }, params) {
            if (!params.id) {

                console.error("ID is required in order to get the user.");
                throw ("ID is required in order to get the user.");

            }
            return new Promise((resolve, reject) => {
                Vue.axios.get(`/admin/users/${params.id}`)
                    .then(({ data }) => {
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },

        CREATE_USER({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.post(`/admin/users`, params)
                    .then(({ data }) => {
                        resolve(data);
                    }).catch((e) => {
                        reject(e);
                    })
            });
        },

        UPDATE_USER({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.post(`/admin/users/${params.id}`, { ...params, '_method': 'PUT'})
                    .then(({ data }) => {
                        resolve(data);
                    }).catch((e) => {
                        reject(e);
                    })
            });
        },

        DELETE_USER({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.delete(`/admin/users/${params.id}`)
                    .then(({ data }) => {
                        resolve(data);
                    }).catch((e) => {
                        reject(e);
                    })
            });
        },


    },
    getters: {
        users: state => state.users,
    }
}