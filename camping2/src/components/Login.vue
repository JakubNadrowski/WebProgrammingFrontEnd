<template>
  <div class="login">
    <h3 class="text-2xl font-semibold mb-4">Login</h3>
    <form @submit.prevent="handleLogin" class="max-w-sm mx-auto">
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input id="email" type="email" v-model="email" placeholder="Email" class="form-input mt-1 block w-full rounded-md" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" class="form-input mt-1 block w-full rounded-md" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Login</button>
    </form>
  </div>
</template>

<script>
import store from '../store'
import axios from 'axios';

export default {
  name: 'LoginTab',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const data = {
          email: this.email,
          password: this.password
        };
        const response = await axios.post('http://localhost:5151/api/Users/Login', data);
        if (response.data.success) {
          store.commit('setUser', response.data.user);
          alert("Login Successful");}
      } catch (error) {
        alert("An error has occurred. Make sure that the data is correct");
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles here */
</style>