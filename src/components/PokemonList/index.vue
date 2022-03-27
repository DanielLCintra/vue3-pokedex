<template>
  <div class="w-full py-10 px-10">
    <div v-if="pagination.totalItems === 0">
      <img :src="PokemonLoading"/>
    </div>

    <ul v-if="pokemonsList.length !== 0" class="grid grid-cols-4 gap-4">
      <li v-for="(pokemon, index) in pokemonsList" :key="index" class="mb-10">
        <PokemonCard :pokemon="pokemon" />
      </li>
    </ul>

    <div
      v-if="pagination.totalItems !== 0"
      class="w-full py-5 px-5 flex items-center justify-center"
    >
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

<script lang="ts">
export default {
  name: "PokemonList",
};
</script>

<script setup lang="ts">
import { onMounted, ref, watchEffect, reactive } from "vue";
import { pokeApi } from "../../services/pokeApi";
import Pokemon from "../../types/Pokemon";
import PokemonCard from "../PokemonCard/index.vue";
import PokemonLoading from "../../assets/pokemon_loading.gif";
import Pagination from "../../types/Pagination";
import "vue-pagination-tw/styles";
import VuePaginationTw from "vue-pagination-tw";

const pokemonsList = ref<Pokemon[]>([]);

const { pagination } = reactive({
  pagination: {
    totalItems: 0,
    currentPage: 1,
    perPage: 12,
  },
});

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
    const { data, status } = await pokeApi.get(
      `pokemon?offset=${pagination.currentPage - 1}&limit=${pagination.perPage}`
    );

    if (status == 200) {
      console.log("data", data);
      pokemonsList.value = [];
      pagination.totalItems = 0;
      setTimeout(() => {
        
        pokemonsList.value = data.results.map(
          (pokemon: Pokemon, index: number) => {
            const id = pokemon.url.split("/")[6];
            return {
            ...pokemon,
            image: getPokemonImage(id),
          }}
        );
        pagination.totalItems = data.count;
      }, [1000]);
    }
  } catch (error) {
    console.log("Houve um ou mais erros ao consultar a lista de pokemons");
  }
};

const getPokemonImage = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    id
  }.png`;

const paginate = (page: number) => {
  pagination.currentPage = page;
};

watchEffect(() => {
  getPokemons();
});

onMounted(() => {
  getPokemons();
});
</script>
