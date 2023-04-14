<script setup lang="ts">
import type { View } from '../../MainApp.vue'
import { selectSinColorCss } from '../javascript/select_sin_color'

defineProps<{
  v: View,
}>()
</script>

<template>
  <td colspan=8 class="py-1.5 border-b">
    <details class="ml-3">
      <summary>
        <span class="ml-3">スキル詳細</span>
      </summary>
      <div class="ml-3">
        {{ v.personality.skill[0].name }}
        <label td :class="selectSinColorCss(v.personality.skill[0].sin)">
          {{ 
            `${v.personality.skill[0].physics}${v.personality.skill[0].base_attack + (v.personality.skill[0].coin_attack * v.personality.skill[0].coin_number)} 
              (${v.personality.skill[0].base_attack}, 
                ${v.personality.skill[0].coin_attack >= 0 ? `+${v.personality.skill[0].coin_attack}` : v.personality.skill[0].coin_attack} * ${v.personality.skill[0].coin_number})` 
          }}
        </label>
        <label>
        {{ 
            `
            ${ v.personality.skill[0].text } \n
            B \n
            C
            ` 
        }}
        
        </label>
        <label v-for="(coin_effect, idx) in v.personality.skill[0].coin_effect" :key="idx">
        {{ coin_effect.number }} {{ coin_effect.text }}
        </label>
      </div>
    </details>
  </td>
</template>
