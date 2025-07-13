<template>
  <div class="create-survey-page">
    <h2>Create New Survey</h2>

    <!-- Survey Details Form -->
    <form @submit.prevent="createSurvey">
      <div class="survey-details">
        <div class="form-group">
          <input
              v-model="newSurvey.title"
              type="text"
              placeholder="Survey Title"
              required
              class="input-field"
          />
        </div>
        <div class="form-group">
          <textarea
              v-model="newSurvey.description"
              placeholder="Survey Description"
              required
              class="input-field"
          ></textarea>
        </div>
        <div class="form-group">
          <input
              type="date"
              v-model="newSurvey.startDate"
              required
              class="input-field"
          />
        </div>
        <div class="form-group">
          <input
              type="date"
              v-model="newSurvey.endDate"
              required
              class="input-field"
          />
        </div>
        <div class="form-group">
          <select v-model="newSurvey.status" required class="input-field">
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      <!-- Questions Section -->
      <div class="questions">
        <h3>Survey Questions</h3>
        <div
            v-for="(question, index) in newSurvey.questions"
            :key="index"
            class="question"
        >
          <div class="form-group">
            <input
                v-model="question.text"
                type="text"
                placeholder="Question Text"
                required
                class="input-field"
            />
          </div>
          <div class="form-group">
            <select v-model="question.answerType" required class="input-field">
              <option value="text">Text</option>
              <option value="multiple">Multiple Choice</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div v-if="question.answerType === 'multiple'" class="form-group">
            <textarea
                v-model="question.options"
                placeholder="Options (comma separated)"
                class="input-field"
            ></textarea>
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" v-model="question.isRequired" />
              <span>Required</span>
            </label>
          </div>
          <button
              @click="removeQuestion(index)"
              type="button"
              class="remove-button"
          >
            Remove Question
          </button>
        </div>
        <button @click="addQuestion" type="button" class="add-question-button">
          Add Question
        </button>
      </div>

      <button type="submit" class="submit-button">Create Survey</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newSurvey = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'Active',
  questions: []
})

const addQuestion = () => {
  newSurvey.value.questions.push({
    text: '',
    answerType: 'text',
    options: '',
    isRequired: false
  })
}

const removeQuestion = (index) => {
  newSurvey.value.questions.splice(index, 1)
}

const createSurvey = () => {
  console.log('Survey Created:', newSurvey.value)
  // You can add logic here to save the survey to the database or API
}
</script>

<style scoped>
/* Global Styles */
.create-survey-page {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f4f7f9;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  box-sizing: border-box;
}

h2 {
  font-size: 24px;
  color: #f26822;
  margin-bottom: 20px;
  text-align: center;
}

h3 {
  font-size: 20px;
  color: #f26822;
  margin-bottom: 15px;
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #f26822;
  outline: none;
}

textarea {
  min-height: 100px;
}

select {
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  font-size: 16px;
}

/* Checkbox & Label */
label {
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  width: 100%;
  margin-top: 15px;
}

button:hover {
  opacity: 0.9;
}

/* Specific Buttons */
.remove-button {
  background-color: #f44336;
  color: #fff;
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 4px;
}

.remove-button:hover {
  background-color: #d32f2f;
}

.add-question-button {
  background-color: #f26822;
  color: white;
  margin-top: 15px;
}

.add-question-button:hover {
  background-color: #d8561f;
}

.submit-button {
  background-color: #f26822;
  color: white;
  width: 100%;
  margin-top: 30px;
}

.submit-button:hover {
  background-color: #d8561f;
}

/* Media Query for Mobile Devices */
@media (max-width: 600px) {
  .create-survey-page {
    padding: 15px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }

  .input-field, button {
    font-size: 14px;
    padding: 10px;
  }

  .remove-button, .add-question-button {
    font-size: 12px;
  }

  .submit-button {
    padding: 10px;
  }
}
</style>
