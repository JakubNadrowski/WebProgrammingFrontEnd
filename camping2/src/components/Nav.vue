<template>
  <nav class="bg-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <a href="/" class="text-xl font-bold text-gray-800">Home</a>
      <div class="flex space-x-4">
        <a href="/CreateSpot" class="text-gray-800 hover:text-gray-600">List your property</a>
        <a href="/login" class="text-gray-800 hover:text-gray-600">Login</a>
        <a href="/register" class="text-gray-800 hover:text-gray-600">Sign up</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavTab'
}
</script>

<style scoped>
body {
  padding-top: 60px; /* Adjust this value if your navbar height changes */
}
</style>