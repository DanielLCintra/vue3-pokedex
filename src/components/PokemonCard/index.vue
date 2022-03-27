<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" @click="$emit('showPokemonDetails', pokemon)">
    <img class="w-full" :src="pokemon.image" alt="" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ pokemon?.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PokemonCard',
  }
</script>

<script setup lang="ts">
  import Pokemon from '../../types/Pokemon';

  const props = defineProps<{
    pokemon: Pokemon
  }>()
</script>
