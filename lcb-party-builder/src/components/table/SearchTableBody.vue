<script setup lang="ts">
import type { View } from '../../MainApp.vue'
import BasicInfo from './BasicInfo.vue'
import Passive from './Passive.vue'
import SupportPassive from './SupportPassive.vue'
import DetailInfo from './DetailInfo.vue'

defineProps<{
  v: View,
  idx: number,
}>()
</script>

<template>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
    <BasicInfo :v = "v" />
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
    <Passive :v = "v" />
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
    <SupportPassive :v = "v" />
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
    <DetailInfo :v = "v" />
  </tr>
</template>
