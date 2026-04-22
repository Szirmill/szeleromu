import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HomeView from '@/views/HomeView.vue'
import { useStore } from '@/stores/store'

describe('teszteset', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    let store = useStore()

    store.megyek = [
      { id: 10, nev: 'BPest', regio: 'ÉKözép-Magyarország ' },
      { id: 14, nev: 'Veszprém', regio: 'Közép-Dunántúl ' },
      { id: 19, nev: 'Somogy', regio: 'Dél-Dunántúl ' },
    ]

    store.helyszinek = [
      { id: 1, nev: 'Várpalota', megyeid: 14 },
      { id: 8, nev: 'Szápár', megyeid: 14 },
      { id: 15, nev: 'Csetény', megyeid: 14 },
      { id: 27, nev: 'Pápakovácsi', megyeid: 14 },
      { id: 99, nev: 'Nem Veszprém megyei város', megyeid: 19 },
    ]

    store.tornyok = [
      { id: 1, darab: 1, teljesitmeny: 250, kezdev: 2000, helyszinid: 1 }, // Várpalota
      { id: 8, darab: 1, teljesitmeny: 1800, kezdev: 2005, helyszinid: 8 }, // Szápár
      { id: 15, darab: 2, teljesitmeny: 2000, kezdev: 2006, helyszinid: 15 }, // Csetény
      { id: 29, darab: 1, teljesitmeny: 2000, kezdev: 2008, helyszinid: 27 }, // Pápakovácsi
    ]

    store.valasztottMegyeId = 14
  })

  it('Veszprém megye szélerőműves városai ', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    await wrapper.vm.$nextTick()

    const helyek = wrapper.findAll('.btn')
    const helyNevek = helyek.map((h) => h.text())

    expect(helyNevek).toEqual(
      expect.arrayContaining(['Várpalota', 'Szápár', 'Csetény', 'Pápakovácsi']),
    )
  })

  it('Veszprém megye összes szélerűműve ', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
        stubs: ['RouterLink'],
      },
    })

    await wrapper.vm.$nextTick()

    const text = wrapper.text()

    expect(text).toContain(' 5 darab ')
  })

  it('Veszprém megye összteljesítménye ', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
        stubs: ['RouterLink'],
      },
    })

    await wrapper.vm.$nextTick()

    const text = wrapper.text()

    expect(text).toContain('6050 kW')
  })

  it('Összesítő szöveg ellenőrzése ', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia],
        stubs: ['RouterLink'],
      },
    })

    await wrapper.vm.$nextTick()

    const text = wrapper.text()

    expect(text).toContain('Összesen 5 darab torony, 6050 kW (6.05 MW) összteljesítmény.')
  })
})
