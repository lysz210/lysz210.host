<template>
    <div>
        <v-alert type="success">I'm a success alert.</v-alert>
    </div>
</template>
<script setup lang="ts">
const localPath = useLocalePath()
await navigateTo(localPath('education'))

</script>