<template>
  <div>
    <tweet-item-header :tweet="props.tweet"/>

    <div class="ml-16">
      <p class="flex-shrink font-medium text-gray-800 w-auto dark:text-white">{{ props.tweet.text }}</p>
      <div 
        v-for="image in tweet.mediaFiles" 
        :key="image.id" 
        class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="themeBorderColor">
          <img :src="image.url" class="w-full rounded-2xl "/>
      </div>
      <div class="mt-2 ">
        <tweet-item-actions/>
      </div>
    </div>
  </div>
</template>

<script setup>
const {themeBorderColor } = useTailwindConfig();
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>