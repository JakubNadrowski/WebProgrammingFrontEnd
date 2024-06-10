<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Camping Spots</h1>
    <div>
      <h1>Welcome, {{ user ? user.fName : 'Guest' }}</h1>
    </div>

    <div class="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Filter and Sort Spots</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-gray-700">Location:</label>
          <input
            v-model="filters.location"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label class="block text-gray-700">Minimum Capacity:</label>
          <input
            v-model.number="filters.minCapacity"
            type="number"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label class="block text-gray-700">Min Price:</label>
          <input
            v-model.number="filters.minPrice"
            type="number"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label class="block text-gray-700">Max Price:</label>
          <input
            v-model.number="filters.maxPrice"
            type="number"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label class="block text-gray-700">Sort by:</label>
          <select v-model="sortCriteria" class="w-full p-2 border border-gray-300 rounded">
            <option value="name">Name</option>
            <option value="capacity">Capacity</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700">Order:</label>
          <select v-model="sortOrder" class="w-full p-2 border border-gray-300 rounded">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="spot in filteredAndSortedCampingSpots"
        :key="spot.id"
        class="bg-white rounded-lg shadow-md"
      >
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ spot.name }}</h2>
          <p class="text-gray-600 mb-1">{{ spot.location }}</p>
          <p class="text-gray-800 mb-1">{{ spot.description }}</p>
          <p class="text-gray-800 mb-1">Capacity: {{ spot.capacity }}</p>
          <p class="text-gray-800 mb-1">Price: {{ spot.price }}</p>

          <div class="flex flex-wrap mt-4 overflow-x-auto">
            <img
              v-for="(imagePath, index) in spot.imagePaths"
              :key="index"
              :src="'data:image/png;base64,' + imagePath"
              alt="Camping spot image"
              class="w-24 h-24 object-cover rounded-md mr-2 mb-2"
            />
          </div>

          <button v-if="canBook" @click="selectSpot(spot)" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Book now!
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedSpot" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Select a date range for {{ selectedSpot.name }}</h2>
        <label class="block text-gray-700 mb-2">Start Date:</label>
        <input
          type="date"
          v-model="startDate"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label class="block text-gray-700 mb-2">End Date:</label>
        <input
          type="date"
          v-model="endDate"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button @click="bookSpot" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Confirm Booking
        </button>
        <button @click="selectedSpot = null" class="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Cancel
        </button>
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
      campingSpots: [], // Initialize campingSpots as an empty array
      filters: {
        location: '',
        minCapacity: 0,
        minPrice: 0,
        maxPrice: Infinity,
      },
      sortCriteria: 'name',
      sortOrder: 'asc',
      selectedSpot: null, // To hold the selected spot for booking
      startDate: '', // To hold the start date for booking
      endDate: '', // To hold the end date for booking
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    canBook() {
      return this.user && this.user.isOwner === 0;
    },
    filteredAndSortedCampingSpots() {
      let filtered = this.campingSpots.filter(spot => {
        return (
          (!this.filters.location || spot.location.includes(this.filters.location)) &&
          (!this.filters.minCapacity || spot.capacity >= this.filters.minCapacity) &&
          (!this.filters.minPrice || spot.price >= this.filters.minPrice) &&
          (!this.filters.maxPrice || spot.price <= this.filters.maxPrice)
        );
      });

      let sorted = filtered.sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1;
        if (this.sortCriteria === 'name') {
          return a.name.localeCompare(b.name) * modifier;
        } else if (this.sortCriteria === 'capacity') {
          return (a.capacity - b.capacity) * modifier;
        } else if (this.sortCriteria === 'price') {
          return (a.price - b.price) * modifier;
        }
        return 0;
      });

      return sorted;
    },
  },
  created() {
    this.loadCampingSpots();
  },
  methods: {
    loadCampingSpots() {
      return axios
        .get('http://localhost:5151/api/CampingSpot/GetAllSpots')
        .then(response => {
          console.log('Response data:', response.data);
          return response.data;
        })
        .then(data => {
          this.campingSpots = Array.isArray(data) ? data : []; // Ensure data is an array
          console.log('Camping spots:', this.campingSpots);
        })
        .catch(error => {
          console.error('Error fetching camping spots:', error);
        });
    },
    selectSpot(spot) {
      this.selectedSpot = spot;
      this.startDate = ''; // Reset the start date when a new spot is selected
      this.endDate = ''; // Reset the end date when a new spot is selected
    },
    bookSpot() {
      if (this.startDate && this.endDate) {
        if (new Date(this.endDate) >= new Date(this.startDate)) {
          alert(`Booking confirmed for ${this.selectedSpot.name} from ${this.startDate} to ${this.endDate}`);
          this.selectedSpot = null; // Close the date picker modal
        } else {
          alert('End date cannot be before start date.');
        }
      } else {
        alert('Please select both start and end dates before booking.');
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
.overflow-x-auto {
  /* Ensure horizontal scrolling */
  overflow-x: auto;
  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.overflow-x-auto::-webkit-scrollbar {
  /* Hide the scrollbar for Chrome, Safari, and Opera */
  display: none;
}
</style>


