import Vue from 'vue';

export default {
    state: () => ({
        user: undefined,
    }),
    mutations: {
        SET_AUTH(state, user) {
            state.user = user;
        },
    },
    actions: {
        LOAD_USER({ commit }) {
            return new Promise((resolve, reject) => {
                // console.log()
                const token = Vue.prototype.$auth.getToken();
                Vue.prototype.axios.get('/user', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(({ data }) => {
                        commit('SET_AUTH', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    });
            });
        }
    },
    getters: {
        isAuthenticated: state => Vue.prototype.$auth.isAuthenticated(),
        authUser: state => state.user,
    }
}