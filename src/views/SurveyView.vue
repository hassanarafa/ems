<template>
  <div class="survey">
    <h2>Employee Performance Survey</h2>

    <div v-if="step === 1">
      <div
          v-for="(q, i) in stepOneQuestions"
          :key="i"
          :class="[
          'question',
          { answered: stepOneAnswers[i] },
          { 'text-answered': q.type === 'text' && stepOneAnswers[i] }
        ]"
      >
        <transition name="fade">
          <div v-if="i !== 10 || stepOneAnswers[9] === 'No'">
            <label>{{ q.label }}</label>

            <template v-if="q.type === 'multiple'">
              <div class="options">
                <button
                    v-for="opt in q.options"
                    :key="opt"
                    :class="['option-button', { selected: stepOneAnswers[i] === opt }]"
                    @click="selectOption(i, opt)"
                >
                  {{ opt }}
                </button>
              </div>
            </template>

            <template v-else-if="q.type === 'rating'">
              <div class="rating-scale">
                <label
                    v-for="n in 10"
                    :key="n"
                    :class="['rating-button', { selected: stepOneAnswers[i] == n }]"
                >
                  <input
                      type="radio"
                      :name="'q' + i"
                      :value="n"
                      v-model="stepOneAnswers[i]"
                      class="hidden-radio"
                  />
                  {{ n }}
                </label>
              </div>
            </template>

            <template v-else>
              <input
                  type="text"
                  v-model="stepOneAnswers[i]"
                  :class="{ 'text-highlighted': stepOneAnswers[i] }"
              />
            </template>
          </div>
        </transition>
      </div>

      <div class="full-width-btn" @click="goToStepTwo">Next</div>
    </div>

    <div v-else>
      <h2>Additional Information</h2>
      <div
          v-for="(q, i) in stepTwoQuestions"
          :key="i"
          :class="[
          'question',
          { answered: stepTwoAnswers[i] },
          { 'text-answered': q.type === 'text' && stepTwoAnswers[i] }
        ]"
      >
        <label>{{ q.label }}</label>

        <template v-if="q.type === 'dropdown'">
          <select v-model="stepTwoAnswers[i]">
            <option disabled value="">Select...</option>
            <option v-for="opt in q.options" :key="opt">{{ opt }}</option>
          </select>
        </template>

        <template v-else>
          <input
              type="text"
              v-model="stepTwoAnswers[i]"
              :class="{ 'text-highlighted': stepTwoAnswers[i] }"
          />
        </template>
      </div>

      <div class="button-group">
        <button @click="goBackToStepOne">Back</button>
        <button @click="submitSurvey">Submit</button>
      </div>
    </div>

    <div v-if="showMessage" class="message-container">
      <div class="message">Survey Submitted Successfully!</div>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'

const step = ref(1)
const stepOneAnswers = ref(Array(14).fill(''))
const stepTwoAnswers = ref(Array(6).fill(''))

const showMessage = ref(false)

const stepOneQuestions = [
  { label: 'Employee Name?', type: 'text' },
  { label: 'Employee Contact Number?', type: 'text' },
  { label: "How would you rate the employee's behavior with colleagues?", type: 'rating' },
  { label: 'Commitment to completing tasks on time?', type: 'rating' },
  { label: 'Commitment to cleanliness and organization?', type: 'rating' },
  { label: 'Accuracy in performing tasks?', type: 'rating' },
  { label: 'Efficiency relative to salary and benefits?', type: 'rating' },
  { label: 'Quality of output (professionalism and expertise)?', type: 'rating' },
  { label: 'Overall performance evaluation?', type: 'rating' },
  { label: 'Recommend promotion or award?', type: 'multiple', options: ['Yes', 'No'] },
  { label: 'If "No", reason for not recommending', type: 'text' },
  { label: 'What stands out most about the employee?', type: 'text' },
  { label: 'Task the employee excels at?', type: 'text' },
  {
    label: 'Likelihood to participate in activities (next 30 days)?',
    type: 'multiple',
    options: ['Daily', 'Weekly', 'Monthly']
  }
]

const stepTwoQuestions = [
  { label: 'Direct Supervisor Name', type: 'text' },
  { label: 'Department Name', type: 'text' },
  { label: 'Tasks or Projects Assigned', type: 'text' },
  { label: 'Employee Nationality', type: 'text' },
  {
    label: 'Employee Gender',
    type: 'dropdown',
    options: ['Male', 'Female', 'Prefer not to say']
  },
  {
    label: 'Employee Age Range',
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
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}

const selectOption = (index, option) => {
  stepOneAnswers.value[index] = option
}
</script>


<style scoped>
h2 {
  color: #f26822;
  margin: 13px;
  text-align: center;
}

.full-width-btn {
  width: 100%;
  max-width: 660px;
  padding: 1rem;
  background-color: #f26822;
  color: white;
  text-align: center;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 2rem auto;
}

.full-width-btn:hover {
  background-color: #f26822;
}

.survey {
  padding: 1rem;
  max-width: 700px;
  margin: auto;
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.question {
  margin-bottom: 1.2rem;
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.4rem;
  color: #f26822;
}

input,
select {
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #f26822;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f26822;
}

.message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.message {
  padding: 1rem;
  background-color: #f26822;
  color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.5s ease;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.6rem;
  justify-content: center;
}

.option-button {
  flex: 1 1 120px;
  min-width: 100px;
  padding: 0.8rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
}

.option-button:hover,
.option-button.selected {
  background-color: #f26822;
  color: white;
  border-color: #f26822;
}

.rating-scale {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
}

.rating-button {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #f0f0f0;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-button:hover {
  background-color: #e0e0e0;
}

.rating-button.selected {
  background-color: #f26822;
  color: white;
  border-color: #f26822;
}
.text-highlighted {
  border-color: #f26822 !important;
}

.question.text-answered {
  border-left: 4px solid #f26822;
}


.question.answered {
  border-left: 4px solid #f26822;
  background-color: #fffaf5;
}

.hidden-radio {
  display: none;
}

@media (max-width: 768px) {
  .full-width-btn {
    width: 90%;
  }

  .button-group {
    flex-direction: column;
  }

  .option-button {
    flex: 1 1 100%;
  }

  .rating-button {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>

