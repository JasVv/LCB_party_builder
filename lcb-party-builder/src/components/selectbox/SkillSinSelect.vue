<script setup lang="ts">
import { ref, type Ref } from 'vue'

const skill_sin: Ref<string[]> = ref([])

const emit = defineEmits(['setSkillSinValue']);

const emitEvent = () => {
    emit('setSkillSinValue', skill_sin.value);
}
</script>

<template>
    <div class="search_contents">
        <h4>
          スキル罪悪属性
        </h4>
        <div class="search_checkbox">
          <div class="skill_sin_select">
            <input type="checkbox" v-model="skill_sin" value="憤怒" v-on:change="emitEvent" /><label>憤怒</label>
            <input type="checkbox" v-model="skill_sin" value="色欲" v-on:change="emitEvent" /><label>色欲</label>
            <input type="checkbox" v-model="skill_sin" value="怠惰" v-on:change="emitEvent" /><label>怠惰</label>
            <input type="checkbox" v-model="skill_sin" value="暴食" v-on:change="emitEvent" /><label>暴食</label>
            <input type="checkbox" v-model="skill_sin" value="憂鬱" v-on:change="emitEvent" /><label>憂鬱</label>
            <input type="checkbox" v-model="skill_sin" value="傲慢" v-on:change="emitEvent" /><label>傲慢</label>
            <input type="checkbox" v-model="skill_sin" value="嫉妬" v-on:change="emitEvent" /><label>嫉妬</label>
          </div>
        </div>
      </div>
</template>
