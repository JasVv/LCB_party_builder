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
    <div class="search_contents">
        <h4>
          バフ・デバフ
        </h4>
        <div class="search_checkbox">
          <div class="buff_debuff_select">
            <div v-for="b in all_buff_debuff" :key="b">
              <input type="checkbox" v-model="buff_debuff" :value="b" v-on:change="emitEvent" /><label>{{ b }}</label>
            </div>
          </div>
        </div>
      </div>
</template>
