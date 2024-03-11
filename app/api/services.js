import client from "./client";

const getCategoryServices = (mainCatID) =>
  client.get(`services?relations=products&q=${mainCatID}&s=main_category_id`);

const getAvailableSlots = (data) => client.post(`get/timeslots`, data);
// const login = (data) => client.post(`login`, data);

export default {
  getCategoryServices,
  getAvailableSlots,
};
