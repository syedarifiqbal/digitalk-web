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
                Vue.axios.get('/user')
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
        isAuthenticated: state => Vue.$auth.isAuthenticated(),
        authUser: state => state.user,
    }
}