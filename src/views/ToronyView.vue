<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const helyId = route.params.helyId
const hely = computed(() => {
  const res = store.helyszinek.find((h) => h.id == helyId)
  return res ? res.nev : 'Betöltés...'
})

const tornyok = computed(() => {
  return store.tornyok.filter((t) => t.helyszinid == helyId)
})

onMounted(() => {
  if (store.megyek.length === 0) store.getMegyek()
  if (store.helyszinek.length === 0) store.getHelyszinek()
  if (store.tornyok.length === 0) store.getTornyok()
})
</script>

<template>
  <router-link to="/" class="btn btn-primary mb-5">Vissza</router-link>
  <div>
    <h5 class="mb-3">A(z) {{ hely }} helyszínen lévő tornyok részletes adatai</h5>
    <div class="container">
      <div class="row">
        <p class="col-3"><b>Azonosító</b></p>
        <p class="col-3"><b>Mennyiség</b></p>
        <p class="col-3"><b>Teljesítmény</b></p>
        <p class="col-3"><b>Kezdés éve</b></p>
      </div>
    </div>
    <div v-for="torony in tornyok" :key="torony.id" class="container">
      <div class="row">
        <p class="col-3 px-4">{{ torony.id }}</p>
        <p class="col-3 px-4">{{ torony.darab }} db</p>
        <p class="col-3 px-4">{{ torony.teljesitmeny }} kW</p>
        <p class="col-3 px-4">{{ torony.kezdev }}.</p>
      </div>
    </div>
  </div>
</template>
