<template>
  <div class="survey">
    <h2>Employee Performance Survey</h2>

    <!-- Step 1: Questions 1–14 -->
    <div v-if="step === 1">
      <div v-for="(q, i) in stepOneQuestions" :key="i" class="question">
        <label>{{ q.label }}</label>

        <!-- Multiple Choice (Yes/No, Daily/Weekly/Monthly) -->
        <template v-if="q.type === 'multiple'">
          <div class="options">
            <label v-for="opt in q.options" :key="opt">
              <input
                  type="radio"
                  :name="'q' + i"
                  :value="opt"
                  v-model="stepOneAnswers[i]"
              />
              {{ opt }}
            </label>
          </div>
        </template>

        <!-- Rating Questions (1, 2, 3, ... 10) -->
        <template v-if="q.type === 'rating'">
          <div class="options">
            <label v-for="n in 10" :key="n" class="rating-option">
              <input
                  type="radio"
                  :name="'q' + i"
                  :value="n"
                  v-model="stepOneAnswers[i]"
              />
              {{ n }}
            </label>
          </div>
        </template>

        <!-- Text Input for Others -->
        <template v-else>
          <input type="text" v-model="stepOneAnswers[i]" />
        </template>
      </div>

      <button @click="goToStepTwo">Next</button>
    </div>

    <!-- Step 2: Questions 15–20 -->
    <div v-else>
      <h2>Additional Information</h2>
      <div v-for="(q, i) in stepTwoQuestions" :key="i" class="question">
        <label>{{ q.label }}</label>

        <template v-if="q.type === 'dropdown'">
          <select v-model="stepTwoAnswers[i]">
            <option disabled value="">Select...</option>
            <option v-for="opt in q.options" :key="opt">{{ opt }}</option>
          </select>
        </template>

        <template v-else>
          <input type="text" v-model="stepTwoAnswers[i]" />
        </template>
      </div>

      <!-- Back Button -->
      <button @click="goBackToStepOne">Back</button>

      <button @click="submitSurvey">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const stepOneAnswers = ref(Array(14).fill(''))
const stepTwoAnswers = ref(Array(6).fill(''))

const stepOneQuestions = [
  { label: '1. Employee Name?', type: 'text' },
  { label: '2. Employee Contact Number?', type: 'text' },
  { label: "3. How would you rate the employee's behavior with colleagues?", type: 'rating' },
  { label: '4. Commitment to completing tasks on time?', type: 'rating' },
  { label: '5. Commitment to cleanliness and organization?', type: 'rating' },
  { label: '6. Accuracy in performing tasks?', type: 'rating' },
  { label: '7. Efficiency relative to salary and benefits?', type: 'rating' },
  { label: '8. Quality of output (professionalism and expertise)?', type: 'rating' },
  { label: '9. Overall performance evaluation?', type: 'rating' },
  { label: '10. Recommend promotion or award?', type: 'multiple', options: ['Yes', 'No'] },
  { label: '11. If "No", reason for not recommending', type: 'text' },
  { label: '12. What stands out most about the employee?', type: 'text' },
  { label: '13. Task the employee excels at?', type: 'text' },
  {
    label: '14. Likelihood to participate in activities (next 30 days)?',
    type: 'multiple',
    options: ['Daily', 'Weekly', 'Monthly']
  }
]

const stepTwoQuestions = [
  { label: '15. Direct Supervisor Name', type: 'text' },
  { label: '16. Department Name', type: 'text' },
  { label: '17. Tasks or Projects Assigned', type: 'text' },
  { label: '18. Employee Nationality', type: 'text' },
  {
    label: '19. Employee Gender',
    type: 'dropdown',
    options: ['Male', 'Female', 'Prefer not to say']
  },
  {
    label: '20. Employee Age Range',
    type: 'dropdown',
    options: ['Under 25', '25–34', '35–44', '45–54']
  }
]

const goToStepTwo = () => {
  step.value = 2
}

const goBackToStepOne = () => {
  step.value = 1
}

const submitSurvey = () => {
  const finalData = {
    stepOne: stepOneAnswers.value,
    stepTwo: stepTwoAnswers.value
  }
  console.log('Survey Submitted:', finalData)
  alert('Survey Submitted Successfully!')
}
</script>

<style scoped>
.survey {
  padding: 1rem;
  max-width: 700px;
  margin: auto;
}

.question {
  margin-bottom: 1.2rem;
}

input,
select {
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.4rem;
  font-size: 1rem;
}

.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.rating-option {
  margin-right: 10px;
}

.options label {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

button {
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

button:last-of-type {
  background-color: #eb804b; /* Red for Submit button */
}

button:last-of-type:hover {
  background-color: #eb804b;
}
</style>
