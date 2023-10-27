<template>
  <div>
    <h1>
      List
    </h1>
    <ul>
      <li v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  tweets: {
    type: Array,
    required: true
  }
})

</script>

<style lang="scss" scoped>

</style>