export default {
    tasks(state) {
        return state.allTasks
    },
    tasksCompleted(state){
        return state.completedTasks
    },
    taskModalMessage(state) {
        return state.taskMessage
    },
};