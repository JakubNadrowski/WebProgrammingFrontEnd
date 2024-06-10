<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Your bookings</h1>
      <div>
        <h1>Welcome, {{ user ? user.fName : 'Guest' }}</h1>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="booking in userBookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow-md"
        >
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ getSpotById(booking.spotID).name }}</h2>
            <p class="text-gray-600 mb-1">{{ getSpotById(booking.spotID).location }}</p>
            <p class="text-gray-800 mb-1">{{ getSpotById(booking.spotID).description }}</p>
            <p class="text-gray-800 mb-1">Capacity: {{ getSpotById(booking.spotID).capacity }}</p>
            <p class="text-gray-800 mb-1">Price: {{ getSpotById(booking.spotID).price }}</p>
            <p class="text-gray-800 mb-1">Start Date: {{ booking.startDate }}</p>
            <p class="text-gray-800 mb-1">End Date: {{ booking.endDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapState } from 'vuex';
  import axios from 'axios';
  
  export default {
    name: 'ManageBookings',
    data() {
      return {
        bookings: [],
        campingSpots: [],
        showModal: false,
        editSpot: {},
      };
    },
    computed: { 
      ...mapState({
        user: state => state.user,
      }),
      userBookings() {
        return this.bookings.filter(booking => booking.userID === this.user.id);
      }
    },
    created() {
      this.loadBookings();
      console.log(this.bookings)
      this.loadCampingSpots();
    },
    methods: {
      loadBookings() {
        axios
          .get('http://localhost:5151/api/Booking/GetAllBookings')
          .then(response => response.data)
          .then(data => {
            this.bookings = data;
          })
          .catch(error => {
            console.error('Error fetching bookings:', error);
          });
      },
      loadCampingSpots() {
        axios
          .get('http://localhost:5151/api/CampingSpot/GetAllSpots')
          .then(response => response.data)
          .then(data => {
            this.campingSpots = data;
          })
          .catch(error => {
            console.error('Error fetching camping spots:', error);
          });
      },
      getSpotById(spotId) {
        return this.campingSpots.find(spot => spot.id === spotId) || {};
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>