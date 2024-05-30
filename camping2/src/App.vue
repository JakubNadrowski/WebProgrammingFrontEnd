<template>
  <div id="app" class="min-h-screen flex-auto">
    <Nav />
    <div class="flex-initial bg-gray-100 pt-16">
      <div class="flex-initial container mx-auto p-4">
        <router-view class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>