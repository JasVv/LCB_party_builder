<script setup lang="ts">
import { ref } from 'vue'

const character = ref([])
const skill = ref([])

let data = ref({
  character: [],
  skill: [],
})

function recalculate() {
  data.value = {
    character: character,
    skill: skill,
  }
}
</script>

<template>
  <div>
  	<input type="checkbox" v-model="character" value="1" v-on:change="recalculate()" />1
    <input type="checkbox" v-model="character" value="2" v-on:change="recalculate()" />2
    <input type="checkbox" v-model="character" value="3" v-on:change="recalculate()" />3
  </div>
  
  <div>
  	<input type="checkbox" v-model="skill" value="4" v-on:change="recalculate()" />4
    <input type="checkbox" v-model="skill" value="5" v-on:change="recalculate()" />5
    <input type="checkbox" v-model="skill" value="6" v-on:change="recalculate()" />6
  </div>
  
  <label>{{ data }}</label>
</template>
