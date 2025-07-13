<template>
  <div>
    <input type="text" v-model="employeeCode" placeholder="Search by employee code" />
    <input type="text" v-model="storeCode" placeholder="Search by store code" />
    <select v-model="bonusRecommendation">
      <option value="">Bonus Recommendation</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    <select v-model="evaluationLevel">
      <option value="">Evaluation Level</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button @click="applyFilter">Apply Filters</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeCode: '',
      storeCode: '',
      bonusRecommendation: null,
      evaluationLevel: ''
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter', {
        employeeCode: this.employeeCode,
        storeCode: this.storeCode,
        bonusRecommendation: this.bonusRecommendation,
        evaluationLevel: this.evaluationLevel
      });
    }
  }
};
</script>
