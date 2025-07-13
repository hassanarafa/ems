<template>
  <div class="todo-container">
    <h2>📝 {{ userName }}'s Audit Tasks</h2>

    <!-- Filter Buttons -->
    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="setFilter('all')">All</button>
      <button :class="{ active: filter === 'completed' }" @click="setFilter('completed')">Completed</button>
      <button :class="{ active: filter === 'pending' }" @click="setFilter('pending')">Pending</button>
    </div>

    <!-- Task List -->
    <div class="task-list">
      <div
          v-for="(task, index) in paginatedTasks"
          :key="index"
          class="task-item"
          :class="{ completed: task.is_completed }"
          @click="openTaskDetails(task)"
      >
        <strong>{{ task.store.name }}</strong>
        <span>{{ task.assignment_type }}</span>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="filteredTasks.length > tasksPerPage">
      <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
    </div>

    <!-- Modal for Task Details -->
    <div class="modal" v-if="selectedTask">
      <div class="modal-content">
        <h3>{{ selectedTask.store.name }}</h3>
        <p><strong>📍 Address:</strong> {{ selectedTask.store.address }}</p>
        <p><strong>🗓 Audit Date:</strong> {{ selectedTask.audit_date }}</p>
        <p><strong>🔧 Assigned:</strong> {{ selectedTask.assignment_type }}</p>
        <p><strong>✅ Completed:</strong> {{ selectedTask.is_completed ? 'Yes' : 'No' }}</p>
        <button v-if="!selectedTask.is_completed" @click="markAsCompleted(selectedTask)">Mark as Completed</button>
        <button class="close-btn" @click="selectedTask = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const userName = ref('Guest');
const filter = ref('all');
const currentPage = ref(1);
const tasksPerPage = 10;
const selectedTask = ref(null);

const employee = ref({ id: 1 });

const allTasks = ref([
  { employee_id: 1, store: { name: 'Store A', address: '123 Main St' }, audit_date: '2025-04-14', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store B', address: '456 Elm St' }, audit_date: '2025-04-12', assignment_type: 'Automatic', is_completed: true },
  { employee_id: 1, store: { name: 'Store C', address: '789 Oak St' }, audit_date: '2025-04-10', assignment_type: 'Automatic', is_completed: true },
  { employee_id: 1, store: { name: 'Store D', address: '101 Pine St' }, audit_date: '2025-04-18', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store E', address: '202 Maple St' }, audit_date: '2025-04-20', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store F', address: '303 Cedar St' }, audit_date: '2025-04-22', assignment_type: 'Automatic', is_completed: true },
  { employee_id: 1, store: { name: 'Store G', address: '404 Birch St' }, audit_date: '2025-04-24', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store H', address: '505 Ash St' }, audit_date: '2025-04-25', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store I', address: '606 Willow St' }, audit_date: '2025-04-26', assignment_type: 'Automatic', is_completed: true },
  { employee_id: 1, store: { name: 'Store J', address: '707 Poplar St' }, audit_date: '2025-04-27', assignment_type: 'Manual', is_completed: false },
  { employee_id: 1, store: { name: 'Store K', address: '808 Fir St' }, audit_date: '2025-04-28', assignment_type: 'Manual', is_completed: false },
]);

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) userName.value = storedName;
});

const employeeTasks = computed(() =>
    allTasks.value.filter(task => task.employee_id === employee.value.id)
);

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'completed':
      return employeeTasks.value.filter(task => task.is_completed);
    case 'pending':
      return employeeTasks.value.filter(task => !task.is_completed);
    default:
      return employeeTasks.value;
  }
});

const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredTasks.value.length / tasksPerPage))
);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage;
  return filteredTasks.value.slice(start, start + tasksPerPage);
});

watch([filteredTasks, totalPages], () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

const setFilter = (value) => {
  filter.value = value;
  currentPage.value = 1;
};

const openTaskDetails = (task) => {
  selectedTask.value = task;
};

const markAsCompleted = (task) => {
  task.is_completed = true;
  selectedTask.value = null;
};
</script>

<style scoped>
.todo-container {
  max-width: 90%;
  margin: auto;
  padding: 1rem;
}

h2 {
  color: #f26822;
  text-align: center;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filters button {
  padding: 0.5rem 1rem;
  border: 2px solid #f26822;
  background: transparent;
  color: #f26822;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.filters button.active,
.filters button:hover {
  background-color: #f26822;
  color: white;
}

@media (min-width: 768px) {
  .task-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (min-width: 1024px) {
  .task-item {
    width: 100%;
  }
}

.task-item {
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-item.completed {
  background-color: #e6ffe6;
  border-color: green;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.close-btn {
  background-color: #888;
  margin-top: 1rem;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
