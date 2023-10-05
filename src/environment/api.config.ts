import axios from 'axios';
export const instanceAxios = axios.create({
  baseURL: 'https://64b9063179b7c9def6c07565.mockapi.io/api-todos/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});
