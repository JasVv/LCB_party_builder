<script setup lang="ts">
import { ref, type Ref } from 'vue'

const character: Ref<number[]> = ref([])

const emit = defineEmits(['setCharacterValue']);

const emitEvent = () => {
    emit('setCharacterValue', character.value);
}
</script>

<template>
    <div class="mb-4">
        <h4 class="mb-1 font-semibold">
          キャラクター
        </h4>
        <div class="pl-3">
          <div class="flex">
            <input type="checkbox" id="checkbox_character_1" class="checkbox_normal" v-model="character" value="1" v-on:change="emitEvent" /><label for="checkbox_character_1" class="label_checkbox w-24">イサン</label>
            <input type="checkbox" id="checkbox_character_2" class="checkbox_normal" v-model="character" value="2" v-on:change="emitEvent" /><label for="checkbox_character_2" class="label_checkbox w-24">ファウスト</label>
            <input type="checkbox" id="checkbox_character_3" class="checkbox_normal" v-model="character" value="3" v-on:change="emitEvent" /><label for="checkbox_character_3" class="label_checkbox w-24">ドンキホーテ</label>
            <input type="checkbox" id="checkbox_character_4" class="checkbox_normal" v-model="character" value="4" v-on:change="emitEvent" /><label for="checkbox_character_4" class="label_checkbox w-24">良秀</label>
            <input type="checkbox" id="checkbox_character_5" class="checkbox_normal" v-model="character" value="5" v-on:change="emitEvent" /><label for="checkbox_character_5" class="label_checkbox w-24">ムルソー</label>
            <input type="checkbox" id="checkbox_character_6" class="checkbox_normal" v-model="character" value="6" v-on:change="emitEvent" /><label for="checkbox_character_6" class="label_checkbox w-24">ホンル</label>
          </div>
          <div class="flex">
            <input type="checkbox" id="checkbox_character_7" class="checkbox_normal" v-model="character" value="7" v-on:change="emitEvent" /><label for="checkbox_character_7" class="label_checkbox w-24">ヒースクリフ</label>
            <input type="checkbox" id="checkbox_character_8" class="checkbox_normal" v-model="character" value="8" v-on:change="emitEvent" /><label for="checkbox_character_8" class="label_checkbox w-24">イシュメール</label>
            <input type="checkbox" id="checkbox_character_9" class="checkbox_normal" v-model="character" value="9" v-on:change="emitEvent" /><label for="checkbox_character_9" class="label_checkbox w-24">ロージャ</label>
            <input type="checkbox" id="checkbox_character_11" class="checkbox_normal" v-model="character" value="11" v-on:change="emitEvent" /><label for="checkbox_character_11" class="label_checkbox w-24">シンクレア</label>
            <input type="checkbox" id="checkbox_character_12" class="checkbox_normal" v-model="character" value="12" v-on:change="emitEvent" /><label for="checkbox_character_12" class="label_checkbox w-24">ウーティス</label>
            <input type="checkbox" id="checkbox_character_13" class="checkbox_normal" v-model="character" value="13" v-on:change="emitEvent" /><label for="checkbox_character_13" class="label_checkbox w-24">グレゴール</label>
          </div>
        </div>
      </div>
</template>
