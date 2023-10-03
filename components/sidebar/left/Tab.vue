<template>
  <div>
    <nuxt-link to="#" class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white" :class="defaultTransition">
      <div class="h-6 w-6">
        <slot name="icon"></slot>
      </div>
      <div class="hidden ml-4 text-xl xl:block" :class="textClass">
        <slot name="name"></slot>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
const textClass = computed(() => props.active ? 'font-semibold' : 'font-normal')
  
</script>

<style lang="scss" scoped>

</style>