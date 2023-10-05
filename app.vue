<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">
      <loading-page v-if="isLoading"/>

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <sidebar-left/>
            </div>
          </div>
          <main class="col-span-12 md:col-span-8 lg:col-span-6 ">
            <router-view/>
          </main>
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <sidebar-right/>
            </div>
          </div>
        </div>
      </div>

      <auth-page v-else/>


    </div>
  </div> 
</template>

<script setup>
const { useAuthUser, initAuth, useAuthLoading } = useAuth() 
  const isLoading = useAuthLoading()
  const user = useAuthUser()
  const darkMode = ref(false)

  onBeforeMount(() => { 
    initAuth()
  })
  
</script>

<style lang="scss" scoped>

</style>