<template>
  <div id="app">
    <WidgetWeatherContainer :weatherList="weatherList" />
  </div>
</template>

<script>
import '@/assets/styles/style.scss';
import axios from 'axios';

import WidgetWeatherContainer from "@/components/widget/WidgetWeatherContainer";

import { WEATHER_API_TOKEN } from '@/apiConfig';

export default {
  name: 'App',
  components: {
    WidgetWeatherContainer,
  },

  data() {
    return {
      weatherLocations: [],
      weatherList: [],
    };
  },

  async created() {
    try {
      await this.initializeWeatherLocations();

      for(let weatherPositionItem of this.weatherLocations) {
        const weatherItem = await this.getWeather(weatherPositionItem.lat, weatherPositionItem.lon);

        if(weatherItem) this.weatherList.push(weatherItem);
      }
    } catch(e) {
      console.error(e);
    }
  },

  methods: {
    async initializeWeatherLocations() {
      if(localStorage.weatherLocations) {
        this.weatherLocations = JSON.parse(localStorage.weatherLocations);
      } else {
        await this.getUserPosition()
          .then(location => {
            const { latitude, longitude } = location.coords;

            this.weatherLocations.push({ lat: latitude, lon: longitude });
            localStorage.setItem('weatherLocations', JSON.stringify(this.weatherLocations));
          })
      }
    },
    getUserPosition() {
      return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    },
    async getWeather(lat, lon) {
      const url = `/weather?lat=${ lat }&lon=${ lon }&lang=ru&appid=${ WEATHER_API_TOKEN }`
      const weatherResponse = await axios.get(url);
      const { data } = weatherResponse;

      return data;
    },
    // 1. мы должны проверить есть ли в локальном хранилище weatherLocations
    // 2. если есть - выводим
    // 3. если нет - запрашиваем доступ к геолокации и записываем в виде объекта { let: 1, lon: 2, }
  },
}
</script>

<style lang="scss">

</style>
