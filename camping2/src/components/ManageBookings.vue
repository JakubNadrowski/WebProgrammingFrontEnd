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
          <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" @click="openCommentModal(booking)">Rate booking</button>
          <button type="button" @click="deleteBooking(booking.id)" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">Delete booking</button>
        </div>
      </div>
    </div>

    <!-- Comment Modal -->
    <div v-if="showCommentModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4">Add a comment for {{ selectedBooking ? getSpotById(selectedBooking.spotID).name : '' }}</h2>
        <label for="rating" class="block text-gray-700 mb-2">Rating:</label>
        <input v-model="rating" type="number" min="1" max="9" class="w-full p-2 border border-gray-300 rounded mb-4">
        <label for="comment" class="block text-gray-700 mb-2">Comment:</label>
        <textarea v-model="comment" class="w-full p-2 border border-gray-300 rounded mb-4" rows="4" maxlength="255"></textarea>
        <button @click="addRatingAndComment" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
        <button @click="closeCommentModal" class="ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancel</button>
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
      showCommentModal: false,
      selectedBooking: null,
      rating: 1,
      comment: ''
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
    openCommentModal(booking) {
      this.selectedBooking = booking;
      this.showCommentModal = true;
    },
    closeCommentModal() {
      this.selectedBooking = null;
      this.rating = 1;
      this.comment = '';
      this.showCommentModal = false;
    },
    async addRatingAndComment() {
      try {
        const data = {
          spotID: this.selectedBooking.spotID,
          rating: this.rating,
          comment: this.comment
        };

        const response = await axios.post('http://localhost:5151/api/Comment/AddComment', data);
        if (response.status === 200) {
          alert('Comment added successfully');
          this.closeCommentModal();
        } else {
          alert('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('An error occurred while adding comment');
      }
    },
    async deleteBooking(bookingID) {
      try {
        const response = await axios.delete(`http://localhost:5151/api/Booking/RemoveBooking?bookingID=${bookingID}`);
        if (response.status === 200) {
            alert("Removal successful");
        } else {
            alert("Something went wrong");
        }
      } catch (error) {
        alert("Something went really wrong");
      }
    }
  }
};
</script>
  
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>