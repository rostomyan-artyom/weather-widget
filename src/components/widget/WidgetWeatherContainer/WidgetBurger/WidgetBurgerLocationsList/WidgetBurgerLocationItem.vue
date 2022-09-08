<template>
  <li class="widget-burger-location-item">
    <div class="widget-burger-location-item__name-box">
      <button class="widget-burger-location-item__drag-and-drop-btn">
        <BurgerIcon class="widget-burger-location-item__burger-icon" />
      </button>

      <p class="widget-burger-location-item__name">
        <slot name="name" />
      </p>
    </div>

    <button class="widget-burger-location-item__delete-btn" @click="$emit('deleteLocation')">
      <BasketIcon class="widget-burger-location-item__basket-icon" />
    </button>
  </li>
</template>

<script>
import BurgerIcon from '@/assets/icons/widget/burger.svg';
import BasketIcon from '@/assets/icons/widget/basket.svg';

export default {
  name: 'WidgetBurgerLocationItem',
  components: {
    BurgerIcon,
    BasketIcon,
  },
}
</script>

<style lang="scss" scoped>
.widget-burger-location-item {
  display: flex;
  justify-content: space-between;
  padding: 7px 12px;
  background-color: $gray-light;
  transition: $transition;
  &:hover {
    box-shadow: 0 0 6px 1px rgba(133, 133, 133, 0.29);
  }
}

.widget-burger-location-item__name-box {
  display: flex;
  align-items: center;
}

.widget-burger-location-item__name {
  margin-left: 10px;
  font-size: 13px;
  color: $gray;
}

.widget-burger-location-item__drag-and-drop-btn {
  width: 15px;
  height: 15px;
  outline: none;
}

.widget-burger-location-item__burger-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.widget-burger-location-item__delete-btn {
  width: 15px;
  height: 15px;
  transition: $transition;
  &:hover {
    transform: translate(0, -2px);
  }
}
</style>
