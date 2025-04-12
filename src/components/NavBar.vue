<template>
  <div class="navbar-content" @click="closeSidebar">
    <p class="brand">Employee Management System</p>

    <!-- Hamburger Icon -->
    <div class="hamburger" @click.stop="toggleMenu">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </div>

    <!-- Sidebar -->
    <div :class="['sidebar', { open: menuOpen }]">
      <div class="sidebar-content">
        <p @click="goToHome">Home</p>
        <p @click="goToClock">Clock</p>
        <p>Edit</p>
        <p @click="goToSurvey">Survey</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeSidebar = (e) => {
  if (!e.target.closest('.sidebar') && !e.target.closest('.hamburger')) {
    menuOpen.value = false
  }
}

const goToHome = () => {
  router.push('/home')
}

const goToClock = () => {
  router.push('/clock')
}

const goToSurvey = () => {
  router.push('/survey')
}

// Close sidebar if clicked outside
onMounted(() => {
  document.addEventListener('click', closeSidebar)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeSidebar)
})
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}

.navbar-content {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  position: relative;
  z-index: 10;
}

.brand {
  font-weight: bold;
  font-size: 20px;
  color: #eb804b;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.nav-bar p {
  margin: 0;
  cursor: pointer;
  color: #eb804b;
  font-weight: 500;
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  left: -250px; /* Sidebar hidden by default */
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #fff4ee; /* Sidebar background color set to white */
  padding-top: 20px;
  transition: 0.3s;
  z-index: 20;
}

.sidebar.open {
  left: 0; /* Slide in */
}

.sidebar-content p {
  margin: 0;
  padding: 15px;
  color: #f26822; /* Text color for sidebar */
  cursor: pointer;
  font-weight: 500;
}

.sidebar-content p:hover {
  background-color: #f26822; /* Background color on hover */
  color: white; /* Text color on hover */
}

/* Hamburger icon for mobile */
.hamburger {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.icon-bar {
  height: 3px;
  width: 25px;
  background: #f26822; /* Hamburger icon color */
  border-radius: 2px;
}

/* Hide sidebar content initially and show hamburger on mobile */
@media (max-width: 768px) {
  .nav-bar {
    display: none; /* Hide main nav-bar on mobile */
  }

  .hamburger {
    display: flex; /* Show hamburger icon */
  }

  .sidebar {
    left: -250px; /* Sidebar is hidden off-screen */
  }

  .sidebar.open {
    left: 0; /* Sidebar slides in when 'open' class is added */
  }
}
</style>
