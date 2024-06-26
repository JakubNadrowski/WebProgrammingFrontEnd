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
          <p class="text-gray-800 mb-1">Price: {{ spot.price }}$ /per night</p>

          <div class="flex flex-wrap mt-4 overflow-x-auto">
            <img
              v-for="(imagePath, index) in spot.imagePaths"
              :key="index"
              :src="'data:image/png;base64,' + imagePath"
              alt="Camping spot image"
              class="w-24 h-24 object-cover rounded-md mr-2 mb-2"
            />
          </div>

          <button v-if="canBook" @click="selectSpot(spot), bookingModalOpen=true" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Book now!
          </button>
          <button @click="selectSpot(spot); fetchComments(selectedSpot.id)" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        View Comments
        </button>
        </div>
      </div>
    </div>


    <div v-if="commentsModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-8 rounded-lg">
      <h2 class="text-2xl font-semibold mb-4">Comments for {{ selectedSpot.name }}</h2>
      <ul>
        <li v-for="(comment, index) in comments" :key="index" class="mb-4">
          <div class="flex items-center mb-2">
            <span class="font-semibold mr-2">Rating:</span>
            <span>{{ comment.rating }}</span>
          </div>
          <p>{{ comment.comment }}</p>
        </li>
      </ul>
      <button @click="closeCommentsModal" class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Close
      </button>
    </div>
  </div>

    <div v-if="bookingModalOpen" class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Bookings for {{ selectedSpot.name }}</h2>
      <div v-if="bookings.length > 0">
        <ul>
          <li v-for="(booking, index) in bookings" :key="index">
            <div  v-if="booking.spotID === selectedSpot.id" class="bg-gray-100 rounded-lg p-4 mb-4">
              <p><strong>Start Date:</strong> {{ booking.startDate }}</p>
              <p><strong>End Date:</strong> {{ booking.endDate }}</p>
            </div>
          </li>
        </ul>
      </div>
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
        <button @click="bookSpot; bookingModalOpen= false" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Confirm Booking
        </button>
        <button @click="selectedSpot = null; bookingModalOpen= false" class="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
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
      bookings: [], // To hold the list of existing bookings
      commentsModalOpen: false,
      comments: [],
      bookingModalOpen: false,
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
    this.loadBookings();
  },
  methods: {
    fetchComments(spotId) {
        axios.get(`http://localhost:5151/api/Comment/GetCommentsBySpotId?spotId=${spotId}`)
            .then(response => {
                this.comments = response.data;
                this.commentsModalOpen = true; // Open the comments modal
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    },
    closeCommentsModal() {
      this.commentsModalOpen = false; // Close the modal
      this.comments = []; // Clear comments
    },
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
    loadBookings() {
      return axios
        .get('http://localhost:5151/api/Booking/GetAllBookings')
        .then(response => {
          console.log('Response data:', response.data);
          return response.data;
        })
        .then(data => {
          this.bookings = Array.isArray(data) ? data : []; // Ensure data is an array
          console.log('Bookings:', this.bookings);
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
        });
    },
    selectSpot(spot) {
      this.selectedSpot = spot;
      this.startDate = ''; // Reset the start date when a new spot is selected
      this.endDate = ''; // Reset the end date when a new spot is selected
    },
    async bookSpot() {
      try {
        // Check for date conflicts
        const hasConflict = this.bookings.some(booking => {
          return (
            booking.spotID === this.selectedSpot.id &&
            ((new Date(this.startDate) >= new Date(booking.startDate) && new Date(this.startDate) <= new Date(booking.endDate)) ||
            (new Date(this.endDate) >= new Date(booking.startDate) && new Date(this.endDate) <= new Date(booking.endDate)) ||
            (new Date(booking.startDate) >= new Date(this.startDate) && new Date(booking.startDate) <= new Date(this.endDate)))
          );
        });

        if (hasConflict) {
          alert('This spot is already booked for the selected dates. Please choose different dates.');
          return;
        }

        const data = {
          userID: this.user.id,
          spotID: this.selectedSpot.id,
          startDate: this.startDate,
          endDate: this.endDate,
        };

        const response = await axios.post('http://localhost:5151/api/Booking/AddBooking', data);
        console.log(data);
        if (response.status === 200) {
          alert('Booking Successful');
          this.selectedSpot = null; // Close the booking modal
          this.loadBookings(); // Reload bookings to reflect the new booking
        } else {
          alert('Booking unsuccessful, make sure to check your credentials');
        }
      } catch (error) {
        alert('An error has occurred. Make sure that the data is correct');
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


