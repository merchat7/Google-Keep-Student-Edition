import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    notes: [],
    updatedNotes: [],
    currentOrderKey: 0,
    lastCheckedIndex: 0 // to ensusure Draggabilly is only bind once (otherwise buggy behavior)
};

const mutations = {
    addNote (state, note) {
        state.notes.unshift(note);
    },
    replaceNotes (state, notes) {
        state.notes = notes;
    },
    clearNotes(state) {
        state.notes = [];
        state.updatedNotes = [];
    },
    setUpdatedNotes(state, notes) {
        state.updatedNotes = notes;
    },
    incrementOrderKey(state) {
        state.currentOrderKey++;
    },
    incrementLastCheckedIndex(state) {
        state.lastCheckedIndex++;
    },
    decrementLastCheckedIndex(state) {
        state.lastCheckedIndex--;
    }
};

export default new Vuex.Store({
    state,
    mutations
})
