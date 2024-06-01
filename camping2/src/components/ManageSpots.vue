<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Your managed spots</h1>
      <div>
        <h1>Welcome, {{ user ? user.fName : 'Guest' }}</h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="spot in campingSpots"
          :key="spot.id"
          class="bg-white rounded-lg shadow-md"
        >
          <div v-if="spot.owner = user.id" class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ spot.name }}</h2>
            <p class="text-gray-600 mb-1">{{ spot.location }}</p>
            <p class="text-gray-800 mb-1">{{ spot.description }}</p>
            <p class="text-gray-800 mb-1">Capacity: {{ spot.capacity }}</p>
            <p class="text-gray-800 mb-1">Price: {{ spot.price }}</p>
  
            <!-- Image display section -->
            <div class="flex flex-wrap mt-4">
              <img
                v-for="(imagePath, index) in spot.imagePaths"
                :key="index"
                :src="'data:image/png;base64,' + imagePath"
                alt="Camping spot image"
                class="w-24 h-24 object-cover rounded-md mr-2 mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'HomeTab',
    data() {
      return {
        campingSpots: [],
      };
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }),
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
            console.log(this.campingSpots);
          })
          .catch(error => {
            console.error('Error fetching camping spots:', error);
          });
      },
    },
  };
  </script>
    
    <style scoped>
    /* Additional custom styles if needed */
    </style>