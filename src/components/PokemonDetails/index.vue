<template>
  <!-- <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
    <img class="w-full" :src="pokemon.image" alt="" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ pokemon?.name }}</div>
    </div>
  </div> -->

  <div
    id="defaultModal"
    tabindex="-1"
    :class="{ hidden: isHidden }"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600"
        >
          <h3
            class="text-3xl font-bold text-gray-900 lg:text-2xl dark:text-white"
          >
            {{ pokemon.name }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="$emit('close')"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6 justify-center items-center w-full flex">
          <img class="w-80 h-80" :src="pokemon?.sprites?.front_default" />
        </div>
        <!-- Modal footer -->
        <div
          class="grid grid-cols-3 gap-3 p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <div>
            <ul class="list-none">
              <li class="mb-5">id: {{ pokemon.id }}</li>
              <li class="mb-5">
                types: {{ pokemon?.types?.map((t) => t.type.name).join(",") }}
              </li>
            </ul>
          </div>

          <div>
            <ul class="list-none">
              <li>
                stats: <br />
                <ul class="list-disc ml-5">
                  <li v-for="(stat, index) in pokemon?.stats" :key="index">
                    {{ stat.stat.name + ": " + stat.base_stat }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <ul class="list-none">
              <li>
                moves: <br />
                <ul class="list-disc ml-5">
                  <li >
                    {{ pokemon?.moves?.map(m => m.move.name).join(', ')  }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PokemonDetails",
};
</script>

<script setup lang="ts">
import Pokemon from "../../types/Pokemon";

const props = defineProps<{
  pokemon: Pokemon;
  isHidden: boolean;
}>();
</script>
