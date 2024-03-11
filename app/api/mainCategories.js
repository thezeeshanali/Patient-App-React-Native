import client from "./client";

const getMainCategories = () => client.get(`mainCategories?relations=services`);
// const login = (data) => client.post(`login`, data);
const login = (data) => client.post(`/auth/login`, data);
const verifyUser = (data) => client.post(`email/verify`, data);

export default {
  getMainCategories,
  login,
  verifyUser,
};
