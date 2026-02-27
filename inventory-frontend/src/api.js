import axios from 'axios';

// O endereço onde seu Java está rodando
const api = axios.create({
  baseURL: 'http://localhost:8081/api'
});

export default api;