<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        
        <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="fname" placeholder="First Name" />
        </div>

        <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="lname" placeholder="Last Name"/>
        </div>

        <div class="form-group">
            <label>Owner</label>
            <input type="radio" class="form-control" id="No" v-model="isOwner" value=0 placeholder="Owner"/>
            <label for="No">User</label>
            <input type="radio" class="form-control" id="Yes" v-model="isOwner" value=1 placeholder="Owner"/>
            <label for="Yes">Owner</label>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="from-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Confirm Password"/>
        </div>

        <button class="btn btn-primary btn-block">Sign Up</button>
    </form>
    
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'RegisterTab',
        data(){
            return {
                fname: '',
                lname: '',
                isOwner: 0,
                email: '',
                password: ''
            }
        },
        methods: {
            async handleSubmit(){
                try{
                    const data = {
                    fname: this.fname,
                    lname: this.lname,
                    isOwner: this.isOwner,
                    email: this.email,
                    password: this.password,
                }
                const response = await axios.post('http://localhost:5151/api/Users/AddUser', data);
                this.message = response.data.message;
                alert("Registry successful!");
                } catch (error) {
                    this.message = 'An error occurred';
                    alert("An error has occured. Make sure that the data is correct and the email is not registered yet.")
                }
            }
        }
    }
</script>