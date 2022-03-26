<template>
  <div class="w-full py-10 px-10">
    <ul class="grid grid-cols-4 gap-4">
      <li v-for="(pokemon, index) in pokemonsList" :key="index" class="mb-10">
        <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
          <img class="w-full" :src="getPokemonImage(index)" alt="" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ pokemon?.name }}</div>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="pagination.totalItems !== 0" class="w-full py-5 px-5 flex items-center justify-center">
      <VuePaginationTw
        :total-items="pagination.totalItems"
        :current-page="pagination.currentPage"
        :per-page="pagination.perPage"
        @page-changed="paginate"
        :go-button="false"
        styled="centered"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, reactive } from "vue";
import { pokeApi } from "../../services/pokeApi";
import Pokemon from "../../types/Pokemon";
import Pagination from "../../types/Pagination";
import "vue-pagination-tw/styles";
import VuePaginationTw from "vue-pagination-tw";

const pokemonsList = ref<Pokemon[]>([]);

const {pagination} = reactive({ 
  pagination: {
    totalItems: 0,
    currentPage: 1,
    perPage: 12,
  },
})


const getPokemonDetails = async (pokemon: Pokemon) => {
  try {
    const id = pokemon.url.split("/")[6];

    const { data, status } = await pokeApi.get(`pokemon/${id}`);

    if (status == 200) {
      return data;
    } else {
      return {};
    }
  } catch (error) {
    console.log("Houve um ou mais erros ao consultar os detalhes do pokemon");
  }
};

const getPokemons = async () => {
  try {
    const { data, status } = await pokeApi.get(`pokemon?offset=${pagination.currentPage - 1}&limit=${pagination.perPage}`);

    if (status == 200) {
      console.log('data', data)
      pokemonsList.value = [...data.results];
      pagination.totalItems = data.count;
    }
  } catch (error) {
    console.log("Houve um ou mais erros ao consultar a lista de pokemons");
  }
};

const getPokemonImage = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    id+1
  }.png`;

const paginate = (page: number) => {
  pagination.currentPage = page;
};

watchEffect(()=> {
  getPokemons()
})

onMounted(() => {
  getPokemons();
});
</script>
