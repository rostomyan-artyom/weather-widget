import { mapState, mapMutations, mapActions, } from 'vuex';

export default {
  computed: {
    ...mapState('widget', [
      'weatherList',
    ]),
  },

  methods: {
    ...mapMutations('widget', [
      'ADD_WEATHER_ITEM',
    ]),
    ...mapActions('widget', [
      'fetchWeather',
    ]),

    async fetchAndAddWeatherForecasts(weatherLocations) {
      console.log(weatherLocations);
      for(let weatherPositionItem of weatherLocations) {
        const weatherItem = await this.fetchWeather({
          lat: weatherPositionItem.lat,
          lon: weatherPositionItem.lon,
        });

        if(this.locationUnique(weatherItem.id)) {
          throw Error('the location is already in the list');
        }

        if(weatherItem) this.ADD_WEATHER_ITEM(weatherItem);
      }
    },
    locationUnique(id) {
      //не использую array.includes в данном случае,
      // потому что данные о погоде могут меняться каждую минуту, лучше проверить по id
      return this.weatherList.find(item => item.id === id);
    },
  },
}
