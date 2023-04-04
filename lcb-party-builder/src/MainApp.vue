<script setup lang="ts">
import { ref, type Ref } from 'vue'
import json_data from '@/assets/characters.json'

interface Character {
  character_id: number;
  name: string;
}

interface CoinEffect {
  number: number;
  text: string;
}

interface Skill {
  name: string;
  text: string;
  sin: string;
  target_number: number;
  base_attack: number;
  coin_number: number;
  coin_attack: number;
  coin_effect: CoinEffect[];
  buff_debuff: string[];
}

interface Defence {
  name: string;
  text: string;
  base_attack: number;
  coin_number: number;
  coin_attack: number;
  coin_effect: CoinEffect[];
  buff_debuff: string[];
}

interface PassiveTrigger {
  sin: string;
  number: number;
}

interface Passive {
  name: string;
  text: string;
  trigger: PassiveTrigger[];
  buff_debuff: string[];
}

interface Personality {
  personality_id: number;
  character_id: number;
  name: string;
  skill: Skill[];
  defence: Defence;
  resistance: {
    slashing: number;
    penetration: number;
    blow: number;
  };
  passive: Passive;
  support_passive: Passive;
}

interface Data {
  character: Character[];
  personality: Personality[];
}

interface View {
  character: Character;
  personality: Personality;
}

const all_data: Data = json_data

const character: Ref<number[]> = ref([])
const resistance: Ref<string[]> = ref([])
const skill_sin: Ref<string[]> = ref([])
const buff_debuff: Ref<string[]> = ref([])

const data = ref<{
  view: View[]
}>({
  view: []
})

function recalculate() {
  const charactor_select = (character.value ? all_data.personality.filter(p => character.value.includes(p.character_id)) : all_data.personality).map(p => p.personality_id)

  const resistance_select = (resistance.value 
  ? all_data.personality.filter(p => {
    const sl = resistance.value.includes("slashing") ? p.resistance.slashing < 1.0 : true
    const pe = resistance.value.includes("penetration") ? p.resistance.penetration < 1.0 : true
    const bl = resistance.value.includes("blow") ? p.resistance.blow < 1.0 : true
    sl && pe && bl
  }) 
  : all_data.personality).map(p => p.personality_id)

  const skill_sin_select = (skill_sin.value 
  ? all_data.personality.filter(p => {
    p.skill.find(s => skill_sin.value.includes(s.sin))
  }) 
  : all_data.personality).map(p => p.personality_id)

  const buff_debuff_select = (buff_debuff.value 
  ? all_data.personality.filter(p => {
    const skill_buff_debuff = p.skill.find(s => s.buff_debuff.filter(b => buff_debuff.value.includes(b)))
    const defence_buff_debuff = p.defence.buff_debuff.find(b => buff_debuff.value.includes(b))
    const passive_buff_debuff = p.passive.buff_debuff.find(b => buff_debuff.value.includes(b))
    const support_passive_buff_debuff = p.support_passive.buff_debuff.find(b => buff_debuff.value.includes(b))
    skill_buff_debuff || defence_buff_debuff || passive_buff_debuff || support_passive_buff_debuff
  }) 
  : all_data.personality).map(p => p.personality_id)

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

}
</script>

<template>
  <div>
    キャラクター
  </div>
  <div>
  	<input type="checkbox" v-model="character" value="1" v-on:change="recalculate()" />イサン
    <input type="checkbox" v-model="character" value="2" v-on:change="recalculate()" />ファウスト
    <input type="checkbox" v-model="character" value="3" v-on:change="recalculate()" />ドンキホーテ
    <input type="checkbox" v-model="character" value="4" v-on:change="recalculate()" />良秀
    <input type="checkbox" v-model="character" value="5" v-on:change="recalculate()" />ムルソー
    <input type="checkbox" v-model="character" value="6" v-on:change="recalculate()" />ホンル
    <input type="checkbox" v-model="character" value="7" v-on:change="recalculate()" />ヒースクリフ
    <input type="checkbox" v-model="character" value="8" v-on:change="recalculate()" />イシュメール
    <input type="checkbox" v-model="character" value="9" v-on:change="recalculate()" />ロージャ
    <input type="checkbox" v-model="character" value="11" v-on:change="recalculate()" />シンクレア
    <input type="checkbox" v-model="character" value="12" v-on:change="recalculate()" />ウーティス
    <input type="checkbox" v-model="character" value="13" v-on:change="recalculate()" />グレゴール
  </div>

  <div>
    耐性
  </div>
  <div>
  	<input type="checkbox" v-model="resistance" value="slashing" v-on:change="recalculate()" />斬撃
    <input type="checkbox" v-model="resistance" value="penetration" v-on:change="recalculate()" />貫通
    <input type="checkbox" v-model="resistance" value="blow" v-on:change="recalculate()" />打撃
  </div>

  <div>
    スキル罪悪属性
  </div>
  <div>
  	<input type="checkbox" v-model="skill_sin" value="憤怒" v-on:change="recalculate()" />憤怒
    <input type="checkbox" v-model="skill_sin" value="色欲" v-on:change="recalculate()" />色欲
    <input type="checkbox" v-model="skill_sin" value="怠惰" v-on:change="recalculate()" />怠惰
    <input type="checkbox" v-model="skill_sin" value="暴食" v-on:change="recalculate()" />暴食
    <input type="checkbox" v-model="skill_sin" value="憂鬱" v-on:change="recalculate()" />憂鬱
    <input type="checkbox" v-model="skill_sin" value="傲慢" v-on:change="recalculate()" />傲慢
    <input type="checkbox" v-model="skill_sin" value="嫉妬" v-on:change="recalculate()" />嫉妬
  </div>
  
  <div>
    バフ・デバフ
  </div>
  <div>
  	<input type="checkbox" v-model="buff_debuff" value="出血" v-on:change="recalculate()" />出血
    <input type="checkbox" v-model="buff_debuff" value="呼吸" v-on:change="recalculate()" />呼吸
    <input type="checkbox" v-model="buff_debuff" value="釘" v-on:change="recalculate()" />釘
  </div>

  <div>
    <label v-for="v in data.view" :key="v.personality.personality_id">
      {{ v.character.name }} {{ v.personality }}}
    </label>
  </div>
  
  <div>
    {{ all_data }}
  </div>

</template>
