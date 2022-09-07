<template>
  <div class="widget-weather-header">
    <span class="widget-weather-header__title">
      <slot name="title" />
    </span>

    <slot name="btn" />
  </div>
</template>

<script>
export default {
  name: 'WidgetWeatherHeader',
}
</script>

<style lang="scss" scoped>
.widget-weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.widget-weather-header__title {
  font-size: 18px;
  font-weight: 500;
  color: $gray;
}
</style>
