<script setup lang="ts">
import { ref, type Ref } from 'vue'

defineProps<{
    all_buff_debuff: string[]
}>()

const buff_debuff: Ref<string[]> = ref([])

const emit = defineEmits(['setBuffDebuffValue']);

const emitEvent = () => {
    emit('setBuffDebuffValue', buff_debuff.value);
}
</script>

<template>
  <div class="mb-4">
    <h4 class="mb-1 font-semibold">
      バフ・デバフ
    </h4>
    <div class="pl-3">
      <div class="flex flex-wrap">
        <div v-for="b in all_buff_debuff" :key="b">
          <input type="checkbox" :id="'checkbox_buff_debuff' + b"  class="checkbox_normal" v-model="buff_debuff" :value="b" v-on:change="emitEvent" /><label :for="'checkbox_buff_debuff' + b" class="label_checkbox mr-2">{{ b }}</label>
        </div>
      </div>
    </div>
    </div>
</template>
