<template>
    <form @submit.prevent="handleLogin">
        <h3>Login</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password"/>
        </div>

        <button class="btn btn-primary btn-block">Login</button>
    </form>
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