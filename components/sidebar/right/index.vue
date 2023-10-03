
import ItemVue from './preview-card/Item.vue';

import ItemVue from './preview-card/Item.vue';
<template>
  <div class="flex flex-col ">
    <sidebar-right-preview-card title="What's happening">
      <sidebar-right-preview-card-item v-for="item in whatsHappening" :key="item">
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">{{ item.title }}</h2>
          <p class="text-xs text-gray-400">{{ item.count }}</p>
        </div>
      </sidebar-right-preview-card-item>
    </sidebar-right-preview-card>
    <sidebar-right-preview-card title="Who to follow">
      <sidebar-right-preview-card-item v-for="item in whoToFollow" :key="item">
        <div class="flex flex-row justify-between items-center p-2">
          <div class="flex flex-row">
            <img class="h-10 w-10 rounded-full" :src="item.img" :alt="item.name"/>
            <div class="flex flex-col ml-2 ">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ item.name }}</h1>
              <p class="text-xs text-gray-400">{{ item.handel }}</p>
            </div>
          </div>
          <div class="flex items-center h-full ">
            <button class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full  ">
              Follow
            </button>
          </div>
        </div>
      </sidebar-right-preview-card-item>
    </sidebar-right-preview-card>

  </div>
</template>

<script setup>
const whatsHappening = ref([
  {
    title: 'Bot1',
    count: '18.8k Tweets'
  },
  {
    title: 'Bot 2',
    count: '1.8k Tweets'
  },
  {
    title: 'Bot 3',
    count: '1.8k Tweets'
  }
]);

const whoToFollow = ref([
  {
    name: 'Jonny',
    handel: '@Jonny',
    img: 'https://picsum.photos/200'
  },

]);
</script>

<style lang="scss" scoped>

</style>