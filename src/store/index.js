import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'

Vue.use(Vuex);

const state = {
    /* Notes related */
    notes: [],
    currentOrderKey: 0, // The orderKey when creating a new note
    lastCheckedIndex: 0, // to ensure Draggabilly is only bind once (otherwise buggy behavior)
    /*---------------*/
    selectedNote: null,
    dragging: false,
    subjects: [],
    currentNoteRef: db.ref("notes") //to be changed
};

const getters = {
    getNotes: state => state.notes,
    getSubjects: state => state.subjects
};

const mutations = {
    addNote (state, note) {
        state.notes.unshift(note);
        state.currentOrderKey++;
        // increment lastCheckedIndex when binding instead of here
    },
    replaceNoteByKey (state, note) {
        state.notes[note.index].title = note.title;
        state.notes[note.index].content = note.content;
        //currentOrderKey no change
        //lastChckedIndex no change
    },
    removeNote (state, index) {
        state.notes.splice(index, 1);
        updateOrderKeyInDB(state.notes);
        state.currentOrderKey--;
        state.lastCheckedIndex--;
    },
    clearNotes(state) {
        state.notes = [];
        state.currentOrderKey = 0;
        state.lastCheckedIndex = 0;
    },
    setNotes(state, notes) {
        state.notes = notes;
    },
    incrementLastCheckedIndex(state) {
        state.lastCheckedIndex++;
    },
    setSelectedNote(state, note) {
        state.selectedNote = note;
    },
    setDragging(state, bool) {
        state.dragging = bool;
    },
<<<<<<< HEAD
    addSubject(state, subject) {
        state.subjects.unshift(subject);
=======
    setCurrentNoteRef (state, ref) {
        state.currentNoteRef = ref;
>>>>>>> master
    }
};

function updateOrderKeyInDB (notes) {
    let currentIndex = notes.length-1;
    for (let i=0; i < notes.length; i++) {
        state.currentNoteRef.child(notes[i].key).update({orderKey: currentIndex});
        currentIndex--;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations
})
