import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('store', () => {
  const megyek = []
  const helyszinek = []
  const tornyok = []
  const valasztottMegyeId = ''

  async function getMegyek() {
    this.megyek = (await axios.get('http://localhost:3000/megye')).data.sort((a, b) =>
      a.nev.localeCompare(b.nev, 'hu'),
    )
  }

  async function getHelyszinek() {
    this.helyszinek = (await axios.get('http://localhost:3000/helyszin')).data.sort((a, b) =>
      a.nev.localeCompare(b.nev, 'hu'),
    )
  }
  async function getTornyok() {
    this.tornyok = (await axios.get('http://localhost:3000/torony')).data
  }

  return { megyek, helyszinek, tornyok, valasztottMegyeId, getMegyek, getHelyszinek, getTornyok }
})
