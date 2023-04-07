<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type Parsonality from './components/Parsonality.vue'
import type Character from './components/Character.vue'

import characters_json from '@/assets/characters.json'
import parsonality_1_json from '@/assets/parsonality/character1.json'
import parsonality_2_json from '@/assets/parsonality/character2.json'
import parsonality_3_json from '@/assets/parsonality/character3.json'
import parsonality_4_json from '@/assets/parsonality/character4.json'
import parsonality_5_json from '@/assets/parsonality/character5.json'
import parsonality_6_json from '@/assets/parsonality/character6.json'
import parsonality_7_json from '@/assets/parsonality/character7.json'
import parsonality_8_json from '@/assets/parsonality/character8.json'
import parsonality_9_json from '@/assets/parsonality/character9.json'
import parsonality_11_json from '@/assets/parsonality/character11.json'
import parsonality_12_json from '@/assets/parsonality/character12.json'
import parsonality_13_json from '@/assets/parsonality/character13.json'

interface Data {
  character: Character[];
  personality: Personality[];
}

interface View {
  character: Character;
  personality: Personality;
}

const all_data: Data = {
  character: characters_json,
  personality: [
    ...parsonality_1_json, 
    ...parsonality_2_json, 
    ...parsonality_3_json, 
    ...parsonality_4_json, 
    ...parsonality_5_json, 
    ...parsonality_6_json, 
    ...parsonality_7_json, 
    ...parsonality_8_json, 
    ...parsonality_9_json, 
    ...parsonality_11_json, 
    ...parsonality_12_json, 
    ...parsonality_13_json, 
  ]
}

const all_buff_debuff: string[] = Array.from(new Set(all_data.personality.flatMap(p => 
  [...p.skill.flatMap(v => v.buff_debuff), ...p.defence.buff_debuff, ...p.passive.buff_debuff, ...p.support_passive.buff_debuff]
))).sort()

const character: Ref<number[]> = ref([])
const resistance: Ref<string[]> = ref([])
const skill_sin: Ref<string[]> = ref([])
const buff_debuff: Ref<string[]> = ref([])

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

