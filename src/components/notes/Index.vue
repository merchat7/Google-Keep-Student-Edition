<style>
    .note{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 240px;
    }
</style>

<template>

<div class="notes" ref="notes">
    <note v-for="note in this.$store.state.notes"
          :note="note">
    </note>
</div>

</template>

<script>

import Firebase from 'firebase'
import Packery from 'packery'
import Draggabilly from 'draggabilly'
import Note from './Note'

export default {
    components: {
        Note
    },
    mounted() {
        this.$store.state.notes = [];
        let packery = new Packery(this.$refs.notes, {
            itemSelector: '.note',
            columnWidth: 240,
            gutter: 16,
            fitWidth: true
        });
        let firebase = new Firebase('https://keep-student-edition.firebaseio.com');
        let currentIndex = 0;
        firebase.child('notes').on('child_added', (snapshot) => {
            let note = {title: snapshot.val().title,
                        content: snapshot.val().content,
                        key: snapshot.key()};
            this.$store.state.notes.unshift(note);
            this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
              //https://codepen.io/anon/pen/NMBvLM check here for more info
              let items = packery.getItemElements();
              for (let i = currentIndex; i < items.length; i++) {
                let draggie = new Draggabilly(items[i]);
                packery.bindDraggabillyEvents(draggie);
                currentIndex++;
              }
              packery.reloadItems();
              packery.layout();
            })
        });

        packery.on( 'dragItemPositioned', () => {
          let currentIndex = 0;
          const items = packery.getItemElements();
          for (let i = currentIndex; i < items.length; i++) {
            let title = items[i].getElementsByTagName("h1")[0].innerHTML;
            let content = items[i].getElementsByTagName("pre")[0].innerHTML;
            let key = this.$store.state.notes[i].key;
            if (title === this.$store.state.notes[i].title && content === this.$store.state.notes[i].content) {
              continue;
            }
            let note = {title: title,
                        content: content,
                        key: key};
            this.$store.state.notes[i] = note;
            firebase.child('notes/' + key).set({title:title, content:content});
            currentIndex++;
          }
        });
    }
}

</script>
