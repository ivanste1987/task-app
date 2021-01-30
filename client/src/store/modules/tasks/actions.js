import axios from 'axios';
export default {
  getAllTasks(context) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    axios.get("http://localhost:3000/tasks", authUser)
    .then((response) => {
      console.log(response.data)
      context.commit('getAllTasks', response.data)
    }).catch((error) => {
      console.log(error)
    })

  },

}

