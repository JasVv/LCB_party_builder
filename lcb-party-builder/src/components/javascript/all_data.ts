import type { Personality } from '../Parsonality.vue'
import type { Character } from '../Character.vue'

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

export interface Data {
  character: Character[];
  personality: Personality[];
} 

export const all_data: Data = {
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
