<template>
  <div class="survey">
    <h2>Surveys</h2>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <!-- List of surveys -->
    <div v-if="!isSurveySelected && surveys.length">
      <div
          v-for="survey in surveys"
          :key="survey.id"
          class="survey-item"
          @click="fetchSurveyQuestions(survey.id)"
      >
        <h3>{{ survey.title }}</h3>
        <p>{{ survey.description }}</p>
      </div>
    </div>

    <!-- Survey Questions -->
    <div v-if="isSurveySelected && survey.questions.length" class="survey-form">
      <h2>{{ survey.title }}</h2>
      <p>{{ survey.description }}</p>

      <div
          v-for="question in survey.questions"
          :key="question.id"
          class="question"
          :class="{ submitted: submittedQuestions.includes(question.id) }"
      >
        <label :for="'question-' + question.id">{{ question.question_text }}</label>

        <!-- Text Input -->
        <div v-if="question.question_type === 'text'">
          <input
              v-model="answers[question.id]"
              :id="'question-' + question.id"
              type="text"
              placeholder="Your answer"
          />
        </div>

        <!-- Rating Input -->
        <div v-if="question.question_type === 'rating'">
          <div class="rating-scale">
            <button
                v-for="n in 10"
                :key="n"
                :class="['rating-button', { active: answers[question.id] === n }]"
                @click="toggleRating(question.id, n)"
                type="button"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <!-- Multiple Choice Input -->
        <div v-if="question.question_type === 'multiple_choice' && question.answers.length">
          <div class="options horizontal">
            <div
                v-for="option in question.answers"
                :key="option.id"
                :class="['option', { selected: answers[question.id] === option.answer }]"
                @click="selectChoice(question.id, option.answer)"
            >
              <span>{{ option.answer }}</span>
            </div>
          </div>
        </div>

        <!-- Dropdown Input -->
        <div v-if="question.question_type === 'dropdown' && question.answers.length">
          <select v-model="answers[question.id]" :id="'question-' + question.id">
            <option
                v-for="option in question.answers"
                :key="option.id"
                :value="option.answer"
            >
              {{ option.answer }}
            </option>
          </select>
        </div>

        <!-- Fallback if no options -->
        <div
            v-if="(question.question_type === 'multiple_choice' || question.question_type === 'dropdown') && !question.answers.length"
            class="no-options"
        >
          <em>No options available for this question.</em>
        </div>
      </div>

      <form @submit.prevent="submitSurvey">
        <div class="full-width-btn">
          <button type="submit">Submit Survey</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      surveys: [],
      survey: {
        id: null,
        title: "",
        description: "",
        questions: [],
      },
      answers: {},
      submittedQuestions: [],
      isSurveySelected: false,
      successMessage: "",
      user_id: 5, // Example user ID
      store_id: 1, // Example store ID
      customer_name: "John Doe", // Example customer name
      customer_phone: "0123456789", // Example customer phone number
    };
  },
  mounted() {
    this.fetchSurveys();
  },
  methods: {
    async fetchSurveys() {
      try {
        const response = await fetch("https://survey.dd-ops.com/api/get_surveys");
        const data = await response.json();
        this.surveys = data;
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    },
    async fetchSurveyQuestions(surveyId) {
      try {
        const response = await fetch(`https://survey.dd-ops.com/api/survey/${surveyId}`);
        const data = await response.json();
        this.survey = data;
        this.answers = {};
        this.submittedQuestions = [];
        this.isSurveySelected = true;
      } catch (error) {
        console.error("Error fetching survey questions:", error);
      }
    },
    toggleRating(questionId, rating) {
      this.answers[questionId] = this.answers[questionId] === rating ? null : rating;
    },
    selectChoice(questionId, choice) {
      this.answers[questionId] = this.answers[questionId] === choice ? null : choice;
    },
    async submitSurvey() {
      const answersArray = Object.keys(this.answers).map(id => ({
        question_id: Number(id),
        answer: this.answers[id],
      }));

      const requestBody = {
        survey_id: this.survey.id,
        user_id: this.user_id,
        store_id: this.store_id,
        customer_name: this.customer_name,
        customer_phone: this.customer_phone,
        answers: answersArray,
      };

      try {
        const response = await fetch("https://survey.dd-ops.com/api/store_submissions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          this.successMessage = "Survey submitted successfully!";
          this.submittedQuestions = Object.keys(this.answers).map(id => Number(id));
        } else {
          console.error("Error submitting survey:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting survey:", error);
      }
    },
  },
};
</script>

<style scoped>
/* (Same CSS you wrote — no changes needed) */
.survey {
  padding: 1rem;
  max-width: 700px;
  margin: 15px auto;
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  color: #f26822;
  margin: 13px;
  text-align: center;
}

.survey-item {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.survey-item:hover {
  background-color: #f8f8f8;
}

.question {
  margin-bottom: 1.2rem;
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
}

.question.submitted {
  border: 2px solid #4caf50;
  background-color: #f0fff4;
  position: relative;
}

.question.submitted::after {
  content: "✔ Submitted";
  position: absolute;
  top: 8px;
  right: 10px;
  background: #4caf50;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 4px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.4rem;
  color: #f26822;
}

input[type="text"],
select {
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.rating-scale {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  justify-content: center;
}

.success-message {
  text-align: center;
  color: #4caf50;
  background-color: #f0fff4;
  padding: 1rem;
  border: 1px solid #4caf50;
  border-radius: 8px;
  margin: 1rem 0;
}

.rating-button {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #f26822;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
}

.rating-button.active {
  background-color: #f26822;
  color: white;
}

.rating-button:focus {
  border-color: #f26822;
}

.options.horizontal {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.option {
  flex: 1 1 auto;
  min-width: 100px;
  padding: 0.6rem;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  text-align: center;
}

.option span {
  font-size: 1rem;
  display: block;
}

.option.selected {
  background-color: #f26822;
  color: white;
}

.option:hover {
  background-color: #f26822;
  transform: scale(1.05);
  color: white;
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

.full-width-btn button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}

.full-width-btn button:hover {
  background-color: #f26822;
}

.no-options {
  font-style: italic;
  color: #999;
  padding-top: 0.5rem;
}

@media (max-width: 768px) {
  .full-width-btn {
    width: 90%;
  }
  .rating-button {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .option {
    flex: 1 1 45%;
  }
}
</style>
