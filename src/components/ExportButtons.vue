<template>
  <div>
    <button @click="exportAsPDF">Export as PDF</button>
    <button @click="exportAsExcel">Export as Excel</button>
  </div>
</template>

<script>
export default {
  methods: {
    exportAsPDF() {
      // Logic to export data as PDF
      alert('Exporting as PDF');
    },
    exportAsExcel() {
      // Logic to export data as Excel
      alert('Exporting as Excel');
    }
  }
};
</script>
