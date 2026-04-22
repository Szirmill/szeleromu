<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()

onMounted(async () => {
  if (store.megyek.length === 0) store.getMegyek()
  if (store.helyszinek.length === 0) store.getHelyszinek()
  if (store.tornyok.length === 0) store.getTornyok()
})

const filteredHelyszinek = computed(() => {
  if (!store.valasztottMegyeId) return []
  return store.helyszinek.filter((h) => h.megyeid == store.valasztottMegyeId)
})

const megyeiOsszesito = computed(() => {
  if (!store.valasztottMegyeId) {
    return {
      toronyszam: 0,
      teljesitmeny: 0,
    }
  }

  let toronyszam = 0
  let teljesitmeny = 0

  for (const hely of filteredHelyszinek.value) {
    for (const torony of store.tornyok) {
      if (torony.helyszinid == hely.id) {
        toronyszam += torony.darab
        teljesitmeny += torony.teljesitmeny
      }
    }
  }

  return {
    toronyszam,
    teljesitmeny,
  }
})
</script>

<template>
  <div class="w-75">
    <!-- megye választó -->

    <label for="megye" class="form-label">Megyék listája:</label>
    <select name="megye" v-model="store.valasztottMegyeId" class="form-select mb-5">
      <option value="">Válasszon megyét!</option>
      <option v-for="megye in store.megyek" :key="megye.id" :value="megye.id">
        {{ megye.nev }}
      </option>
    </select>
  </div>

  <!-- város lista -->

  <div v-if="store.valasztottMegyeId > 0" class="mx-2">
    <p v-if="filteredHelyszinek.length == 0" class="px-4">
      A kiválasztott megyében nincs telepített szélerőmű.
    </p>
    <div v-else class="container">
      <div class="row row-cols-auto g-2">
        <router-link
          :to="{ name: 'tornyok', params: { helyId: hely.id } }"
          v-for="hely in filteredHelyszinek"
          :key="hely.id"
          class="btn btn-primary m-2"
          >{{ hely.nev }}</router-link
        >
      </div>

      <!-- összesítő -->

      <p class="p-3">
        <b>
          Összesen {{ megyeiOsszesito.toronyszam }} darab torony,
          {{ megyeiOsszesito.teljesitmeny }} kW ({{ megyeiOsszesito.teljesitmeny / 1000 }} MW)
          összteljesítmény.
        </b>
      </p>
    </div>
  </div>
</template>

<style scoped>
.col {
  border: 1px solid black;
}
</style>
