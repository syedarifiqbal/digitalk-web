import Vue from 'vue';

export default {
    state: () => ({
        locations: undefined,
    }),
    mutations: {
        ADD_LOCATIONS(state, location) {
            state.locations = (location);
        },
        ADD_LOCATION(state, location) {
            state.locations.push(location);
        },
    },
    actions: {
        LOAD_LOCATIONS({ commit }, page=1) {
            return new Promise((resolve, reject) => {
                Vue.axios.get(`/locations?page=${page}`)
                    .then(({ data }) => {
                        commit('ADD_LOCATIONS', data)
                        resolve(data);
                    }).catch((e) => {
                        reject(e);
                    })
            });
        },
        CREATE_LOCATION({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Vue.axios.post('/locations', payload)
                    .then(({ data }) => {
                        commit('ADD_LOCATION', payload)
                        resolve(data);
                    }).catch((e) => {
                        reject(e);
                    })
            });
        },
        LOAD_ADMIN_LOCATION({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.get(`/admin/locations`, { params })
                    .then(({ data }) => {
                        commit('ADD_LOCATIONS', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
    },
    getters: {
        locations: state => state.locations,
    }
}