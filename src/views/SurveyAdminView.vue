<template>
  <div class="admin-survey">
    <h2 class="title">Survey Management</h2>

    <!-- View All Surveys -->
    <div v-if="!selectedSurvey" class="survey-list">
      <h3 class="section-title">All Surveys</h3>
      <div class="survey-column-container">
        <div v-for="survey in surveys" :key="survey.id" class="survey-card">
          <div class="survey-card-content">
            <div class="survey-data-row">
              <span class="survey-title">{{ survey.title }}</span>
              <span class="survey-description">{{ survey.description }}</span>
              <span class="survey-user-count">{{ survey.users.length }} completed</span>
              <button @click="viewSurveyDetails(survey)" class="btn btn-view">
                <i class="fa fa-eye"></i> View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Survey Details -->
    <div v-if="selectedSurvey" class="survey-details">
      <div class="survey-header">
        <h3 class="survey-title">{{ selectedSurvey.title }} - Survey Details</h3>
        <button @click="backToSurveyList" class="btn btn-back">
          <i class="fa fa-arrow-left"></i> Back to Surveys
        </button>
      </div>

      <!-- Survey Content as Row Layout -->
      <div class="survey-content-row">
        <!-- Survey Questions -->
        <div class="survey-questions">
          <h4>Survey Questions</h4>
          <div class="question-row-container">
            <div v-for="(question, index) in selectedSurvey.questions" :key="index" class="question-card">
              <div class="question-header">
                <span class="question-text">{{ question.text }}</span>
                <div class="question-actions">
                  <button @click="editQuestion(index)" class="btn btn-edit">
                    <i class="fa fa-pencil-alt"></i> Edit
                  </button>
                  <button @click="deleteQuestion(index)" class="btn btn-delete">
                    <i class="fa fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>

              <!-- Question Render Based on Type -->
              <div v-if="question.isEditing" class="edit-form">
                <input v-model="question.editText" class="question-input" />
                <div class="edit-actions">
                  <button @click="saveQuestion(index)" class="btn btn-save">
                    <i class="fa fa-save"></i> Save
                  </button>
                  <button @click="cancelEdit(index)" class="btn btn-cancel">
                    <i class="fa fa-times"></i> Cancel
                  </button>
                </div>
              </div>

              <!-- Render Question Based on Type -->
              <div v-else>
                <div v-if="question.type === 'text'">
                  <input type="text" class="question-input" v-model="question.answer" placeholder="Your answer here" />
                </div>
                <div v-else-if="question.type === 'dropdown'">
                  <select v-model="question.answer" class="question-dropdown">
                    <option v-for="(option, optionIndex) in question.options" :key="optionIndex" :value="option">{{ option }}</option>
                  </select>
                  <!-- Edit Choices -->
                  <div v-if="question.isEditingChoices">
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="choice-row">
                      <input v-model="question.options[optionIndex]" class="choice-input" />
                      <button @click="removeChoice(index, optionIndex)" class="btn btn-delete">
                        <i class="fa fa-trash-alt"></i>
                      </button>
                    </div>
                    <button @click="addChoice(index)" class="btn btn-add-choice">
                      <i class="fa fa-plus"></i> Add Choice
                    </button>
                    <button @click="saveChoices(index)" class="btn btn-save">
                      <i class="fa fa-save"></i> Save Choices
                    </button>
                    <button @click="cancelEditChoices(index)" class="btn btn-cancel">
                      <i class="fa fa-times"></i> Cancel
                    </button>
                  </div>
                  <button @click="editChoices(index)" v-if="!question.isEditingChoices" class="btn btn-edit">
                    <i class="fa fa-pencil-alt"></i> Edit Choices
                  </button>
                </div>
                <div v-else-if="question.type === 'checkbox'">
                  <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="checkbox-item">
                    <label>
                      <input type="checkbox" v-model="question.answer" :value="option" /> {{ option }}
                    </label>
                  </div>
                  <!-- Edit Choices -->
                  <div v-if="question.isEditingChoices">
                    <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="choice-row">
                      <input v-model="question.options[optionIndex]" class="choice-input" />
                      <button @click="removeChoice(index, optionIndex)" class="btn btn-delete">
                        <i class="fa fa-trash-alt"></i>
                      </button>
                    </div>
                    <button @click="addChoice(index)" class="btn btn-add-choice">
                      <i class="fa fa-plus"></i> Add Choice
                    </button>
                    <button @click="saveChoices(index)" class="btn btn-save">
                      <i class="fa fa-save"></i> Save Choices
                    </button>
                    <button @click="cancelEditChoices(index)" class="btn btn-cancel">
                      <i class="fa fa-times"></i> Cancel
                    </button>
                  </div>
                  <button @click="editChoices(index)" v-if="!question.isEditingChoices" class="btn btn-edit">
                    <i class="fa fa-pencil-alt"></i> Edit Choices
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Add New Question -->
          <div class="add-question">
            <button @click="addQuestion" class="btn btn-add">
              <i class="fa fa-plus"></i> Add New Question
            </button>
          </div>
        </div>

        <!-- Users Who Completed the Survey -->
        <div class="survey-users">
          <h4>Users Who Completed This Survey</h4>
          <div class="user-row-container">
            <div v-for="user in selectedSurvey.users" :key="user.id" class="user-item">
              <span>{{ user.name }}</span> - <span class="user-date">{{ user.submissionDate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const surveys = ref([
  {
    id: 1,
    title: 'Employee Satisfaction Survey',
    description: 'A survey to measure employee satisfaction and work environment.',
    createdDate: '2025-04-10',
    questions: [
      { text: 'How satisfied are you with your job?', type: 'text', isEditing: false, answer: '', editText: '' },
      { text: 'Would you recommend this company to a friend?', type: 'dropdown', options: ['Yes', 'No'], isEditing: false, isEditingChoices: false, answer: '', editText: '' },
      { text: 'What do you like about the company?', type: 'checkbox', options: ['Culture', 'Work-life balance', 'Salary'], isEditing: false, isEditingChoices: false, answer: [], editText: '' }
    ],
    users: [
      { id: 1, name: 'John Doe', submissionDate: '2025-04-10' },
      { id: 2, name: 'Jane Smith', submissionDate: '2025-04-12' }
    ]
  }
]);

const selectedSurvey = ref(null);

function viewSurveyDetails(survey) {
  selectedSurvey.value = survey;
}

function backToSurveyList() {
  selectedSurvey.value = null;
}

function editQuestion(index) {
  const question = selectedSurvey.value.questions[index];
  question.isEditing = true;
  question.editText = question.text;
}

function saveQuestion(index) {
  const question = selectedSurvey.value.questions[index];
  question.text = question.editText;
  question.isEditing = false;
}

function cancelEdit(index) {
  selectedSurvey.value.questions[index].isEditing = false;
}

function deleteQuestion(index) {
  selectedSurvey.value.questions.splice(index, 1);
}

function editChoices(index) {
  selectedSurvey.value.questions[index].isEditingChoices = true;
}

function cancelEditChoices(index) {
  selectedSurvey.value.questions[index].isEditingChoices = false;
}

function saveChoices(index) {
  selectedSurvey.value.questions[index].isEditingChoices = false;
}

function addChoice(index) {
  selectedSurvey.value.questions[index].options.push('');
}

function removeChoice(questionIndex, optionIndex) {
  selectedSurvey.value.questions[questionIndex].options.splice(optionIndex, 1);
}

function addQuestion() {
  const newQuestion = {
    text: 'New Question',
    type: 'text',
    options: [],
    answer: '',
    isEditing: false,
    isEditingChoices: false
  };
  selectedSurvey.value.questions.push(newQuestion);
}
</script>



<style scoped>
.admin-survey {
  font-family: 'Roboto', sans-serif;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f7fc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  color: #2d3e50;
}

.section-title {
  font-size: 24px;
  color: #4a5568;
  margin-bottom: 20px;
}

.survey-column-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.survey-card {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.survey-card-content {
  display: flex;
  flex-direction: column;
}

.survey-data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.survey-title {
  font-size: 16px;
  color: #2d3e50;
  font-weight: 500;
}

.survey-description {
  font-size: 14px;
  color: #4a5568;
}

.survey-user-count {
  font-size: 14px;
  color: #4a5568;
}

.survey-actions {
  display: flex;
  justify-content: flex-start;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-view {
  background-color: #38b2ac;
  color: white;
}

.btn-view:hover {
  background-color: #319795;
}

.survey-details {
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.survey-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.survey-title {
  font-size: 20px;
  color: #2d3e50;
}

.survey-content-row {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.survey-questions, .survey-users {
  flex: 1;
}
.question-row-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.question-text {
  font-size: 16px;
  font-weight: 500;
  color: #2d3e50;
}

.question-actions {
  display: flex;
  gap: 8px;
}

.edit-form,
.edit-actions {
  margin-top: 10px;
}

.question-input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  font-size: 14px;
  margin-top: 5px;
}

.choice-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.choice-input {
  flex: 1;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  font-size: 14px;
}

.checkbox-item {
  margin: 6px 0;
  font-size: 14px;
}

.btn-edit,
.btn-delete,
.btn-add-choice,
.btn-save,
.btn-cancel {
  font-size: 12px;
  padding: 6px 10px;
}

.btn-add {
  margin-top: 20px;
  background-color: #4299e1;
  color: white;
}

.btn-add:hover {
  background-color: #3182ce;
}
</style>

