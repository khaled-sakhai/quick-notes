import { baseUrl } from "../../shared/base-url";
import axios from "axios";
const register = (username, password, confirmPassword, role) => {
  return axios.post(baseUrl + "register", {
    username,
    password,
    confirmPassword,
    role,
  });
};

const login = (username, password) => {
  return axios
    .post(baseUrl + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
