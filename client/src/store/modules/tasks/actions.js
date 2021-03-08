import axios from 'axios';
export default {

    allTasks(context) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.get("http://localhost:3000/tasks", authUser)
            .then((response) => {


                context.commit('setCompletedTasks', response.data)
                context.commit('getAllTasks', response.data.reverse())
            }).catch((error) => {
                console.log(error)
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

        axios.post('http://localhost:3000/tasks', task, authUser)
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
        console.log(id)
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.delete(`http://localhost:3000/tasks/delete/${id}`, authUser).then((response) => {
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
            .patch(`http://localhost:3000/tasks/update/${obj.id}`, { description: obj.description }, authUser)
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
        console.log(obj)
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios.patch(`http://localhost:3000/tasks/update/${obj._id}`, { completed: obj.completed }, authUser)
        context.commit('completedTask', payload)
    }

}

