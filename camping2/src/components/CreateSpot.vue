<template>
    <div class="min-h-screen flex items-center justify-center">
      <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
        <h3 class="text-2xl font-semibold mb-4">Create a Spot</h3>
        
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input id="name" type="text" v-model="name" placeholder="Name" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <div class="mb-4">
          <label for="location" class="block text-gray-700">Location</label>
          <input id="location" type="text" v-model="location" placeholder="Location" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Description</label>
          <textarea id="description" class="form-textarea mt-1 block w-full rounded-md" rows="4" cols="50" v-model="description" placeholder="Description"></textarea>
        </div>
  
        <div class="mb-4">
          <label for="capacity" class="block text-gray-700">Capacity</label>
          <input id="capacity" type="number" v-model="capacity" placeholder="Capacity" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Price</label>
          <input id="price" type="number" v-model="price" placeholder="Price" class="form-input mt-1 block w-full rounded-md" />
        </div>
  
        <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Create</button>
      </form>
    </div>
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