<template>
  <div :class="[
    'widget-weather-container',
    { 'widget-weather-container_burger-show': burgerShow },
  ]">
    <WidgetBurger class="widget-weather-container__burger" @hideBurger="toggleBurgerShow" />

    <button class="widget-weather-container__burger-btn" @click="toggleBurgerShow">
      <GearIcon />
    </button>

    <div class="widget-weather-container__list">
      <WidgetWeatherItem
        v-for="weatherItem in weatherList"
        :key="weatherItem.id"
        :weatherData="weatherItem"
      />
    </div>
  </div>
</template>

<script>
import WidgetWeatherItem from '@/components/widget/WidgetWeatherContainer/WidgetWeatherItem';
import WidgetBurger from '@/components/widget/WidgetWeatherContainer/WidgetBurger';
import GearIcon from '@/assets/icons/widget/gear.svg';

export default {
  name: 'WidgetWeatherContainer',
  components: {
    WidgetWeatherItem,
    WidgetBurger,
    GearIcon,
  },

  props: {
    weatherList: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    burgerShow: false,
  }),

  methods: {
    toggleBurgerShow() {
      this.burgerShow = !this.burgerShow;
    },
  },
}
</script>

<style lang="scss" scoped>
.widget-weather-container {
  position: relative;
  width: 300px;
  border-radius: 6px;
  box-shadow: 0 0 10px 1px rgba(141, 141, 141, 0.5);
  max-width: 100%;
  overflow: auto;
}

.widget-weather-container_burger-show .widget-weather-container__burger {
  transform: translate(0, 0);
  opacity: 1;
}

.widget-weather-container__burger {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 5;
  transform: translate(0, -110%);
  transition: $transition;
}

.widget-weather-container__burger-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 16px;
  height: 16px;
}

.widget-weather-container__list {
  max-height: 100vh;
  overflow: auto;
}
</style>
