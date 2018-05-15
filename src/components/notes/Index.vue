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
              :note="note"
              :key="note.key">
        </note>
    </div>

</template>

<script>

    import Packery from 'packery'
    import Draggabilly from 'draggabilly'
    import Note from './Note'
    import { db } from '../../firebase'
    import { mapMutations } from 'vuex'

    export default {

        components: {
            Note
        },
        methods: {
            ...mapMutations([
                'addNote',
                'clearNotes',
                'incrementOrderKey',
                'setUpdatedNotes',
                'incrementLastCheckedIndex'])
        },
        mounted() {
            this.clearNotes(); // just for when code is updated, so that you don't need to refresh
            let packery = new Packery(this.$refs.notes, {
                itemSelector: '.note',
                columnWidth: 240,
                gutter: 16,
                fitWidth: true
            });
            db.ref('notes').orderByChild("orderKey").on('child_added', (snapshot) => {
                let note = {title: snapshot.val().title,
                    content: snapshot.val().content,
                    key: snapshot.key};
                this.addNote(note);
                this.incrementOrderKey();
                this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
                    //https://codepen.io/anon/pen/NMBvLM check here for more info
                    packery.reloadItems();
                    let items = packery.getItemElements().reverse(); // Workaround to make it easier to keep track of new elements added
                    let currentIndex = this.$store.state.lastCheckedIndex;
                    for (currentIndex; currentIndex < items.length; currentIndex++) {
                        let draggie = new Draggabilly(items[currentIndex]);
                        packery.bindDraggabillyEvents(draggie);
                        this.incrementLastCheckedIndex();
                    }
                    packery.layout()
                })
            });

            packery.on( 'dragItemPositioned', () => {
                let items = packery.getItemElements();
                let currentIndex = items.length-1;
                let newNotes = [];
                for (let i = 0; i < items.length; i++) {
                    let title = items[i].getElementsByTagName("h1")[0].innerHTML;
                    let content = items[i].getElementsByTagName("pre")[0].innerHTML;
                    let key = items[i].children[2].innerHTML;
                    let note = {
                        title: title,
                        content: content,
                        key: key
                    };
                    newNotes.push(note);
                    let updates = {};
                    updates['notes/' + key + '/orderKey'] = currentIndex;
                    db.ref().update(updates);
                    currentIndex--;
                }
                this.setUpdatedNotes(newNotes);
            });
        }
    }

</script>
