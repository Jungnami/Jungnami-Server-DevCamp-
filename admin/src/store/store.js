import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
import { optionGetters } from './getters'
import { optionMutations } from './mutations'
import { optionActions } from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    idxs: null,
    names: null,
    parties: null,
    cities: null,
    ordinals: null,
    crimes: null,
    profileImgs: null,
    reelections: null,
    twitters: null,
    facebooks: null,
    blogs: null,
    phones: null,
    totals: null,
    results: null,
    details: null,
  },
  getters: Object.assign({}, optionGetters),
  mutations: Object.assign({}, optionMutations),
  actions: Object.assign({}, optionActions),
})