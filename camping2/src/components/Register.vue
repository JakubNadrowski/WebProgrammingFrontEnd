<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm">
      <h3 class="text-2xl font-semibold mb-4">Sign Up</h3>
      
      <div class="mb-4">
        <label for="fname" class="block text-gray-700">First Name</label>
        <input id="fname" type="text" v-model="fname" placeholder="First Name" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="lname" class="block text-gray-700">Last Name</label>
        <input id="lname" type="text" v-model="lname" placeholder="Last Name" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">Are you an Owner?</label>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input type="radio" v-model="isOwner" value="0" class="form-radio h-5 w-5 text-blue-600" />
            <span class="ml-2 text-gray-700">User</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input type="radio" v-model="isOwner" value="1" class="form-radio h-5 w-5 text-blue-600" />
            <span class="ml-2 text-gray-700">Owner</span>
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input id="email" type="email" v-model="email" placeholder="Email" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
  name: 'RegisterTab',
  data() {
    return {
      fname: '',
      lname: '',
      isOwner: 0,
      email: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        const data = {
          fname: this.fname,
          lname: this.lname,
          isOwner: this.isOwner,
          email: this.email,
          password: hashedPassword
        };

        const response = await axios.post('http://localhost:5151/api/Users/AddUser', data);
        this.message = response.data.message;
        alert("Registry successful!");
      } catch (error) {
        this.message = 'An error occurred';
        alert("An error has occurred. Make sure that the data is correct and the email is not registered yet.");
      }
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
