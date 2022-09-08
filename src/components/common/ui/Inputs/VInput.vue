<template>
  <div :class="[
    'v-input',
    { 'v-input_error': error },
  ]">
    <label v-if="label" class="v-input__label">
      {{ label }}
    </label>

    <input
      v-model.trim="modal"
      v-bind="$attrs"
      v-on="$listeners"
      ref="input"
      :placeholder="placeholder"
      class="v-input__hero"
    >
  </div>
</template>

<script>
export default {
  name: 'VInput',
  model: {
    prop: 'search',
    event: 'change',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    isFocusedByInitialization: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit('changeValue', value);
      },
    },
  },
  mounted() {
    if (this.isFocusedByInitialization) {
      this.$refs.input.focus();
    }
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  width: 100%;
}

.v-input_error .v-input__hero {
  border: 1px solid red;
  &:focus {
    border: 1px solid red;
    outline: 1px solid red;
  }
}

.v-input__label {
  display: inline-block;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
  color: #313131;
}
.v-input__hero {
  width: 100%;
  border-radius: 4px;
  padding: 7px 6px 6px 13px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid $gray-light;
  background-color: #fff;
  &::placeholder {
    color: #868686;
  }
  &:focus {
    border: 1px solid #3e3ef3;
    outline: 1px solid #3e3ef3;
  }
}
</style>
