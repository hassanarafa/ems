<template>
  <div>
    <SurveyFilter @filter="applyFilters" />
    <table>
      <thead>
      <tr>
        <th>Employee Name</th>
        <th>Overall Evaluation Score</th>
        <th>Bonus Recommendation</th>
        <th>Submission Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(response, index) in filteredResponses" :key="index" @click="viewDetails(response)">
        <td>{{ response.employeeName }}</td>
        <td>{{ response.evaluationScore }}</td>
        <td>{{ response.bonusRecommendation ? 'Yes' : 'No' }}</td>
        <td>{{ response.submissionDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SurveyFilter from './SurveyFilter.vue';
import { mapState } from 'vuex';

export default {
  components: {
    SurveyFilter
  },
  data() {
    return {
      responses: [
        { employeeName: 'John Doe', evaluationScore: 85, bonusRecommendation: true, submissionDate: '2025-04-20' },
        // Add more sample data
      ],
      filters: {
        employeeCode: '',
        storeCode: '',
        bonusRecommendation: null,
        evaluationLevel: ''
      }
    };
  },
  computed: {
    filteredResponses() {
      return this.responses.filter(response => {
        return (
            (!this.filters.employeeCode || response.employeeCode.includes(this.filters.employeeCode)) &&
            (!this.filters.storeCode || response.storeCode.includes(this.filters.storeCode)) &&
            (this.filters.bonusRecommendation === null || response.bonusRecommendation === this.filters.bonusRecommendation) &&
            (!this.filters.evaluationLevel || response.evaluationLevel === this.filters.evaluationLevel)
        );
      });
    }
  },
  methods: {
    applyFilters(filters) {
      this.filters = filters;
    },
    viewDetails(response) {
      this.$router.push({ name: 'surveyDetails', params: { id: response.id } });
    }
  }
};
</script>
