import client from "./client";

const registerUser = (data) => client.post(`register`, data);
// const login = (data) => client.post(`login`, data);
const login = (data) => client.post(`/auth/login`, data);
const verifyUser = (data) => client.post(`email/verify`, data);

export default {
  registerUser,
  login,
  verifyUser,
};
