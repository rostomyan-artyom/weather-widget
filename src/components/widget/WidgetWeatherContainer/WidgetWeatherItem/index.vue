<template>
  <div class="widget-weather-item">
    <WidgetWeatherHeader>
      <template v-slot:title>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </template>
    </WidgetWeatherHeader>

    <div class="widget-weather-item__main">
      <div class="widget-weather-item__img-box">
        <img
          :src="`http://openweathermap.org/img/w/${ weatherData.weather[0].icon }.png`"
          alt="#"
          class="widget-weather-item__img"
        />
      </div>

      <span  class="widget-weather-item__degree">
        {{ (celsiusTemperature).toFixed(2) }} °C
      </span>
    </div>

    <div class="widget-weather-item__base-info">
      <ul class="widget-weather-item__base-info-list">
        <WeatherBaseInfoItem
          v-for="(baseInfoItem, index) in baseInfo"
          :key="index"
          :baseInfoData="baseInfoItem"
          class="widget-weather-item__base-info-item"
        />
      </ul>
    </div>

    <div class="widget-weather-item__other-info">
      <ul class="widget-weather-item__other-info-list">
        <li
          v-for="[key, value, index] in Object.entries(otherInfo)"
          :key="index"
          class="widget-weather-item__other-info-item"
        >
          <span>{{ key }}</span>: <span>{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WeatherBaseInfoItem from '@/components/widget/WidgetWeatherContainer/WidgetWeatherItem/WeatherBaseInfoItem';
import WidgetWeatherHeader from '@/components/widget/WidgetWeatherContainer/WidgetWeatherHeader';
import SpeedIcon from '@/assets/icons/widget/speed.svg';
import PressureIcon from '@/assets/icons/widget/pressure.svg';

export default {
  name: 'WidgetWeatherItem',
  components: {
    WeatherBaseInfoItem,
    WidgetWeatherHeader,
  },

  props: {
    weatherData: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    celsiusTemperature() {
      return this.weatherData.main?.temp - 273.15;
    },
    baseInfo() {
      return [
        {
          icon: SpeedIcon,
          title: this.weatherData?.wind?.speed + 'm/s SSE',
        },
        {
          icon: PressureIcon,
          title: this.weatherData.main.pressure + 'hPa',
        },
      ];
    },
    otherInfo() {
      return {
        Humidity: this.weatherData.main.humidity + '%',
        'Dev point': (this.weatherData.main.feels_like - 273.15).toFixed(2) + '°C',
        Visibility: (this.weatherData.visibility / 1000).toFixed(1) + 'km',
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.widget-weather-item {
  width: 100%;
  padding: 20px;
}

.widget-weather-item__main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
}

.widget-weather-item__img {
  width: 120px;
}

.widget-weather-item__degree {
  font-size: 25px;
  line-height: 115%;
  color: $gray;
  font-weight: 500;
}

.widget-weather-item__base-info {
  margin-top: 15px;
}

.widget-weather-item__base-info-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.widget-weather-item__other-info {
  margin-top: 15px;
}

.widget-weather-item__other-info-list {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.widget-weather-item__other-info-item {
  font-size: 14px;
}
</style>
