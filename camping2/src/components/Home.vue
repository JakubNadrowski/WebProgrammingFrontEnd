<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Camping Spots</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="spot in campingSpots"
          :key="spot.id"
          class="bg-white rounded-lg shadow-md"
        >
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ spot.name }}</h2>
            <p class="text-gray-600 mb-1">{{ spot.location }}</p>
            <p class="text-gray-800 mb-1">{{ spot.description }}</p>
            <p class="text-gray-800 mb-1">Capacity: {{ spot.capacity }}</p>
            <p class="text-gray-800 mb-1">Price: {{ spot.price }}</p>
            <img v-for="image in spot.imagePaths" :key="image" :src="'../assets/'+image" :alt="image" />
            <div v-for="image in spot.imagePaths" :key="image">
              <img v-bind:src=getImageUrl(image) />  
              {{ getImageUrl(image) }}
            </div>
            
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Book now!
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'HomeTab',
    data() {
      return {
        campingSpots: [],
      };
    },
    created() {
      this.loadCampingSpots();
    },
    methods: {
      loadCampingSpots() {
        return axios
          .get('http://localhost:5151/api/CampingSpot/GetAllSpots')
          .then(response => response.data)
          .then(data => {
            this.campingSpots = data;
          })
          .catch(error => {
            console.error('Error fetching camping spots:', error);
          });
      },
      getImageUrl(imageName) {
      return `../assets/${imageName}`;
    }
    },
  };
  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>
  