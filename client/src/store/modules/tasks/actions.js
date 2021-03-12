import axios from 'axios';
export default {

    allTasks(context) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.get("api/tasks", authUser)
            .then((response) => {


                context.commit('setCompletedTasks', response.data)
                context.commit('getAllTasks', response.data.reverse())
            }).catch((error) => {
                context.commit('setMessage', error.response.data.error)
            })

    },
    addTask(context, payload) {
        const task = {
            description: payload.description
        }
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        axios.post('api/tasks', task, authUser)
            .then((response) => {

                context.commit('addTask', payload)
                context.commit('setMessage', response.data.message)

            }).catch((error) => {
                if (error) {
                    context.commit('setMessage', error.response.data.error)
                }
            })



    },
    delete(context, id) {
     
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.delete(`api/tasks/delete/${id}`, authUser).then((response) => {
            context.commit('deleteTask', id)
            context.commit('setMessage', response.data.message)
        })
    },
    update(context, payload) {
        const obj = {
            id: payload.id,
            description: payload.description
        }

        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }

        axios
            .patch(`api/tasks/update/${obj.id}`, { description: obj.description }, authUser)
            .then((response) => {
                context.commit("updateTask", payload)
                context.commit('setMessage', response.data.message)
            }).catch((error) => {
                if (error) {
                    context.commit('setMessage', error.response.data.error)
                }
            })


    },
    completed(context, payload) {
        const obj = {
            _id: payload.id,
            completed: payload.completed
        }
       
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.patch(`api/tasks/update/${obj._id}`, { completed: obj.completed }, authUser)
        context.commit('completedTask', payload)
    }

}

