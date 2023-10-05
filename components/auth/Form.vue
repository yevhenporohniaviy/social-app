<template>
  <div>
    <h1>Form</h1>
    <div class="pt-5 space-y-6">
      <ui-input label="User Name" placeholder="@username" v-model="data.username"/>
      <ui-input label="Password" placeholder="*******" type="password" v-model="data.password"/>
      <div>
        <button type="submit" @click="handelLogin">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  password: '',
  username: '',
  loading: false
});
async function handelLogin() {
  const { login } = useAuth();

  data.loading = true
  try {
    await login({
      username: data.username,
      password: data.password
    })
  } catch (error) {
    console.log(error)
  } finally {
    data.loading = false
  }
};
</script>

<style lang="scss" scoped>

</style>