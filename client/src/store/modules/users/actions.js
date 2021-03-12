import axios from "axios";
export default {
  async getUser(context) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("api/users/profile", authUser);

    try {
      context.commit("getUser", response.data);

      context.commit(
        "userLastToken",
        response.data.tokens[response.data.tokens.length - 1].token
      );

      context.commit("userImage", `api/users/${response.data._id}/avatar`);
    } catch (error) {
      context.commit("responseMessage", error.message);
    }
  },

  async addUserImage(context, payload) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post("api/users/me/avatar", payload, authUser);
    try {
      context.commit("userImage", `api/users/${response.data._id}/avatar`);
      context.commit("responseMessage", response.data.message);
      context.dispatch("getUser");
    } catch (error) {
      if (error)
        context.commit(
          "responseMessage",
          "Not the appropriate image format, you can use PNG JPG JPEG SVG. Or image is to big max 1mb. "
        );
    }
  },
  async deleteUserImage(context) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete("api/users/me/avatar", authUser);
    try {
      context.commit("userImage", `api/users/${response.data._id}/avatar`);
      context.commit("responseMessage", response.data.message);
    } catch (error) {
      context.commit("responseMessage", response.data.message);
    }
  },
  async updateUserData(context, payload) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const user = {
      name: payload.name,
      age: payload.age,
      email: payload.email,
      password: payload.password,
    };

    const response = await axios.patch("api/users/update/me", user, authUser);
    try {
      context.commit("updateUser", response.data);
      context.commit("responseMessage", response.data.message);
    } catch (error) {
      if (error) {
        context.commit(
          "responseMessage",
          "Bad request, you did something worng. Please try again."
        );
      }
    }
  },
  deleteProfile(context) {
    const token = context.rootGetters.token;
    const authUser = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.delete("api/users/me", authUser).then(() => {
      context.commit("setUser", {
        _id: null,
        token: null,
        isLoggedin: false,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("id");
    });
  },
};
