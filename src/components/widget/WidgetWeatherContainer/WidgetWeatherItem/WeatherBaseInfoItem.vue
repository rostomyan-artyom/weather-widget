<template>
  <li class="weather-base-info-item">
    <component
      v-if="baseInfoData.icon"
      :is="baseInfoData.icon"
      class="weather-base-info-item__icon"
    />

    <span class="weather-base-info-item__title">
      {{ baseInfoData.title }}
    </span>
  </li>
</template>

<script>
export default {
  name: 'WeatherBaseInfoItem',

  props: {
    baseInfoData: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.weather-base-info-item {
  display: flex;
  align-items: center;
}

.weather-base-info-item__icon {
  width: 24px;
  height: 24px;
}

.weather-base-info-item__title {
  font-size: 16px;
  color: $gray;
  margin-left: 14px;
}
</style>
