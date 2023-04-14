<template>
  <div>
    <multiselect v-model="value" :options="options"></multiselect>
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import Multiselect from 'vue-multiselect'

  const value: Ref<string[]> = ref([])
  const options: Ref<string[]> = ref(['list', 'of', 'options']) 

</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
  
</style>
