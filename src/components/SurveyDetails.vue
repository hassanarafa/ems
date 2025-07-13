<template>
  <div>
    <h2>Survey Report for {{ surveyData.employeeName }}</h2>
    <div v-for="(question, index) in surveyData.questions" :key="index">
      <p>{{ question.text }}</p>
      <p>Answer: {{ question.answer }}</p>
      <p>Score: {{ question.score }}</p>
    </div>
    <div>
      <h3>Comments</h3>
      <p>{{ surveyData.comments }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      surveyData: {
        employeeName: 'John Doe',
        questions: [
          { text: 'How do you rate your performance?', answer: 'Good', score: 4 },
          { text: 'Was the training effective?', answer: 'Yes', score: 5 }
        ],
        comments: 'Great performance this quarter!'
      }
    };
  }
};
</script>
