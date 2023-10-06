<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center p-6 ">
      <ui-loading-spinner/>
    </div>
    <div v-else>
      <tweet-form-input :user="user" @onSubmit="handelFormSubmit"/>
    </div>

  </div>
</template>

<script setup>
const { postTweet } = useTweets();
const loading = ref(false)
const props = defineProps({
  user: {
    type: Object,
    require: true
  }
})



async function handelFormSubmit(data) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles
    })
   } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>

</style>