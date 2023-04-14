<script setup lang="ts">
import type { View } from '../../MainApp.vue'
import { selectSinColorCss } from '../javascript/select_sin_color'

defineProps<{
  v: View,
}>()
</script>

<template>
  <td class="py-1.5">
    <span class="ml-3">パッシブ</span>
    <template v-for="(trigger, idx) in v.personality.passive.trigger" :key="idx">
      <span class="ml-3">
        {{ `${trigger.active_type} ` }}
      </span>
      <label td :class="selectSinColorCss(trigger.sin)" class="ml-2">
        {{ `${trigger.number} ` }}
      </label>
    </template>
  </td>
  <td colspan=7 class="py-1.5">
      {{ v.personality.passive.text }}
  </td>
</template>
