<script setup lang="ts">
import { ref, type Ref } from 'vue'

const character: Ref<number[]> = ref([])

const emit = defineEmits(['setCharacterValue']);

const emitEvent = () => {
    emit('setCharacterValue', character.value);
}
</script>

<template>
    <div class="search_contents">
        <h4>
          キャラクター
        </h4>
        <div class="search_checkbox">
          <div class="character_select">
            <input type="checkbox" v-model="character" value="1" v-on:change="emitEvent" /><label>イサン</label>
            <input type="checkbox" v-model="character" value="2" v-on:change="emitEvent" /><label>ファウスト</label>
            <input type="checkbox" v-model="character" value="3" v-on:change="emitEvent" /><label>ドンキホーテ</label>
            <input type="checkbox" v-model="character" value="4" v-on:change="emitEvent" /><label>良秀</label>
            <input type="checkbox" v-model="character" value="5" v-on:change="emitEvent" /><label>ムルソー</label>
            <input type="checkbox" v-model="character" value="6" v-on:change="emitEvent" /><label>ホンル</label>
          </div>
          <div class="character_select">
            <input type="checkbox" v-model="character" value="7" v-on:change="emitEvent" /><label>ヒースクリフ</label>
            <input type="checkbox" v-model="character" value="8" v-on:change="emitEvent" /><label>イシュメール</label>
            <input type="checkbox" v-model="character" value="9" v-on:change="emitEvent" /><label>ロージャ</label>
            <input type="checkbox" v-model="character" value="11" v-on:change="emitEvent" /><label>シンクレア</label>
            <input type="checkbox" v-model="character" value="12" v-on:change="emitEvent" /><label>ウーティス</label>
            <input type="checkbox" v-model="character" value="13" v-on:change="emitEvent" /><label>グレゴール</label>
          </div>
        </div>
      </div>
</template>