function recalculate() {
  const charactor_select = (character.value.length ? all_data.personality.filter(p => character.value.some(v => v == p.character_id)) : all_data.personality).map(p => p.personality_id)

  const resistance_select = (resistance.value.length 
  ? all_data.personality.filter(p => {
    const sl = resistance.value.some(v => v == "slashing") ? p.resistance.slashing < 1 : false
    const pe = resistance.value.some(v => v == "penetration") ? p.resistance.penetration < 1 : false
    const bl = resistance.value.some(v => v == "blow") ? p.resistance.blow < 1 : false
    return sl || pe || bl
  }) 
  : all_data.personality).map(p => p.personality_id)

  const skill_sin_select = (skill_sin.value.length 
  ? all_data.personality.filter(p => p.skill.find(s => skill_sin.value.some(v => v == s.sin))) 
  : all_data.personality).map(p => p.personality_id)

  const buff_debuff_select = (buff_debuff.value.length 
    ? all_data.personality.filter(p => {
      const skill_buff_debuff = p.skill.find(s => s.buff_debuff.filter(b => buff_debuff.value.some(v => v == b)).length)
      const defence_buff_debuff = p.defence.buff_debuff.find(b => buff_debuff.value.some(v => v == b))
      const passive_buff_debuff = p.passive.buff_debuff.find(b => buff_debuff.value.some(v => v == b))
      const support_passive_buff_debuff = p.support_passive.buff_debuff.find(b => buff_debuff.value.some(v => v == b))
      
      return skill_buff_debuff || defence_buff_debuff || passive_buff_debuff || support_passive_buff_debuff
    }) 
    : all_data.personality
  ).map(p => p.personality_id)

  const target_personality = charactor_select.filter(value => resistance_select.includes(value) && skill_sin_select.includes(value) && buff_debuff_select.includes(value))

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
      if (a.character.character_id < b.character.character_id) {
        return -1
      } else if (a.character.character_id > b.character.character_id) {
        return 1
      } else {
        if (a.personality.personality_id < b.personality.personality_id) {
          return -1
        } else if (a.personality.personality_id > b.personality.personality_id) {
          return 1
        } else {
          return 0
        }
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
      <div class="search_contents">
        <h4>
          キャラクター
        </h4>
        <div class="search_checkbox">
          <div class="character_select">
            <input type="checkbox" v-model="character" value="1" v-on:change="recalculate()" /><label>イサン</label>
            <input type="checkbox" v-model="character" value="2" v-on:change="recalculate()" /><label>ファウスト</label>
            <input type="checkbox" v-model="character" value="3" v-on:change="recalculate()" /><label>ドンキホーテ</label>
            <input type="checkbox" v-model="character" value="4" v-on:change="recalculate()" /><label>良秀</label>
            <input type="checkbox" v-model="character" value="5" v-on:change="recalculate()" /><label>ムルソー</label>
            <input type="checkbox" v-model="character" value="6" v-on:change="recalculate()" /><label>ホンル</label>
          </div>
          <div class="character_select">
            <input type="checkbox" v-model="character" value="7" v-on:change="recalculate()" /><label>ヒースクリフ</label>
            <input type="checkbox" v-model="character" value="8" v-on:change="recalculate()" /><label>イシュメール</label>
            <input type="checkbox" v-model="character" value="9" v-on:change="recalculate()" /><label>ロージャ</label>
            <input type="checkbox" v-model="character" value="11" v-on:change="recalculate()" /><label>シンクレア</label>
            <input type="checkbox" v-model="character" value="12" v-on:change="recalculate()" /><label>ウーティス</label>
            <input type="checkbox" v-model="character" value="13" v-on:change="recalculate()" /><label>グレゴール</label>
          </div>
        </div>
      </div>

      <div class="search_contents">
        <h4>
          耐性
        </h4>
        <div class="search_checkbox">
          <div class="resistance_select">
            <input type="checkbox" v-model="resistance" value="slashing" v-on:change="recalculate()" /><label>斬撃</label>
            <input type="checkbox" v-model="resistance" value="penetration" v-on:change="recalculate()" /><label>貫通</label>
            <input type="checkbox" v-model="resistance" value="blow" v-on:change="recalculate()" /><label>打撃</label>
          </div>
        </div>
      </div>

      <div class="search_contents">
        <h4>
          スキル罪悪属性
        </h4>
        <div class="search_checkbox">
          <div class="skill_sin_select">
            <input type="checkbox" v-model="skill_sin" value="憤怒" v-on:change="recalculate()" /><label>憤怒</label>
            <input type="checkbox" v-model="skill_sin" value="色欲" v-on:change="recalculate()" /><label>色欲</label>
            <input type="checkbox" v-model="skill_sin" value="怠惰" v-on:change="recalculate()" /><label>怠惰</label>
            <input type="checkbox" v-model="skill_sin" value="暴食" v-on:change="recalculate()" /><label>暴食</label>
            <input type="checkbox" v-model="skill_sin" value="憂鬱" v-on:change="recalculate()" /><label>憂鬱</label>
            <input type="checkbox" v-model="skill_sin" value="傲慢" v-on:change="recalculate()" /><label>傲慢</label>
            <input type="checkbox" v-model="skill_sin" value="嫉妬" v-on:change="recalculate()" /><label>嫉妬</label>
          </div>
        </div>
      </div>

      <div class="search_contents">
        <h4>
          バフ・デバフ
        </h4>
        <div class="search_checkbox">
          <div class="buff_debuff_select">
            <div v-for="b in all_buff_debuff" :key="b">
              <input type="checkbox" v-model="buff_debuff" :value="b" v-on:change="recalculate()" /><label>{{ b }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="result">
      <hr>

      <table class="personality_table">

        <tr>
          <th>人格</th> 
          <th>スキル1</th> 
          <th>スキル2</th> 
          <th>スキル3</th> 
          <th>斬</th> 
          <th>貫</th> 
          <th>打</th> 
        </tr>

        <template v-for="v in data.view" :key="v.personality.personality_id">
          <tr>
            <td>【{{ v.personality.name }}】{{ v.character.name }}</td> 
            <td :class="selectSinColorCss(v.personality.skill[0]?.sin)">
              {{ v.personality.skill[0] ? `${v.personality.skill[0].base_attack} + (${v.personality.skill[0].coin_attack} * ${v.personality.skill[0].coin_number})` : ""  }}
            </td> 
            <td :class="selectSinColorCss(v.personality.skill[1]?.sin)">
              {{ v.personality.skill[1] ? `${v.personality.skill[1].base_attack} + (${v.personality.skill[1].coin_attack} * ${v.personality.skill[1].coin_number})` : ""  }}
            </td> 
            <td :class="selectSinColorCss(v.personality.skill[2]?.sin)">
              {{ v.personality.skill[2] ? `${v.personality.skill[2].base_attack} + (${v.personality.skill[2].coin_attack} * ${v.personality.skill[2].coin_number})` : ""  }}
            </td> 
            <td>{{ v.personality.resistance.slashing }}</td>
            <td>{{ v.personality.resistance.penetration }}</td> 
            <td>{{ v.personality.resistance.blow }}</td> 
          </tr>
          <tr>
            <td colspan=7>
              <details>
                <summary>詳細</summary>
                ここに詳細を出す
              </details>
            </td>
          </tr>
        </template>

      </table>
    </div>
  </div>

</template>
