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

    <WidgetBurgerLocationsList :weatherList="weatherList" class="widget-burger__locations" />

    <div class="widget-burger__add-location">
      <p class="widget-burger__location-title">
        Add Location:
      </p>

      <div class="widget-burger__add-location-actions">
        <VInput
          :value="searchInput.value"
          :error="searchInput.error"
          placeholder="location name"
          @changeValue="changeSearchValue"
          @keyup.enter="addPosition"
        />

        <button
          class="widget-burger__add-btn"
          :disabled="requestProcess"
          @click="addPosition"
        >
          <EnterIcon class="widget-burger__enter-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import widgetMixin from '@/mixins/widgetMixin';

import WidgetWeatherHeader from '@/components/widget/WidgetWeatherContainer/WidgetWeatherHeader';
import WidgetBurgerLocationsList from '@/components/widget/WidgetWeatherContainer/WidgetBurger/WidgetBurgerLocationsList';
import VInput from '@/components/common/ui/Inputs/VInput';
import CrossIcon from '@/assets/icons/widget/cross.svg';
import EnterIcon from '@/assets/icons/widget/enter.svg';

import { WEATHER_API_TOKEN } from '@/apiConfig';
import { getGeoRequest } from '@/requestManager/Widget';

export default {
  name: 'WidgetBurger',
  components: {
    WidgetWeatherHeader,
    WidgetBurgerLocationsList,
    VInput,
    CrossIcon,
    EnterIcon,
  },
  mixins: [ widgetMixin, ],

  props: {
    weatherListProp: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    searchInput: {
      value: '',
      error: false,
    },
    requestProcess: false,
  }),

  methods: {
    changeSearchValue(value) {
      this.searchInput.value = value;
      this.searchInput.error = false;
    },
    async fetchLocations(location) {
      const locationsResponse = await getGeoRequest({
        params: {
          q: location,
          limit: 1,
          appid: WEATHER_API_TOKEN,
        }
      })

      if(locationsResponse.status === 200) return locationsResponse.data

      return locationsResponse;
    },
    async addPosition() {
      try {
        if(this.requestProcess) return;

        this.requestProcess = true;
        const locations = await this.fetchLocations(this.searchInput.value);

        if(!locations.length) {
          this.searchInput.error = true;
          return;
        }
        const positions = locations.map(item => {
          return { lat: item.lat, lon: item.lon }
        })

        const storageLocations = localStorage.weatherLocations;
        await this.fetchAndAddWeatherForecasts(positions);

        if(!storageLocations) {
          localStorage.weatherLocations = JSON.stringify(positions);
        } else {
          const newStorageLocations = JSON.parse(storageLocations).concat(positions);

          localStorage.weatherLocations = JSON.stringify(newStorageLocations);
        }

        this.$emit('hideBurger');

        this.requestProcess = false;
        this.searchInput.value = '';
      } catch(e) {
        console.error(e);
        this.searchInput.error = true;
        this.requestProcess = false;
      }
    },
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

.widget-burger__locations {
  margin-top: 25px;
}

.widget-burger__add-location {
  margin-top: 30px;
}

.widget-burger__add-location-actions {
  display: flex;
  align-items: center;
}

.widget-burger__add-btn {
  width: 24px;
  min-width: 24px;
  height: 24px;
  margin-left: 16px;
  border-radius: 4px;
  transition: $transition;
  &:hover {
    background-color: $gray-light;
    transform: translate(0, -2px);
  }
}

.widget-burger__location-title {
  font-size: 16px;
  line-height: 115%;
  color: $gray;
  margin-bottom: 15px;
}
</style>
