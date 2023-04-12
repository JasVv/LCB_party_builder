<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { Personality } from './components/Parsonality.vue'
import type { Character } from './components/Character.vue'
import CharacterSelect from './components/selectbox/CharacterSelect.vue'
import ResistanceSelect from './components/selectbox/ResistanceSelect.vue'
import SkillSinSelect from './components/selectbox/SkillSinSelect.vue'
import BuffDebuffSelect from './components/selectbox/BuffDebuffSelect.vue'
import { all_data } from './components/javascript/all_data'

interface View {
  character: Character;
  personality: Personality;
}

const all_buff_debuff: string[] = Array.from(new Set(all_data.personality.flatMap(p => 
  [...p.skill.flatMap(v => v.buff_debuff), ...p.defence.buff_debuff, ...p.passive.buff_debuff, ...p.support_passive.buff_debuff]
))).sort()

let character: number[] = []
let resistance: string[] = []
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

function setCharacterValue(value: number[]) {
  character = value;
  recalculate();
}

function setResistanceValue(value: string[]) {
  resistance = value;
  recalculate();
}

function setSkillSinValue(value: string[]) {
  skill_sin = value;
  recalculate();
}

function setBuffDebuffValue(value: string[]) {
  buff_debuff = value;
  recalculate();
}

function recalculate() {

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

function selectSinColorCss(sin: string) {
  return sin == "憤怒" ? "font_color_wrath" : 
  sin == "色欲" ? "font_color_lust" :
  sin == "怠惰" ? "font_color_sloth" :
  sin == "暴食" ? "font_color_gluttony" :
  sin == "憂鬱" ? "font_color_gloom" :
  sin == "傲慢" ? "font_color_pride" : 
  sin == "嫉妬" ? "font_color_envy" : ""
} 
</script>

<template>

  <div class="container">
    <div class="title">LCB Party Builder</div>

    <div class="selected">
      
    </div>

    <div class="search">
      <CharacterSelect @setCharacterValue="setCharacterValue"/>
      <ResistanceSelect @setResistanceValue="setResistanceValue"/>
      <SkillSinSelect @setSkillSinValue="setSkillSinValue"/>
      <BuffDebuffSelect :all_buff_debuff="all_buff_debuff" @setBuffDebuffValue="setBuffDebuffValue"/>
    </div>

    <div class="result">

      <table class="personality_table">

        <tr>
          <th></th>
          <th colspan="2" class="name_width">人格</th> 
          <th class="skill_width">スキル1</th> 
          <th class="skill_width">スキル2</th> 
          <th class="skill_width">スキル3</th> 
          <th class="resistance_width">斬耐</th> 
          <th class="resistance_width">貫耐</th> 
          <th class="resistance_width">打耐</th> 
          <th class="speed_width">速度</th>
        </tr>

        <template v-for="v in data.view" :key="v.personality.personality_id">
          <tr>
            <td rowspan="4">

            </td>
            <td colspan="2">【{{ v.personality.name }}】{{ v.character.name }}</td> 
            <td :class="selectSinColorCss(v.personality.skill[0]?.sin)">
              {{ v.personality.skill[0] ? `${v.personality.skill[0].physics}${v.personality.skill[0].base_attack + (v.personality.skill[0].coin_attack * v.personality.skill[0].coin_number)} (${v.personality.skill[0].base_attack}, ${v.personality.skill[0].coin_attack >= 0 ? `+${v.personality.skill[0].coin_attack}` : v.personality.skill[0].coin_attack} * ${v.personality.skill[0].coin_number})` : ""  }}
            </td> 
            <td :class="selectSinColorCss(v.personality.skill[1]?.sin)">
              {{ v.personality.skill[1] ? `${v.personality.skill[1].physics}${v.personality.skill[1].base_attack + (v.personality.skill[1].coin_attack * v.personality.skill[1].coin_number)} (${v.personality.skill[1].base_attack}, ${v.personality.skill[1].coin_attack >= 0 ? `+${v.personality.skill[1].coin_attack}` : v.personality.skill[1].coin_attack} * ${v.personality.skill[1].coin_number})` : ""  }}
            </td> 
            <td :class="selectSinColorCss(v.personality.skill[2]?.sin)">
              {{ v.personality.skill[2] ? `${v.personality.skill[2].physics}${v.personality.skill[2].base_attack + (v.personality.skill[2].coin_attack * v.personality.skill[2].coin_number)} (${v.personality.skill[2].base_attack}, ${v.personality.skill[2].coin_attack >= 0 ? `+${v.personality.skill[2].coin_attack}` : v.personality.skill[2].coin_attack} * ${v.personality.skill[2].coin_number})` : ""  }}
            </td> 
            <td>{{ v.personality.resistance.slashing }}</td>
            <td>{{ v.personality.resistance.penetration }}</td> 
            <td>{{ v.personality.resistance.blow }}</td> 
            <td>{{ v.personality.speed_min }} ~ {{ v.personality.speed_max }}</td> 
          </tr>
          <tr>
            <td>パッシブ</td>
            <td>
              <template v-for="(trigger, idx) in v.personality.passive.trigger" :key="idx">
                {{ `${trigger.active_type} ` }}
                <label td :class="selectSinColorCss(trigger.sin)">
                  {{ `${trigger.number} ` }}
                </label>
              </template>
            </td>
            <td colspan=7>
              {{ v.personality.passive.text }}
            </td>
          </tr>
          <tr>
            <td>サポート</td>
            <td>
              <template v-for="(trigger, idx) in v.personality.support_passive.trigger" :key="idx">
                {{ `${trigger.active_type} ` }}
                <label td :class="selectSinColorCss(trigger.sin)">
                  {{ `${trigger.number} ` }}
                </label>
              </template>
            </td>
            <td colspan=7>
              {{ v.personality.support_passive.text }}
            </td>
          </tr>
          <tr>
            <td colspan=9>
              <details>
                <summary>
                  <span class="detail_close">スキル詳細</span>
                </summary>
                <div>
                  {{ v.personality.skill[0].name }}
                  <label td :class="selectSinColorCss(v.personality.skill[0].sin)">
                    {{ `${v.personality.skill[0].physics}${v.personality.skill[0].base_attack + (v.personality.skill[0].coin_attack * v.personality.skill[0].coin_number)} (${v.personality.skill[0].base_attack}, ${v.personality.skill[0].coin_attack >= 0 ? `+${v.personality.skill[0].coin_attack}` : v.personality.skill[0].coin_attack} * ${v.personality.skill[0].coin_number})` }}
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

      </table>
    </div>
  </div>

</template>
