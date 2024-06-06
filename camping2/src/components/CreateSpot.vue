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
        <textarea id="description" class="form-textarea mt-1 block w-full rounded-md" rows="4" v-model="description" placeholder="Description"></textarea>
      </div>

      <div class="mb-4">
        <label for="capacity" class="block text-gray-700">Capacity</label>
        <input id="capacity" type="number" v-model="capacity" placeholder="Capacity" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="price" class="block text-gray-700">Price</label>
        <input id="price" type="number" v-model="price" placeholder="Price" class="form-input mt-1 block w-full rounded-md" />
      </div>

      <div class="mb-4">
        <label for="images" class="block text-sm font-medium text-gray-700 mb-2">Upload Images:</label>
        <input type="file" ref="fileInput" id="images" class="w-full p-2 border border-gray-300 rounded-md" multiple />
      </div>

      <button type="submit" class="bg-blue-500 text-white rounded-md px-4 py-2 w-full">Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateSpot',
  data() {
    return {
      name: '',
      location: '',
      description: '',
      capacity: 0,
      price: 0,
      owner: 1,  // Assuming the owner ID is static for simplicity
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const formData = new FormData();
        
        // Append form data
        formData.append('name', this.name);
        formData.append('location', this.location);
        formData.append('capacity', this.capacity);
        formData.append('description', this.description);
        formData.append('price', this.price);
        formData.append('owner', this.owner);

        // Append multiple image files
        const files = this.$refs.fileInput.files;
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }

        const response = await axios.post('http://localhost:5151/api/CampingSpot/AddSpot', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        alert("Registry successful!");
      } catch (error) {
        alert("An error has occurred. Make sure that the data is correct");
      }
    }
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
