<script setup lang="ts">
import { ref, type Ref } from 'vue'

const resistance: Ref<string[]> = ref([])

const emit = defineEmits(['setResistanceValue']);

const emitEvent = () => {
    emit('setResistanceValue', resistance.value);
}
</script>

<template>
    <div class="search_contents">
        <h4>
          耐性
        </h4>
        <div class="search_checkbox">
          <div class="resistance_select">
            <input type="checkbox" v-model="resistance" value="slashing" v-on:change="emitEvent" /><label>斬撃</label>
            <input type="checkbox" v-model="resistance" value="penetration" v-on:change="emitEvent" /><label>貫通</label>
            <input type="checkbox" v-model="resistance" value="blow" v-on:change="emitEvent" /><label>打撃</label>
          </div>
        </div>
      </div>
</template>
