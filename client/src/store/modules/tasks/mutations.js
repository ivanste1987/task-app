export default {
    getAllTasks(state, payload) {
        state.allTasks = payload
    },
    addTask(state, payload) {
        state.task = payload
    },
    deleteTask(state, id) {
        const index = state.allTasks.findIndex(t => t._id === id)
        state.allTasks.splice(index, 1)
    },
    updateTask(state, { id, description }) {
        const index = state.allTasks.findIndex(t => t._id === id)
        state.allTasks[index].description = description;
    },
    completedTask(state, { id, completed }) {
        const index = state.allTasks.findIndex(t => t._id === id)
        state.allTasks[index].completed = completed;
    },
}
