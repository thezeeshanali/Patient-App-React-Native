import { create } from "apisauce";

// const url = "https://dummyjson.com/";
const url = "https://orange-ties-poke.loca.lt/api/v1";
// const url = 'https://laravel.pakfloodrelief.pk/api/v1';

const apiClient = create({
  baseURL: url,
});

export default apiClient;
