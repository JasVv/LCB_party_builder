<script setup lang="ts">
export interface CoinEffect {
  number: number;
  text: string;
}

export interface Skill {
  number: number,
  name: string;
  text: string;
  sin: string;
  physics: string;
  attack_level: number,
  target_number: number;
  base_attack: number;
  coin_number: number;
  coin_attack: number;
  coin_effect: CoinEffect[];
  buff_debuff: string[];
}

export interface Defence {
  name: string;
  text: string;
  defence_type: string;
  defence_level: number,
  sin: string | undefined | null,
  physics: string | undefined | null,
  base_attack: number;
  coin_number: number;
  coin_attack: number;
  coin_effect: CoinEffect[];
  buff_debuff: string[];
}

export interface PassiveTrigger {
  sin: string;
  active_type: string;
  number: number;
}

export interface Passive {
  name: string;
  text: string;
  trigger: PassiveTrigger[];
  buff_debuff: string[];
}

export interface Personality {
  personality_id: number;
  character_id: number;
  name: string;
  rarity: number,
  hp: number,
  attack_level: number,
  defence_level: number,
  speed_min: number,
  speed_max: number, 
  resistance: {
    slashing: number;
    penetration: number;
    blow: number;
  };
  skill: Skill[];
  defence: Defence;
  passive: Passive;
  support_passive: Passive;
}
</script>
