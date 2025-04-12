<template>
  <div class="container">
    <h1>My Current Location</h1>
    <button @click="getLocation">Get My Location</button>
    <p v-if="location">📍 Latitude: {{ location.lat }}, Longitude: {{ location.lng }}</p>
    <p v-if="locationName">📌 Location: {{ locationName }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      location: null,
      locationName: null,
      error: null,
    };
  },
  methods: {
    getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            this.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.error = null;

            // Fetch location name using OpenStreetMap
            this.getLocationName(this.location.lat, this.location.lng);
          },
          (err) => {
            this.error = "Error getting location: " + err.message;
          }
        );
      } else {
        this.error = "Geolocation is not supported by your browser.";
      }
    },
    async getLocationName(lat, lng) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        this.locationName = response.data.display_name;
      } catch (error) {
        this.error = "Failed to get location name.";
      }
    },
  },
};
</script>

<style>
.container {
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.error {
  color: eb804b;
}
</style>
