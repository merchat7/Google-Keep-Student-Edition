import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

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
        state.currentOrderKey++;
    },
    replaceNotes (state, notes) {
        state.notes = notes;
    },
    removeNote (state, key) {
        if (state.updatedNotes.length > 0) state.notes = state.updatedNotes;
        let index = getIndexByKey(key);
        state.notes.splice(index, 1);
        updateOrderKeyInDB(state.notes);
        state.updatedNotes = [];
        state.currentOrderKey--;
        state.lastCheckedIndex--;
    },
    clearNotes(state) {
        state.notes = [];
        state.updatedNotes = [];
    },
    setUpdatedNotes(state, notes) {
        state.updatedNotes = notes;
    },
    incrementLastCheckedIndex(state) {
        state.lastCheckedIndex++;
    }
};

function updateOrderKeyInDB (notes) {
    let currentIndex = notes.length-1;
    for (let i=0; i < notes.length; i++) {
        db.ref('notes/').child(notes[i].key).update({orderKey: currentIndex});
        currentIndex--;
    }
}

function getIndexByKey(key) {
    for (let index=0; index < state.notes.length; index++) {
        if (state.notes[index].key === key) return index;
    }
}

export default new Vuex.Store({
    state,
    mutations
})
