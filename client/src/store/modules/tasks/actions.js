import axios from "axios";
export default {
  async allTasks(context) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("api/tasks", authUser);

    if (response.status === 404) {
      context.commit("setMessage", "Some thing went wrong");
      return;
    }
    try {
      context.commit("setCompletedTasks", response.data);
      context.commit("getAllTasks", response.data.reverse());
    } catch (error) {
      context.commit("setMessage", error.response.data.error);
    }
  },
  async addTask(context, payload) {
    const task = {
      description: payload.description,
    };
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post("api/tasks", task, authUser);
    if (response.status === 404) {
      context.commit("setMessage", "Something went wrong.");
    }
    try {
      context.commit("setMessage", response.data.message);
      context.commit("addTask", payload);
      context.dispatch("allTasks");
    } catch (error) {
      if (error) {
        context.commit("setMessage", error.response.data.error);
      }
    }
  },
  async delete(context, id) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`api/tasks/delete/${id}`, authUser);

    try {
      context.commit("deleteTask", id);
      context.commit("setMessage", response.data.message);
      context.dispatch("allTasks");
    } catch (error) {
      context.commit("setMessage", error.response.data.error);
    }
  },
  async update(context, payload) {
    const obj = {
      id: payload.id,
      description: payload.description,
    };

    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(
      `api/tasks/update/${obj.id}`,
      { description: obj.description },
      authUser
    );
    try {
      context.commit("updateTask", payload);
      context.commit("setMessage", response.data.message);
    } catch (error) {
      if (error) {
        context.commit("setMessage", error.response.data.error);
      }
    }
  },
  async completed(context, payload) {
    const obj = {
      _id: payload.id,
      completed: payload.completed,
    };

    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(`api/tasks/update/${obj._id}`, { completed: obj.completed }, authUser );
    if (response.status === 404) {
      context.commit("setMessage", response.data.message);
    }
    try {
      context.commit("completedTask", payload);
    } catch (error) {
      context.commit("setMessage", error.response.data.message);
    }
  },
};
