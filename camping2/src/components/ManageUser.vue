<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm">
      <h3 class="text-2xl font-semibold mb-4">Change your data</h3>
      
      <div class="mb-4">
        <label for="fname" class="block text-gray-700">First Name:</label>
        <input id="fname" type="text" v-model="user.fName" placeholder="First Name" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="lname" class="block text-gray-700">Last Name:</label>
        <input id="lname" type="text" v-model="user.lName" placeholder="Last Name" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email:</label>
        <input id="email" type="email" v-model="user.email" placeholder="Email" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Change data</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
  name: 'UserMod',
  computed: { 
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    async handleSubmit() {
      try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        const data = {
          id: this.user.id,
          fname: this.user.fName,
          lname: this.user.lName,
          isOwner: this.user.isOwner,
          email: this.user.email,
          password: hashedPassword
        };

        const response = await axios.put('http://localhost:5151/api/Users/UpdateUser', data);
        this.message = response.data.message;
        alert("Data change successful!");
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
