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
        <dl>
          <template v-for="(skill, i) in v.personality.skill" :key="i">
            <dt class="mt-2">
              {{ skill.name }} 
              <span :class="selectSinColorCss(skill.sin)" class="ml-3">
                {{ 
                  `${skill.physics}${skill.base_attack + (skill.coin_attack * skill.coin_number)} 
                    (${skill.base_attack}, 
                      ${skill.coin_attack >= 0 ? `+${skill.coin_attack}` : skill.coin_attack} * ${skill.coin_number})` 
                }}
              </span>
            </dt>
            <dd class="ml-3">{{ skill.text }}</dd>
            <dd v-for="(coin_effect, idx) in skill.coin_effect" :key="idx" class="whitespace-pre-wrap ml-3">
              {{ coin_effect.number }} {{ coin_effect.text }}
            </dd>
          </template>
        </dl>
      </div>
    </details>
  </td>
</template>
