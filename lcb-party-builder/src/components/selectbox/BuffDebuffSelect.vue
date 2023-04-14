<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import Multiselect from '@vueform/multiselect'

defineProps<{
  all_buff_debuff: string[]
}>()

const buff_debuff: Ref<string[]> = ref([])

const emit = defineEmits(['setBuffDebuffValue']);

const emitEvent = () => {
  emit('setBuffDebuffValue', buff_debuff.value);
}

watch(buff_debuff, emitEvent)

</script>

<template>
  <div class="mb-4 mr-4">
    <h4 class="mb-1 font-semibold">
      バフ・デバフ
    </h4>
    <div class="pl-3">
      <Multiselect
        v-model="buff_debuff"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :options="all_buff_debuff"
        :classes="{
          container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-gray-700 text-base leading-snug outline-none',
          wrapper: 'multiselect-wrapper overflow-y-scroll max-h-20',
          tag: 'bg-green-600 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap rtl:pl-0 rtl:pr-2 rtl:mr-0 rtl:ml-1',
          tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border bg-gray-700 w-full',
          option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3 bg-gray-700',
          optionPointed: 'text-gray-100 bg-gray-600',
        }"
      />
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
