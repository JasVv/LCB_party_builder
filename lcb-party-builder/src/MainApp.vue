<script setup lang="ts">
import { ref } from 'vue'
import type { Personality } from './components/Parsonality.vue'
import type { Character } from './components/Character.vue'
import CharacterSelect from './components/selectbox/CharacterSelect.vue'
import ResistanceSelect from './components/selectbox/ResistanceSelect.vue'
import SkillPhysicsSelect from './components/selectbox/SkillPhysicsSelect.vue'
import SkillSinSelect from './components/selectbox/SkillSinSelect.vue'
import BuffDebuffSelect from './components/selectbox/BuffDebuffSelect.vue'
import SearchTableBody from './components/table/SearchTableBody.vue'
import SelectedPersonalities from './components/SelectedPersonalities.vue'

import { all_data } from './components/javascript/all_data'

export interface View {
  character: Character;
  personality: Personality;
}

const all_buff_debuff: string[] = Array.from(new Set(all_data.personality.flatMap(p => 
  [...p.skill.flatMap(v => v.buff_debuff), ...p.defence.buff_debuff, ...p.passive.buff_debuff, ...p.support_passive.buff_debuff]
))).sort()

let character: number[] = []
let resistance: string[] = []
let skill_physics: string[] = []
let skill_sin: string[] = []
let buff_debuff: string[] = []

const data = ref<{
  view: View[]
}>({
  view: []
})

data.value.view = all_data.personality
  .map(p => {
    const view: View = {
      character: all_data.character.find(c => c.character_id === p.character_id)!,
      personality: p,
    }
    return view
  })

const setCharacterValue = (value: number[]) => {
  character = value;
  recalculate();
}

const setResistanceValue = (value: string[]) => {
  resistance = value;
  recalculate();
}

const setSkillPhysicsValue = (value: string[]) => {
  skill_physics = value;
  recalculate();
}

const setSkillSinValue = (value: string[]) => {
  skill_sin = value;
  recalculate();
}

const setBuffDebuffValue = (value: string[]) => {
  buff_debuff = value;
  recalculate();
}

const recalculate = () => {

  // キャラクター選択
  const charactor_select = (character.length ? all_data.personality.filter(p => character.some(v => v == p.character_id)) : all_data.personality).map(p => p.personality_id)

  // 物理耐性選択
  const resistance_select = (resistance.length 
  ? all_data.personality.filter(p => {
    const sl = resistance.some(v => v == "slashing") ? p.resistance.slashing < 1 : false
    const pe = resistance.some(v => v == "penetration") ? p.resistance.penetration < 1 : false
    const bl = resistance.some(v => v == "blow") ? p.resistance.blow < 1 : false
    return sl || pe || bl
  }) 
  : all_data.personality).map(p => p.personality_id)

  // スキル物理属性選択
  const skill_physics_select = (skill_physics.length 
  ? all_data.personality.filter(p => p.skill.find(s => skill_physics.some(v => v == s.physics))) 
  : all_data.personality).map(p => p.personality_id)

  // スキル罪悪属性選択
  const skill_sin_select = (skill_sin.length 
  ? all_data.personality.filter(p => p.skill.find(s => skill_sin.some(v => v == s.sin))) 
  : all_data.personality).map(p => p.personality_id)

  // バフ・デバフ選択
  const buff_debuff_select = (buff_debuff.length 
    ? all_data.personality.filter(p => {
      const skill_buff_debuff = p.skill.find(s => s.buff_debuff.filter(b => buff_debuff.some(v => v == b)).length)
      const defence_buff_debuff = p.defence.buff_debuff.find(b => buff_debuff.some(v => v == b))
      const passive_buff_debuff = p.passive.buff_debuff.find(b => buff_debuff.some(v => v == b))
      const support_passive_buff_debuff = p.support_passive.buff_debuff.find(b => buff_debuff.some(v => v == b))
      
      return skill_buff_debuff || defence_buff_debuff || passive_buff_debuff || support_passive_buff_debuff
    }) 
    : all_data.personality
  ).map(p => p.personality_id)

  const target_personality = charactor_select.filter(value => 
    resistance_select.includes(value) && 
    skill_physics_select.includes(value) && 
    skill_sin_select.includes(value) && 
    buff_debuff_select.includes(value)
  )

  data.value.view = all_data.personality
    .filter(p => target_personality.includes(p.personality_id))
    .map(p => {
      const view: View = {
        character: all_data.character.find(c => c.character_id === p.character_id)!,
        personality: p,
      }
      return view
    })
    .sort((a, b) => {
      if (a.personality.personality_id < b.personality.personality_id) {
        return -1
      } else if (a.personality.personality_id > b.personality.personality_id) {
        return 1
      } else {
        return 0
      }
    })

}


</script>

<template>
  <div>
    <div class="grid grid-cols-[1fr_1fr] grid-rows-[50px_1fr] gap-4">
      <div class="col-span-2 sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800">
        <span class="self-center text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white">
          LCB Party Builder
        </span>
      </div>

      <div class="">
        <SelectedPersonalities />
      </div>

      <div class="">
        <details class="ml-3">
          <summary>
            <span class="ml-1">絞り込み</span>
          </summary>
          <CharacterSelect @setCharacterValue="setCharacterValue"/>
          <ResistanceSelect @setResistanceValue="setResistanceValue"/>
          <SkillPhysicsSelect @setSkillPhysicsValue="setSkillPhysicsValue"/>
          <SkillSinSelect @setSkillSinValue="setSkillSinValue"/>
          <BuffDebuffSelect :all_buff_debuff="all_buff_debuff" @setBuffDebuffValue="setBuffDebuffValue"/>
        </details>
        <div class="mt-3 max-h-full overflow-y-scroll">
          <div class="pr-2">
            <table class="">
              <thead class="text-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-100 sticky top-0">
                <tr class="">
                  <th class="w-80 py-1.5 sticky top-0">人格</th> 
                  <th class="w-28 py-1.5 sticky top-0">スキル1</th> 
                  <th class="w-28 py-1.5 sticky top-0">スキル2</th> 
                  <th class="w-28 py-1.5 sticky top-0">スキル3</th> 
                  <th class="w-14 py-1.5 sticky top-0">斬耐</th> 
                  <th class="w-14 py-1.5 sticky top-0">貫耐</th> 
                  <th class="w-14 py-1.5 sticky top-0">打耐</th> 
                  <th class="w-16 py-1.5 sticky top-0">速度</th>
                </tr>
              </thead>

              <tbody class="text-sm font-medium dark:text-gray-300">
                <template v-for="(v, idx) in data.view" :key="v.personality.personality_id">
                  <SearchTableBody :v = "v" :idx = "idx" />
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
