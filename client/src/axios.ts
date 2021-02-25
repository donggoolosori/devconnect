import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://devconnector-dj.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
