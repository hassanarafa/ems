<template>
  <div class="form-wrapper">
    <form class="custom-form" @submit.prevent="getLocation">
      <p class="text-form">Login Form</p>
      <div class="form-group">
        <label for="name">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            placeholder="Enter your name"
        />

        <label for="password">Password</label>
        <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Enter your password"
        />
      </div>

      <button type="submit" class="submit-btn">Submit</button>
      <p v-if="locationName">📌 Location: {{ locationName }}</p>

    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {

  data() {
    return {
      name: '',
      password: '',
      location: null,
      locationName: null,
      error: null,
    };
  },
  methods: {
    handleSubmit() {
      alert(`Name: ${this.name}\nPassword: ${this.password}`);
    },
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

<style scoped>
/* Full-page wrapper to center content */
.form-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef1f5;
}

/* Form Styling */
.custom-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.text-form{
  margin: 20px;
  text-align: center;
  color: #3b82f6;
  font-weight: bold;
  font-size: 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.form-control {
  padding: 10px 14px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2563eb;
}
</style>
