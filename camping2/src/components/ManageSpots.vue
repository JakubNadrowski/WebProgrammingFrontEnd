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
        <div v-if="spot.owner === user.id" class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ spot.name }}</h2>
          <p class="text-gray-600 mb-1">{{ spot.location }}</p>
          <p class="text-gray-800 mb-1">{{ spot.description }}</p>
          <p class="text-gray-800 mb-1">Capacity: {{ spot.capacity }}</p>
          <p class="text-gray-800 mb-1">Price: {{ spot.price }}</p>

          <!-- Edit button -->
          <button
            @click="openEditModal(spot)"
            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit
          </button>

          <button type="button" @click="DeleteSpot(spot.id)" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">Delete booking</button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">Edit Spot</h2>
        <form @submit.prevent="handleEditSubmit">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input id="name" type="text" v-model="editSpot.name" placeholder="Name" class="form-input mt-1 block w-full rounded-md" />
          </div>
          <div class="mb-4">
            <label for="location" class="block text-gray-700">Location</label>
            <input id="location" type="text" v-model="editSpot.location" placeholder="Location" class="form-input mt-1 block w-full rounded-md" />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Description</label>
            <textarea id="description" class="form-textarea mt-1 block w-full rounded-md" rows="4" v-model="editSpot.description" placeholder="Description"></textarea>
          </div>
          <div class="mb-4">
            <label for="capacity" class="block text-gray-700">Capacity</label>
            <input id="capacity" type="number" v-model="editSpot.capacity" placeholder="Capacity" class="form-input mt-1 block w-full rounded-md" />
          </div>
          <div class="mb-4">
            <label for="price" class="block text-gray-700">Price</label>
            <input id="price" type="number" v-model="editSpot.price" placeholder="Price" class="form-input mt-1 block w-full rounded-md" />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeEditModal" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'ManageSpots',
  data() {
    return {
      campingSpots: [],
      showModal: false,
      editSpot: {},
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
    openEditModal(spot) {
      this.editSpot = { ...spot };  // Create a copy of the spot to edit
      this.showModal = true;
    },
    closeEditModal() {
      this.showModal = false;
      this.editSpot = {};
    },
    handleEditSubmit() {
      axios
        .put('http://localhost:5151/api/CampingSpot/UpdateSpot', this.editSpot, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          this.showModal = false;
          this.loadCampingSpots();  // Refresh the list of camping spots
          alert('Spot updated successfully');
        })
        .catch(error => {
          console.error('Error updating camping spot:', error);
          alert('An error occurred while updating the spot');
        });
    },
    async DeleteSpot(spotid) {
      try {
        const response = await axios.delete(`http://localhost:5151/api/CampingSpot/DeleteSpot?spotId=${spotid}`);
        if (response.status === 200) {
            alert("Removal successful");
            this.loadCampingSpots();
        } else {
            alert("Something went wrong");
        }
      } catch (error) {
        alert("Something went really wrong");
      }
    },
  },
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
