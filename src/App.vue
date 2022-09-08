<template>
  <div id="app">
    <WidgetWeatherContainer :weatherListProp="weatherList" />
  </div>
</template>

<script>
import { mapState, } from 'vuex';
import widgetMixin from '@/mixins/widgetMixin';

import WidgetWeatherContainer from "@/components/widget/WidgetWeatherContainer";

import '@/assets/styles/style.scss';

export default {
  name: 'App',
  components: {
    WidgetWeatherContainer,
  },
  mixins: [ widgetMixin, ],

  data() {
    return {
      weatherLocations: [],
    };
  },
  computed: {
    ...mapState('widget', [
      'weatherList',
    ]),
  },

  async created() {
    try {
      await this.initializeWeatherLocations();

      await this.fetchAndAddWeatherForecasts(this.weatherLocations);
    } catch(e) {
      console.error(e);
    }
  },

  methods: {
    async initializeWeatherLocations() {
      const storageLocationsValide = localStorage.weatherLocations &&
          JSON.parse(localStorage.weatherLocations).length;

      if(storageLocationsValide) {
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
  },
}
</script>
