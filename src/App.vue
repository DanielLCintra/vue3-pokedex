<template>
  <div class="flex items-center justify-center flex-col">
    <h1 class="mt-10"><img :src="PokedexLogo"></h1>

   <PokemonList />
  </div>
</template>

<script setup lang="ts">
import PokemonList from './components/PokemonList/index.vue';
import PokedexLogo from './assets/pokedex_logo.png'

</script>
