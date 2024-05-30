<template>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <h3 class="text-2xl font-semibold mb-4">Login</h3>
  
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input id="email" type="email" v-model="email" placeholder="Email" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input id="password" type="password" v-model="password" placeholder="Password" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Login</button>
      </form>
    </div>
  </template>

<script>
    import axios from 'axios'
    export default{
        name: 'LoginTab',
        data(){
            return{
                email: '',
                password: ''
            }
        },
        methods: {
            async handleLogin(){
                try{
                    const data = {
                    email: this.email,
                    password: this.password,
                }
                const response = await axios.post('http://localhost:5151/api/Users/Login', data);
                this.message = response.data.message;
                if (response.data.success){
                    alert("Login Successful")
                }
                else(alert("Login failed, make sure to enter the correct credidentials."))
                } catch (error) {
                    this.message = 'An error occurred';
                    alert("An error has occured. Make sure that the data is correct")
                }
            }
        }
    }
</script>