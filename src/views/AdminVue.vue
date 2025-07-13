<template>
  <div class="todo-container">
    <h2>📝 {{ userName }}'s Audit Tasks</h2>

    <!-- Top Stats -->
    <div class="stats">
      <div class="stat-card">📋 Total: {{ allTasks.length }}</div>
      <div class="stat-card">✅ Completed: {{ completedCount }}</div>
      <div class="stat-card">❌ Pending: {{ pendingCount }}</div>
      <div class="stat-card">🔄 Manual: {{ manualCount }} | Auto: {{ autoCount }}</div>
      <div class="stat-card">👥 Employees: {{ employeeCount }}</div>
    </div>

    <!-- Search -->
    <input
        type="text"
        v-model="searchTerm"
        placeholder="🔍 Search by Employee ID..."
        class="search-input"
    />

    <!-- Task Table -->
    <div class="task-table">
      <div class="task-header">
        <span>Employee</span><span>Status</span><span v-show="!isMobile">Store</span>
        <span v-show="!isMobile">Region</span><span v-show="!isMobile">Zone</span>
        <span v-show="!isMobile">Date</span><span v-show="!isMobile">Type</span>
        <span v-show="!isMobile">Actions</span>
      </div>

      <div
          v-for="(task, index) in filteredTasks"
          :key="index"
          class="task-row"
          @click="toggleExpanded(task.employee_id)"
      >
        <span>{{ task.employee_name }}</span>
        <span>{{ task.is_completed ? '✅' : '❌' }}</span>

        <!-- Details shown if desktop OR task is expanded -->
        <template v-if="!isMobile || expandedTaskId === task.employee_id">
          <span>{{ task.store.name }}</span>
          <span>{{ task.region }}</span>
          <span>{{ task.zone }}</span>
          <span>{{ task.audit_date }}</span>
          <span>{{ task.assignment_type }}</span>
          <span>
            <button @click.stop="markAsCompleted(task)" :disabled="task.is_completed">✅</button>
            <button @click.stop="reassign(task)">🔄</button>
            <button @click.stop="deleteTask(task)">🗑</button>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const userName = ref('Admin');
const searchTerm = ref('');
const expandedTaskId = ref(null);
const isMobile = ref(false);

const toggleExpanded = (id) => {
  expandedTaskId.value = expandedTaskId.value === id ? null : id;
};

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) userName.value = storedName;

  // Detect mobile
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});

const allTasks = ref([
  { employee_id: 1, employee_name: 'John', store: { name: 'Store A' }, region: 'North', zone: 'Z1', audit_date: '2025-04-14', assignment_type: 'Manual', is_completed: false },
  { employee_id: 2, employee_name: 'Anna', store: { name: 'Store B' }, region: 'South', zone: 'Z2', audit_date: '2025-04-12', assignment_type: 'Automatic', is_completed: true },
  { employee_id: 3, employee_name: 'Mike', store: { name: 'Store C' }, region: 'East', zone: 'Z3', audit_date: '2025-04-15', assignment_type: 'Manual', is_completed: false },
  { employee_id: 4, employee_name: 'Sarah', store: { name: 'Store D' }, region: 'West', zone: 'Z4', audit_date: '2025-04-13', assignment_type: 'Automatic', is_completed: false },
  { employee_id: 5, employee_name: 'Liam', store: { name: 'Store E' }, region: 'North', zone: 'Z1', audit_date: '2025-04-14', assignment_type: 'Manual', is_completed: true },
  { employee_id: 6, employee_name: 'Emma', store: { name: 'Store F' }, region: 'South', zone: 'Z2', audit_date: '2025-04-12', assignment_type: 'Automatic', is_completed: false },
  { employee_id: 7, employee_name: 'Noah', store: { name: 'Store G' }, region: 'East', zone: 'Z3', audit_date: '2025-04-15', assignment_type: 'Manual', is_completed: true },
  { employee_id: 8, employee_name: 'Olivia', store: { name: 'Store H' }, region: 'West', zone: 'Z4', audit_date: '2025-04-13', assignment_type: 'Automatic', is_completed: false },
  { employee_id: 9, employee_name: 'James', store: { name: 'Store I' }, region: 'North', zone: 'Z1', audit_date: '2025-04-14', assignment_type: 'Manual', is_completed: true },
  { employee_id: 10, employee_name: 'Sophia', store: { name: 'Store J' }, region: 'South', zone: 'Z2', audit_date: '2025-04-12', assignment_type: 'Automatic', is_completed: true },
]);

const filteredTasks = computed(() => {
  const term = searchTerm.value.trim();
  return allTasks.value.filter(task =>
      task.employee_id.toString().includes(term)
  );
});

const completedCount = computed(() => allTasks.value.filter(t => t.is_completed).length);
const pendingCount = computed(() => allTasks.value.filter(t => !t.is_completed).length);
const manualCount = computed(() => allTasks.value.filter(t => t.assignment_type === 'Manual').length);
const autoCount = computed(() => allTasks.value.filter(t => t.assignment_type === 'Automatic').length);
const employeeCount = computed(() => new Set(allTasks.value.map(t => t.employee_id)).size);

const markAsCompleted = task => task.is_completed = true;
const reassign = task => alert('Reassign logic for ' + task.employee_name);
const deleteTask = task => allTasks.value = allTasks.value.filter(t => t !== task);
</script>

<style scoped>
.todo-container {
  max-width: 100%;
  padding: 1rem;
  font-family: sans-serif;
}

h2 {
  text-align: center;
  color: #f26822;
  margin-bottom: 1rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.stat-card {
  padding: 0.5rem 1rem;
  background: #ffeedd;
  border-radius: 8px;
  min-width: 140px;
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.task-table {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.task-header,
.task-row {
  display: grid;
  grid-template-columns: repeat(8, minmax(100px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  align-items: center;
}

.task-header {
  background-color: #f4f4f4;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.task-row {
  background: #fff;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.task-row:hover {
  background-color: #f9f9f9;
}

.task-row span button {
  margin-right: 0.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .task-header {
    grid-template-columns: repeat(2, 1fr);
  }
  .task-row {
    grid-template-columns: repeat(2, 1fr);
    font-size: 0.9rem;
  }
  .stats {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
