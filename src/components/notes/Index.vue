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
        <note v-for="(note, index) in this.myNotes"
              :note="note"
              :index="index"
              :key="note.key">
        </note>
    </div>

</template>

<script>

    import Packery from 'packery'
    import Draggabilly from 'draggabilly'
    import Note from './Note'
    import { db } from '../../firebase'
    import { mapMutations, mapGetters } from 'vuex'
    import ReminderFunc from './ReminderModal'

    export default {
        components: {
            Note
        },
        computed: {
            ...mapGetters({
                myNotes: 'getNotes'
            })
        },
        methods: {
            ...mapMutations([
                'addNote',
                'clearNotes',
                'setNotes',
                'incrementLastCheckedIndex',
                'setDragging']),
            setReminderNotification (note) {
                // TODO: Refactor, similiar function in ReminderModal
                let timeTillNotify = note.reminderTime - Date.now();
                if (timeTillNotify >= 0 && timeTillNotify < 2147483647) {
                    return setTimeout(() => {this.$notify({
                        group: 'reminder',
                        title: note.title + " (" + ReminderFunc.methods.formatDate(new Date(Date.now())) + ")",
                        text: note.content,
                    });}, timeTillNotify);
                }
            }
        },
        mounted() {
            this.clearNotes(); // just for when code is updated, so that you don't need to refresh
            let packery = new Packery(this.$refs.notes, {
                itemSelector: '.note',
                columnWidth: 240,
                gutter: 16,
                fitWidth: true
            });
            db.ref('notes').orderByChild("orderKey").off();
            db.ref('notes').orderByChild("orderKey").on('child_added', (snapshot) => {
                let note = {title: snapshot.val().title,
                    content: snapshot.val().content,
                    reminderTime: snapshot.val().reminderTime,
                    key: snapshot.key};
                note["reminderAlert"] = this.setReminderNotification(note);
                this.addNote(note);
                this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
                    //https://codepen.io/anon/pen/NMBvLM check here for more info
                    packery.reloadItems();
                    let items = packery.getItemElements().reverse(); // Workaround to make it easier to keep track of new elements added
                    let currentIndex = this.$store.state.lastCheckedIndex;
                    let updateDragStatus = function(bool) {
                        let sleep = function(time) {return new Promise((resolve) => setTimeout(resolve, time));};
                        if (!bool) sleep(100).then(() => {this.setDragging(bool);}); // sleep is used as mouseDown event is triggered after dragEnd event
                        else {this.setDragging(bool);}
                    };
                    for (currentIndex; currentIndex < items.length; currentIndex++) {
                        let draggie = new Draggabilly(items[currentIndex]);
                        draggie.on( 'dragStart', updateDragStatus.bind(this, true));
                        draggie.on( 'dragEnd', updateDragStatus.bind(this, false));
                        packery.bindDraggabillyEvents(draggie);
                        this.incrementLastCheckedIndex();
                    }
                    packery.layout()
                })
            });
            db.ref('notes').orderByChild("orderKey").on('child_removed', () => {
                this.$nextTick(() => {
                    packery.reloadItems();
                    packery.layout()
                })
            });

            packery.on( 'dragItemPositioned', () => {
                let items = packery.getItemElements();
                let currentIndex = items.length-1;
                let newNotes = [];
                for (let i = 0; i < items.length; i++) {
                    let index = items[i].children[2].innerHTML;
                    let note = this.$store.state.notes[index];
                    let key = note.key;
                    newNotes.push(note);
                    let updates = {};
                    updates['notes/' + key + '/orderKey'] = currentIndex;
                    db.ref().update(updates);
                    currentIndex--;
                }
                this.setNotes(newNotes);
            });
        }
    }

</script>
