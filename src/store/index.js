import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

Vue.use(Vuex);

const state = {
    /* Notes related */
    notes: [],
    updatedNotes: [], // After dragging, the new order is updated here (and should be updated before every operation)
    currentOrderKey: 0, // The orderKey when creating a new note
    lastCheckedIndex: 0, // to ensure Draggabilly is only bind once (otherwise buggy behavior)
    /*---------------*/
    selectedNote: null,
    dragging: false,
    class: null
};

const getters = {
    getNotes: state => state.notes
};

const mutations = {
    addNote (state, note) {
        if (state.updatedNotes.length > 0) state.notes = state.updatedNotes;
        state.notes.unshift(note);
        state.updatedNotes = [];
        state.currentOrderKey++;
        // increment lastCheckedIndex when binding instead of here
    },
    replaceNoteByKey (state, note) {
        if (state.updatedNotes.length > 0) state.notes = state.updatedNotes;
        let index = getIndexByKey(note.key);
        state.notes[index].title = note.title;
        state.notes[index].content = note.content;
        state.updatedNotes = [];
        //currentOrderKey no change
        //lastChckedIndex no change
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
        state.currentOrderKey = 0;
        state.lastCheckedIndex = 0;
    },
    setUpdatedNotes(state, notes) {
        state.updatedNotes = notes;
    },
    incrementLastCheckedIndex(state) {
        state.lastCheckedIndex++;
    },
    setSelectedNote(state, note) {
        state.selectedNote = note;
    },
    setDragging(state, bool) {
        state.dragging = bool;
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
    getters,
    mutations
})
