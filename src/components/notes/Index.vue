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
    <note v-for="note in notes" :note="note">
    </note>
</div>

</template>

<script>

import Firebase from 'firebase'
import Masonry from 'masonry-layout'
import Note from './Note'
export default {
    components: {
        Note
    },
    data() {
        return {
            notes: []
        }
    },
    mounted() {
        console.log(this.$refs)
        console.log(this.$refs.notes)
        let masonry = new Masonry(this.$refs.notes, {
            itemSelector: '.note',
            columnWidth: 240,
            gutter: 16,
            fitWidth: true
        })
        let firebase = new Firebase('https://keep-student-edition.firebaseio.com')
        firebase.child('notes').on('child_added', (snapshot) => {
            let note = snapshot.val()
            this.notes.unshift(note)
            this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
                masonry.reloadItems()
                masonry.layout()
            })
        })
    }
}

</script>
