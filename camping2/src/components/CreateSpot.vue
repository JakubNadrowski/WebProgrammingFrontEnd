<template>
    <form @submit.prevent="handleSubmit">
        <h3>Create a spot</h3>
        
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" placeholder="Name" />
        </div>

        <div class="form-group">
            <label>Location</label>
            <input type="text" class="form-control" v-model="location" placeholder="Location"/>
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="4" cols="50" v-model="description" placeholder="Description"/>
        </div>

        <div class="form-group">
            <label>Capacity</label>
            <input type="number" class="form-control" min="1" v-model="capacity" placeholder="Capacity"/>
        </div>

        <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" min="1" v-model="price" placeholder="Price"/>
        </div>

        <button class="btn btn-primary btn-block">Create</button>
    </form>
    
</template>

<script>
    import axios from 'axios'
    export default{
        name: 'CreateSpot',
        data(){
            return {
                name: '',
                location: '',
                description: '',
                capacity: 0,
                price: 0,
                owner: 1,
                file: null
            }
        },
        methods: {
            async handleSubmit(){
                try{
                    const data = {
                    name: this.name,
                    location: this.location,
                    description: this.description,
                    capacity: this.capacity,
                    price: this.price,
                    owner: 1
                    
                }

                const response = await axios.post('http://localhost:5151/api/CampingSpot/AddSpot', data);
                this.message = response.data.message;
                alert("Registry successful!");
                } catch (error) {
                    this.message = 'An error occurred';
                    alert("An error has occured. Make sure that the data is correct")
                }
            }
        }
    }
</script>