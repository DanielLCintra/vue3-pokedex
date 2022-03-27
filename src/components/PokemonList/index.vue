<template>
  <div>
    <PokemonDetails :pokemon='currentPokemon' :isHidden='!showModalPokemonDetails' @close="showModalPokemonDetails = false"/>
    <div class="flex items-center justify-center flex-col">
    <div class="my-10">
      <img :src="PokedexLogo">
    </div>

      <div v-if="pagination.totalItems === 0">
        <img :src="PokemonLoading"/>
      </div>

      <ul v-if="pokemonsList.length !== 0" class=" w-full grid grid-cols-4 gap-4 px-10">
        <li v-for="(pokemon, index) in pokemonsList" :key="index" class="mb-10">
          <PokemonCard :pokemon="pokemon" @show-pokemon-details="(pokemon) => getPokemonDetails(pokemon)"/>
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
import PokemonDetails from "../PokemonDetails/index.vue";
import PokedexLogo from '../../assets/pokedex_logo.png'

const pokemonsList = ref<Pokemon[]>([]);

const { pagination } = reactive({
  pagination: {
    totalItems: 0,
    currentPage: 1,
    perPage: 12,
  }
});

let currentPokemon = ref<Pokemon>({});
let showModalPokemonDetails = ref(false);

const getPokemonDetails = async (pokemon: Pokemon) => {
  try {
    const id = pokemon.url.split("/")[6];

    const { data, status } = await pokeApi.get(`pokemon/${id}`);

    if (status == 200) {
      currentPokemon.value = {...pokemon, ...data};
      showModalPokemonDetails.value = true;
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
            id: id,
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
