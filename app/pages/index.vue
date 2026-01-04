<template>
    <div>
        <v-alert type="success">I'm a success alert.</v-alert>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/en')
    }
  ],
});
</script>