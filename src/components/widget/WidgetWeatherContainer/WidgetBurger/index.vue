<template>
  <div class="widget-burger">
    <WidgetWeatherHeader>
      <template v-slot:title>
        Settings
      </template>

      <template v-slot:btn>
        <button class="widget-burger__hide-burger-btn" @click="$emit('hideBurger')">
          <CrossIcon class="widget-burger__cross-icon" />
        </button>
      </template>
    </WidgetWeatherHeader>
  </div>
</template>

<script>
import WidgetWeatherHeader from '@/components/widget/WidgetWeatherContainer/WidgetWeatherHeader';
import CrossIcon from '@/assets/icons/widget/cross.svg';

export default {
  name: 'WidgetBurger',
  components: {
    WidgetWeatherHeader,
    CrossIcon,
  },
}
</script>

<style lang="scss" scoped>
.widget-burger {
  background-color: #ffffff;
  padding: 20px;
}

.widget-burger__hide-burger-btn {
  width: 14px;
  min-width: 14px;
  height: 14px;
}

::v-deep .widget-burger__cross-icon {
  width: 100%;
  height: 100%;
  path {
    fill: $gray;
  }
}
</style>
