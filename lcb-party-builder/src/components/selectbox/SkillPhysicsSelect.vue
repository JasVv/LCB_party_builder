<script setup lang="ts">
import { ref, type Ref } from 'vue'

const skill_physics: Ref<string[]> = ref([])

const emit = defineEmits(['setSkillPhysicsValue']);

const emitEvent = () => {
    emit('setSkillPhysicsValue', skill_physics.value);
}
</script>

<template>
    <div class="mb-4">
        <h4 class="mb-1 font-semibold">
          スキル物理属性
        </h4>
        <div class="pl-3">
          <div class="flex">
            <input type="checkbox" id="checkbox_skill_physics_slashing" class="checkbox_normal" v-model="skill_physics" value="斬" v-on:change="emitEvent" /><label for="checkbox_skill_physics_slashing" class="label_checkbox w-12">斬撃</label>
            <input type="checkbox" id="checkbox_skill_physics_penetration" class="checkbox_normal" v-model="skill_physics" value="貫" v-on:change="emitEvent" /><label for="checkbox_skill_physics_penetration" class="label_checkbox w-12">貫通</label>
            <input type="checkbox" id="checkbox_skill_physics_blow" class="checkbox_normal" v-model="skill_physics" value="打" v-on:change="emitEvent" /><label for="checkbox_skill_physics_blow" class="label_checkbox w-12">打撃</label>
          </div>
        </div>
      </div>
</template>
