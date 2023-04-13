<script setup lang="ts">
import { ref, type Ref } from 'vue'

const skill_sin: Ref<string[]> = ref([])

const emit = defineEmits(['setSkillSinValue']);

const emitEvent = () => {
    emit('setSkillSinValue', skill_sin.value);
}
</script>

<template>
    <div class="mb-4">
        <h4 class="mb-1 font-semibold">
          スキル罪悪属性
        </h4>
        <div class="pl-3">
          <div class="flex">
            <input type="checkbox" id="checkbox_skill_sin_wrath" class="checkbox_normal" v-model="skill_sin" value="憤怒" v-on:change="emitEvent" /><label for="checkbox_skill_sin_wrath" class="label_checkbox font_color_wrath w-12">憤怒</label>
            <input type="checkbox" id="checkbox_skill_sin_lust" class="checkbox_normal" v-model="skill_sin" value="色欲" v-on:change="emitEvent" /><label for="checkbox_skill_sin_lust" class="label_checkbox font_color_lust w-12">色欲</label>
            <input type="checkbox" id="checkbox_skill_sin_sloth" class="checkbox_normal" v-model="skill_sin" value="怠惰" v-on:change="emitEvent" /><label for="checkbox_skill_sin_sloth" class="label_checkbox font_color_sloth w-12">怠惰</label>
            <input type="checkbox" id="checkbox_skill_sin_gluttony" class="checkbox_normal" v-model="skill_sin" value="暴食" v-on:change="emitEvent" /><label for="checkbox_skill_sin_gluttony" class="label_checkbox font_color_gluttony w-12">暴食</label>
            <input type="checkbox" id="checkbox_skill_sin_gloom" class="checkbox_normal" v-model="skill_sin" value="憂鬱" v-on:change="emitEvent" /><label for="checkbox_skill_sin_gloom" class="label_checkbox font_color_gloom w-12">憂鬱</label>
            <input type="checkbox" id="checkbox_skill_sin_pride" class="checkbox_normal" v-model="skill_sin" value="傲慢" v-on:change="emitEvent" /><label for="checkbox_skill_sin_pride" class="label_checkbox font_color_pride w-12">傲慢</label>
            <input type="checkbox" id="checkbox_skill_sin_envy" class="checkbox_normal" v-model="skill_sin" value="嫉妬" v-on:change="emitEvent" /><label for="checkbox_skill_sin_envy" class="label_checkbox font_color_envy w-12">嫉妬</label>
          </div>
        </div>
      </div>
</template>
