<template>
  <Draggable
    tag="ul"
    class="widget-burger-locations-list"
    @end="moveLocations"
  >
    <WidgetBurgerLocationItem
      v-for="(weatherItem, index) in weatherList"
      :key="weatherItem.id"
      class="widget-burger-locations-list__item"
      @deleteLocation="deleteLocation(weatherItem.id,index)"
    >
      <template v-slot:name>
        {{ weatherItem.name }}, {{ weatherItem.sys.country }}
      </template>
    </WidgetBurgerLocationItem>
  </Draggable>
</template>

<script>
import { mapMutations, } from 'vuex';
import Draggable from 'vuedraggable';

import WidgetBurgerLocationItem from '@/components/widget/WidgetWeatherContainer/WidgetBurger/WidgetBurgerLocationsList/WidgetBurgerLocationItem';

export default {
  name: 'WidgetBurgerLocationsList',
  components: {
    Draggable,
    WidgetBurgerLocationItem,
  },

  props: {
    weatherList: {
      type: Array,
      default: () => ([]),
    },
  },

  methods: {
    ...mapMutations('widget', [
      'DELETE_WEATHER_ITEM',
      'MOVE_LOCATIONS_POSITION',
    ]),
    deleteLocation(id, index) {
      if(!localStorage.weatherLocations) return;
      if(this.weatherList.length < 2) {
        console.error('You cannot delete the last location. At least one.');
        return;
      }

      let newLocationsList = JSON.parse(localStorage.weatherLocations);
      newLocationsList.splice(index, 1);

      localStorage.weatherLocations = JSON.stringify(newLocationsList);

      this.DELETE_WEATHER_ITEM(id);
    },
    moveLocations(event) {
      const storageLocations = JSON.parse(localStorage.weatherLocations);

      const deletedItem = storageLocations.splice(event.oldIndex, 1)[0];
      storageLocations.splice(event.newIndex, 0, deletedItem);

      localStorage.weatherLocations = JSON.stringify(storageLocations);

      this.MOVE_LOCATIONS_POSITION({oldIndex: event.oldIndex, newIndex: event.newIndex})
    },
  },
}
</script>

<style lang="scss" scoped>
.widget-burger-locations-list__item {
  &:not(:first-child) {
    margin-top: 20px;
  }
}
</style>
