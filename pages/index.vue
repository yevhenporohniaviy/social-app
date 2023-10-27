<template>
  <div>
    <main-section title="Home" :loading="loading">
      <head>
        <title>Home / Tweets</title>
      </head>
      <div class="border-b" :class="tweeterBorderColor">
        <tweet-form :user="user"/> 
      </div>
      <tweet-list-tweet :tweets="homeTweets"/>
    </main-section>
  </div>
</template>

<script setup>
const { tweeterBorderColor } = useTailwindConfig()
const { getHomeTweets } = useTweets()
const loading = ref(false)
const homeTweets = ref([])
const { useAuthUser } = useAuth()
const user = useAuthUser()
onBeforeMount(async () => {
  loading.value = true 
  try {
    const { tweets } = await getHomeTweets()
    homeTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false 
  }
})
</script>

<style lang="scss" scoped>

</style>