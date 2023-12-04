import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  proxy: {
    host: 'localhost',
    port: 8080,
  },
  withCredentials: true
});