import axios from "axios";
import router from "@/router";
export default {
  checkToken(payload) {
    payload = localStorage.getItem("user");
    return payload;
  },

  async login(context, payload) {
    const user = {
      email: payload.email,
      password: payload.password,
    };
    const response = await axios.post("api/users/login", { ...user });
    try {
      if (response.status !== 200) {
        const error = new Error(
          response.message || "Failed to authenticate. Check your login data."
        );
        throw error;
      } else {
        context.commit("setUser", {
          _id: response.data.user._id,
          token: response.data.token,
          isLoggedin: true,
        });
        localStorage.setItem("user", response.data.token);
        localStorage.setItem("id", response.data.user._id);
      }
    } catch (error) {
      if (error) throw error;
    }
  },

  async logout(context) {
    console.log(context.state.token);
    const reqAuth = {
      headers: {
        Authorization: `Bearer ${context.state.token}`,
      },
    };

    const response = await axios.post("api/users/logout", {}, reqAuth);

    if (response.status === 200) {
      context.commit("setUser", {
        _id: null,
        token: null,
        isLoggedin: false,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      router.push("/");
    }
  },
  async logoutAll(context) {
    const reqAuth = {
      headers: {
        Authorization: `Bearer ${context.state.token}`,
      },
    };
    const response = await axios.post("api/users/logoutAll", {}, reqAuth);
    if (response.status === 200) {
      context.commit("setUser", {
        _id: null,
        token: null,
        isLoggedin: false,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("id");
      router.push("/");
    }
  },
  stayLoggedin(context) {
    const token = localStorage.getItem("user");
    const userID = localStorage.getItem("id");

    if (token && userID) {
      context.commit("setUser", {
        token: token,
        userID: userID,
      });
    }
  },
};
