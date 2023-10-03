<template>
  <div
    class="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300 border-b"
    :class="[themeBorderColor, defaultTransition]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
const { themeBorderColor, defaultTransition } = useTailwindConfig();
</script>

<style lang="scss" scoped></style>
