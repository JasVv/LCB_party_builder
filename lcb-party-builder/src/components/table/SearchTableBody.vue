<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { View } from '../../MainApp.vue'
import { selectSinColorCss } from '../javascript/select_sin_color'

defineProps<{
    v: View,
    idx: number,
}>()
</script>

<template>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
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
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
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
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
    <td class="py-1.5">
      <span class="ml-3">サポート</span>
      
      <template v-for="(trigger, idx) in v.personality.support_passive.trigger" :key="idx">
        <span class="ml-3">
          {{ `${trigger.active_type} ` }}
        </span>
        <label td :class="selectSinColorCss(trigger.sin)" class="ml-2">
          {{ `${trigger.number}` }}
        </label>
      </template>
    </td>
    <td colspan=7 class="py-1.5">
        {{ v.personality.support_passive.text }}
    </td>
  </tr>
  <tr :class="idx % 2 == 0 ? 'border-b dark:bg-gray-900 dark:border-gray-600' : 'border-b dark:bg-gray-800 dark:border-gray-600' ">
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
  </tr>
</template>
