<script setup lang="ts">
import { ref, type Ref } from 'vue'

const resistance: Ref<string[]> = ref([])

const emit = defineEmits(['setResistanceValue']);

const emitEvent = () => {
    emit('setResistanceValue', resistance.value);
}
</script>

<template>
    <div class="mb-4">
        <h4 class="mb-1 font-semibold">
          耐性
        </h4>
        <div class="pl-3">
          <div class="flex">
            <input type="checkbox" id="checkbox_resistance_slashing" class="checkbox_normal" v-model="resistance" value="slashing" v-on:change="emitEvent" /><label for="checkbox_resistance_slashing" class="label_checkbox w-12">斬撃</label>
            <input type="checkbox" id="checkbox_resistance_penetration" class="checkbox_normal" v-model="resistance" value="penetration" v-on:change="emitEvent" /><label for="checkbox_resistance_penetration" class="label_checkbox w-12">貫通</label>
            <input type="checkbox" id="checkbox_resistance_blow" class="checkbox_normal" v-model="resistance" value="blow" v-on:change="emitEvent" /><label for="checkbox_resistance_blow" class="label_checkbox w-12">打撃</label>
          </div>
        </div>
      </div>
</template>
