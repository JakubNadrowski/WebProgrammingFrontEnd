<template>
  <nav class="bg-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <a href="/" class="text-xl font-bold text-gray-800">Home</a>
      <div class="flex space-x-4">
        <span v-if="user">Welcome, {{ user.fName }}
          <a href="/home" @click.prevent="Logout" class="text-gray-800 hover:text-gray-600">Logout</a>
          <span v-if="user.isOwner">
            <a href="/CreateSpot" class="text-gray-800 hover:text-gray-600">List your property</a>
            <a href="/ManageSpots" class="text-gray-800 hover:text-gray-600">Manage your properties</a>
          </span>
        </span>
        <span v-else>Please log in.
           <a href="/login" class="text-gray-800 hover:text-gray-600">Login </a>
           <a href="/register" class="text-gray-800 hover:text-gray-600"> Sign up</a>
           </span>
        
        
      </div>
    </div>
  </nav>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex';
export default {
  name: 'NavTab',
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods:{
    Logout(){
      store.commit('clearUser');
    }
  }
}

console.log(store.state.user)
</script>

<style scoped>
body {
  padding-top: 60px; /* Adjust this value if your navbar height changes */
}
</style>