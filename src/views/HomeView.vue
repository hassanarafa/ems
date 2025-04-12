<template>
  <div class="home-wrapper">
    <div class="digital-id-card">
      <h2>Digital ID</h2>
      <div class="digital-name">
        <img class="profile-pic" src="https://i.pravatar.cc/100?img=12" alt="Profile" />
        <div class="user-info">
          <p><strong>Name:</strong> {{ userName }}</p>
          <p><strong>Position:</strong> Software Engineer</p>
          <p><strong>User ID:</strong> 123456789</p>
          <p><strong>Expired Date:</strong> 10/10/2026</p>
        </div>
      </div>
      <button @click="goToClockPage">Clock In</button>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
    };
  },
  mounted() {
    this.userName = localStorage.getItem('userName') || 'Guest';
  },
  methods: {
    goToClockPage() {
      this.$router.push('/clock');
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 15px 0;
  color: #eb804b;
  text-align: center;
}

.home-wrapper {
  display: flex;
  justify-content: end;
  align-items: start;
  padding: 2rem 1rem;
  background-color: #fff;
  min-height: 100vh;
}

.digital-id-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.profile-pic {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #eb804b;
}

.digital-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.user-info p {
  margin: 0.4rem 0;
  font-size: 15px;
}

button {
  background-color: #eb804b;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #eb804b;
}

.logout-btn {
  background-color: #999;
}

.logout-btn:hover {
  background-color: #777;
}

@media (max-width: 600px) {
  h2 {
    font-size: 1.5rem;
  }

  .digital-name {
    flex-direction: column;
    align-items: center;
  }

  .user-info {
    text-align: center;
  }
}
</style>
