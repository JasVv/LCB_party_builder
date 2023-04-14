<script setup lang="ts">
import type { View } from '../../MainApp.vue'
import { selectSinColorCss } from '../javascript/select_sin_color'

defineProps<{
  v: View,
}>()
</script>

<template>
  <td class="dark:text-gray-100 py-1.5">【{{ v.personality.name }}】{{ v.character.name }}</td> 
  <td :class="selectSinColorCss(v.personality.skill[0]?.sin)" class="text-center py-1.5">
      {{ v.personality.skill[0] ? `${v.personality.skill[0].physics}${v.personality.skill[0].base_attack + (v.personality.skill[0].coin_attack * v.personality.skill[0].coin_number)} (${v.personality.skill[0].base_attack}, ${v.personality.skill[0].coin_attack >= 0 ? `+${v.personality.skill[0].coin_attack}` : v.personality.skill[0].coin_attack} * ${v.personality.skill[0].coin_number})` : ""  }}
  </td> 
  <td :class="selectSinColorCss(v.personality.skill[1]?.sin)" class="text-center py-1.5">
      {{ v.personality.skill[1] ? `${v.personality.skill[1].physics}${v.personality.skill[1].base_attack + (v.personality.skill[1].coin_attack * v.personality.skill[1].coin_number)} (${v.personality.skill[1].base_attack}, ${v.personality.skill[1].coin_attack >= 0 ? `+${v.personality.skill[1].coin_attack}` : v.personality.skill[1].coin_attack} * ${v.personality.skill[1].coin_number})` : ""  }}
  </td> 
  <td :class="selectSinColorCss(v.personality.skill[2]?.sin)" class="text-center py-1.5">
      {{ v.personality.skill[2] ? `${v.personality.skill[2].physics}${v.personality.skill[2].base_attack + (v.personality.skill[2].coin_attack * v.personality.skill[2].coin_number)} (${v.personality.skill[2].base_attack}, ${v.personality.skill[2].coin_attack >= 0 ? `+${v.personality.skill[2].coin_attack}` : v.personality.skill[2].coin_attack} * ${v.personality.skill[2].coin_number})` : ""  }}
  </td> 
  <td class="text-center py-1.5">{{ v.personality.resistance.slashing }}</td>
  <td class="text-center py-1.5">{{ v.personality.resistance.penetration }}</td> 
  <td class="text-center py-1.5">{{ v.personality.resistance.blow }}</td> 
  <td class="text-center py-1.5">{{ v.personality.speed_min }} ~ {{ v.personality.speed_max }}</td> 
</template>
