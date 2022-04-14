import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://54.180.150.0:3000',
});
export default instance;
