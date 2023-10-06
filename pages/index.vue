<template>
  <div>
    <main-section title="Home" :loading="loading">
      <tweet-form :user="user"/> 
    </main-section>
  </div>
</template>

<script setup>
const loading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>

<style lang="scss" scoped>

</style>