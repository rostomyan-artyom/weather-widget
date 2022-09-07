import axios from 'axios';
import { WEATHER_API_URL } from '@/apiConfig';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = WEATHER_API_URL;

export default axios;
