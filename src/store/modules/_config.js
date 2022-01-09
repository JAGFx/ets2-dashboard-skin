import { emptyData } from '@/utils/_config';
import { config } from '@/utils/utils';

// initial state
const state = () => emptyData();

// getters
const getters = {
  get: (state) => (elm) => {
    let value = { ...state.app, ...state.game }[elm];

    if (value === 'true') value = true;
    else if (value === 'false') value = false;

    return value ?? null;
  },
  enabled: (state, getters) => (elm) => {
    //console.log( elm, getters.exist( elm ), getters.get( elm ) );

    return getters.exist(elm) && getters.get(elm) === true;
  },
  exist: (state) => (elm) => {
    return Object.hasOwnProperty.call({ ...state.app, ...state.game }, elm);
  },
  all: (state) => {
    return { ...state.app, ...state.game };
  },
  app: (state) => state.app,
  game: (state) => state.game,
  gameConfigLoaded: (state) => state.game !== null
};

// actions
const actions = {};

// mutations
const mutations = {
  setApp(state, config) {
    state.app = config;
  },
  setGame(state, config) {
    state.game = config;
  },
  setElm(state, payload) {
    state[payload.target][payload.id] = payload.value;
    config.save(state, payload.target);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
