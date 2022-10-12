import authHeader from "./auth-header";
import baseUrl from "../../shared/base-url";

const getPublicContent = () => {
  return fetch(baseUrl + "all")
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      return data;
    });
};

const getUserBoard = () => {
  return fetch(baseUrl + "user", { headers: authHeader() })
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      return data;
    });
};
const getModeratorBoard = () => {
  return fetch(baseUrl + "mod", { headers: authHeader() })
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      return data;
    });
};
const getAdminBoard = () => {
  return fetch(baseUrl + "admin", { headers: authHeader() })
    .then((Response) => {
      return Response.json();
    })
    .then((data) => {
      return data;
    });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService;
