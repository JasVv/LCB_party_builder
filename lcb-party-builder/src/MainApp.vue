<script setup lang="ts">
import { ref, type Ref } from 'vue'
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

const showTab: Ref<string> = ref('1')

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
      <div class="col-span-2 sticky top-0 z-40 flex-none w-full mx-auto bg-white border-b dark:border-gray-600 dark:bg-gray-800">
        <span class="self-center text-2xl font-semibold text-gray-900 whitespace-nowrap dark:text-white">
          LCB Party Builder
        </span>
      </div>

      <div class="">
        <SelectedPersonalities />
      </div>

      <div class="">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 pb-4">
          <li class="mr-2">
              <button 
                class="inline-block px-4 py-3 rounded-lg" 
                :class="showTab == '1' ? 'text-white bg-blue-500 active' : 'dark:hover:bg-gray-800 dark:hover:text-white'"
                @click="showTab = '1'"
              >
                人格
              </button>
          </li>
          <li class="mr-2">
              <button 
                class="inline-block px-4 py-3 rounded-lg" 
                :class="showTab == '2' ? 'text-white bg-blue-500 active' : 'dark:hover:bg-gray-800 dark:hover:text-white'"
                @click="showTab = '2'" 
              >
                E.G.O
              </button>
          </li>
        </ul>
        <div class="tabcontent">
          <div class="tabcontent-list" :class="showTab != '1' ? 'hidden' : ''">
            <div id="accordion-flush" data-accordion="collapse" data-active-classes="dark:text-white" data-inactive-classes="dark:text-gray-300">
              <h3 id="accordion-flush-heading-1">
                <button type="button" class="flex items-center justify-between w-11/12 py-1 font-medium text-left border-b dark:border-gray-700" data-accordion-target="#accordion-flush-body-1" aria-expanded="false" aria-controls="accordion-flush-body-1">
                  <span>絞り込み</span>
                  <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </h3>
              <div id="accordion-flush-body-1" class="hidden mt-2" aria-labelledby="accordion-flush-heading-1">
                <CharacterSelect @setCharacterValue="setCharacterValue"/>
                <ResistanceSelect @setResistanceValue="setResistanceValue"/>
                <SkillPhysicsSelect @setSkillPhysicsValue="setSkillPhysicsValue"/>
                <SkillSinSelect @setSkillSinValue="setSkillSinValue"/>
                <BuffDebuffSelect :all_buff_debuff="all_buff_debuff" @setBuffDebuffValue="setBuffDebuffValue"/>
              </div>
            </div>
          
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
          <div class="tabcontent-list" :class="showTab != '2' ? 'hidden' : ''">
            EGO
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
