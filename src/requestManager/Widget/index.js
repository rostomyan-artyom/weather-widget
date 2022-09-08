import axios from 'axios';

const GET_WEATHER_URL = '/data/2.5/weather';
const GET_GEO_URL = '/geo/1.0/direct';

export const getWeatherRequest = (config) => axios.get(
  GET_WEATHER_URL, config,
)

export const getGeoRequest = (config) => axios.get(
  GET_GEO_URL, config,
)
