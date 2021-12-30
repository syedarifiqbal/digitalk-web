import Vue from 'vue';

export default {
    state: () => ({
        tasks: [],
        adminTasks: undefined
    }),
    mutations: {
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        ADD_ADMIN_TASKS(state, task) {
            state.adminTasks = task;
        },
        ADD_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        TOGGLE_TASK_COMPLETION(state, id){
            const taskIndex = state.tasks.findIndex(e => e.id === id);
            const task = {...state.tasks[taskIndex]};
            task.completed = !task.completed;
            state.tasks.splice(taskIndex, 1, task);
            // // state.tasks[taskIndex] = !state.tasks[taskIndex].completed;
        },
        UPDATE_TASK(state, payload){
            const taskIndex = state.tasks.findIndex(e => e.id === payload.id);
            const task = {...payload};
            state.tasks[taskIndex] = task;
        },
        DELETE_TASK(state, id){
            state.tasks = state.tasks.filter(t => t.id !== id);
        }
    },
    actions: {
        CREATE_TASK({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Vue.axios.post('/tasks', payload)
                    .then(({ data }) => {
                        console.log(data)
                        commit('ADD_TASK', payload)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
        UPDATE_TASK({ commit }, payload) {
            return new Promise((resolve, reject) => {
                Vue.axios.post(`/tasks/${payload.id}`, {...payload, '_method': "PUT"})
                    .then(({ data }) => {
                        commit('UPDATE_TASK', payload)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
        LOAD_TASK({ commit }) {
            return new Promise((resolve, reject) => {
                Vue.axios.get('/tasks')
                    .then(({ data }) => {
                        commit('ADD_TASKS', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
        LOAD_ADMIN_TASK({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.get('/admin/tasks', { params })
                    .then(({ data }) => {
                        commit('ADD_ADMIN_TASKS', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
        DELETE_TASK({ commit }, params) {
            return new Promise((resolve, reject) => {
                Vue.axios.delete(`/tasks/${params.id}`)
                    .then(({ data }) => {
                        commit('DELETE_TASK', data)
                        resolve(data);
                    }).catch((e) => {
                        console.error(e);
                        reject(e);
                    })
            });
        },
    },
    getters: {
        tasks: state => state.tasks,
        adminTasks: state => state.adminTasks,
        incompleteTasks: state => state.tasks.filter(t => !t.completed),
        completedTasks: state => state.tasks.filter(t => t.completed),
    }
}