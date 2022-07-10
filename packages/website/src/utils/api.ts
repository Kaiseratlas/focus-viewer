import axios from 'axios';

const api = axios.create({ baseURL: location.origin });

export default api;
