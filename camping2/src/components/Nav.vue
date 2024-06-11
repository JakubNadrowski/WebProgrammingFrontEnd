<template>
  <nav class="bg-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <a href="/" class="text-xl font-bold text-gray-800">Home</a>
      <div class="flex space-x-4 items-center">
        <span v-if="user" class="flex items-center space-x-2">
          <span>Welcome, {{ user.fName }}</span>
          <a href="/" @click="Logout" class="text-gray-800 hover:text-gray-600">Logout</a>
          <template v-if="user.isOwner">
            <a href="/CreateSpot" class="text-gray-800 hover:text-gray-600">List your property</a>
            <a href="/ManageSpots" class="text-gray-800 hover:text-gray-600">Manage your properties</a>
            <a href="/UserMod" class="text-gray-800 hover:text-gray-600">Manage User</a>
          </template>
          <template v-else-if="user.isOwner===0">
            <a href="/ManageBookings" class="text-gray-800 hover:text-gray-600">Manage your bookings</a>
            <a href="/UserMod" class="text-gray-800 hover:text-gray-600">Manage User</a>
          </template>
        </span>
        <span v-else class="flex items-center space-x-2">
          <span>Please log in.</span>
          <a href="/login" class="text-gray-800 hover:text-gray-600">Login</a>
          <a href="/register" class="text-gray-800 hover:text-gray-600">Sign up</a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '../store';
import { mapState } from 'vuex';

export default {
  name: 'NavTab',
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    Logout() {
      store.commit('clearUser');
    }
  }
};
</script>

<style scoped>
body {
  padding-top: 60px; /* Adjust this value if your navbar height changes */
}

nav {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a {
  text-decoration: none;
  color: inherit;
}

nav a:hover {
  color: #4a5568; /* Change hover color */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }

  nav .flex {
    flex-direction: column;
    align-items: flex-start;
  }

  nav .space-x-4 {
    margin-top: 10px;
  }
}
</style>
