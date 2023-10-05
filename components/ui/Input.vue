<template>
  <div>
    <label 
      v-if="props.label"
      for="" 
      class="block px-3 ml-px text-sm font-medium text-gray-700"
    >
      {{ props.label }}
    </label>
    <input 
    :type="props.type" 
    @input="event => emits('update:modelValue', event.target.value)"
    :value="props.modelValue" 
    class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    :placeholder="props.placeholder"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(['update:value'])
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>

</style>