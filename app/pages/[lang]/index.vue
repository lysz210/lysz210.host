<template>
  <v-layout full-height>
    <v-card class="h-100 w-100">
      <iframe style="width: 100%; height: 100%" ref="externalWindow" :src="src" frameborder="0"></iframe>
      <v-btn :href="pdfSrc" target="_blank" icon="fas fa-print" dark color="green" position="absolute" elevation="12"
        class="print-btn"></v-btn>
    </v-card>
  </v-layout>
</template>
<style>
.print-btn {
  bottom: 16px;
  right: 32px;
}
</style>
  
<script>
export default {
  data() {
    const {
      public: {
        cvBasePath,
        cvPdf
      }
    } = useRuntimeConfig()
    return {
      fab: false,
      cv: {
        basePath: cvBasePath,
        pdf: cvPdf
      }
    };
  },
  computed: {
    lang() {
      console.log(this)
      return this.$route?.params?.lang || 'en'
    },
    src() {
      return `${this.cv.basePath}/${this.lang}`
    },
    pdfSrc() {
      return `https://lysz210.github.io/profile/i18n/${this.lang}/cv.pdf`
    }
  }
};
</script>
  