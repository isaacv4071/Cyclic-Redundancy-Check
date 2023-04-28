<script setup lang="ts">
import { ref, computed } from "vue";
import { crc as Crc } from "./crc";
import Spinner from "./components/Spinner.vue";
import { binaryToPolynomial } from "./utils/binaryToPolinomical";

const polynomial = ref("");
const generator = ref("");
const crc = ref("");
const isSending = ref(false);
const sentData = ref("");
const sentDataCrc = ref("");
const sentDataStatus = ref(true);

const sent = () => {
  crc.value = Crc(polynomial.value, generator.value);
  isSending.value = true;
  setTimeout(() => {
    sentData.value = polynomial.value + crc.value;
    isSending.value = false;
  }, 2000);
};

const check = () => {
  sentDataCrc.value = Crc(sentData.value, generator.value);
  sentDataStatus.value =
    sentDataCrc.value === "0".repeat(generator.value.length - 1);
};
</script>

<template>
  <main class="antialiased container mx-auto my-20 text-sm space-y-4 max-w-4xl">
    <h1 class="font-bold text-center text-lg">
      Cálculo del Método de Redundancia Cíclica (CRC)
    </h1>
    <div class="mx-auto">
      <div class="flex flex-col">
        <label for="generator" class="h-10">Generador</label>
        <input
          class="flex-none w-30 bg-gray-200 focus:bg-white border border-gray-200 rounded-md py-1 px-3 text-gray-800 font-medium focus:outline-none"
          type="text"
          id="generator"
          v-model="generator"
        />
      </div>
    </div>
    <div class="flex w-full gap-8">
      <section class="basis-1/2 space-y-4">
        <h2 class="text-center font-bold text-lg">Emisor</h2>
        <div class="flex flex-col">
          <div class="flex items-center justify-between h-10">
            <label for="polynomial">Polinomio</label>
            <div class="flex text-gray-500 items-center" v-show="isSending">
              <Spinner class="w-6 h-6" />
              <span>Enviando...</span>
            </div>
          </div>
          <input
            class="flex-initial bg-gray-200 focus:bg-white border border-gray-200 rounded-md py-1 px-3 text-gray-800 font-medium focus:outline-none"
            type="text"
            id="polynomial"
            v-model="polynomial"
          />
        </div>
        <button
          class="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none rounded-md py-1 px-3 text-gray-800 font-medium text-center"
          @click="sent"
        >
          Enviar
        </button>
        <div v-if="crc">
          <p>Código CRC: {{ crc }}</p>
        </div>
      </section>
      <section class="basis-1/2 space-y-4">
        <h2 class="text-center font-bold text-lg">Receptor</h2>
        <div class="flex flex-col">
          <div class="flex items-center justify-between h-10">
            <label for="polynomial">Datos recibidos</label>
            <div class="flex text-gray-500 items-center" v-show="isSending">
              <Spinner class="w-6 h-6" />
              <span>Recibiendo...</span>
            </div>
          </div>
          <input
            class="flex-initial bg-gray-200 focus:bg-white border border-gray-200 rounded-md py-1 px-3 text-gray-800 font-medium focus:outline-none"
            :class="{ 'border-red-500': !sentDataStatus }"
            type="text"
            id="receptor"
            v-model="sentData"
          />
        </div>
        <button
          class="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 focus:outline-none rounded-md py-1 px-3 text-gray-800 font-medium text-center"
          @click="check"
        >
          Comprobar
        </button>
        <div v-if="sentDataCrc">
          <p>Resultado: {{ sentDataCrc }}</p>
          <p>
            Estado:
            <span v-if="sentDataStatus" class="text-green-500 font-medium"
              >OK!</span
            >
            <span v-else class="text-red-500 font-medium"
              >Error, datos corruptos</span
            >
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
