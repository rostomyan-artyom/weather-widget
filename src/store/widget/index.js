import { getWeatherRequest, } from "@/requestManager/Widget";
import { WEATHER_API_TOKEN, } from "@/apiConfig";

export const state = () => ({
  weatherList: [],
})

export const mutations = {
  ADD_WEATHER_ITEM(state, weatherItem) {
    state.weatherList.push(weatherItem);
  },
  DELETE_WEATHER_ITEM(state, id) {
    state.weatherList = state.weatherList.filter(item => item.id !== id);
  },
  MOVE_LOCATIONS_POSITION(state, data) {
    const deletedItem = state.weatherList.splice(data.oldIndex, 1)[0];
    state.weatherList.splice(data.newIndex, 0, deletedItem);
  },
}

export const actions = {
  async fetchWeather(state, data) {
    const response = await getWeatherRequest({
      params: {
        lat: data?.lat,
        lon: data?.lon,
        lang: data?.lang || 'en',
        appid: WEATHER_API_TOKEN,
      }
    })

    if(response.status === 200) return response.data;

    return response;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
