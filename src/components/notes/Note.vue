<style>
    .note{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 80%;
        margin-right: 10%;
        margin-left: 10%;
        transition: box-shadow .5s;
        cursor: default;
    }
    .note h1{
        font-size: 1.1em;
        margin-bottom: 6px;
        word-wrap: break-word;
    }
    .note pre {
        font-size: 1.1em;
        margin-bottom: 10px;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: inherit;
    }
</style>

<template>

<div class="note" @click=noteClicked>
    <h1>{{note.title}}</h1>
    <pre>{{note.content}}</pre>
    <div id="myIndex" style="display: none;">{{this.index}}</div>
    <v-ons-action-sheet
            :visible.sync="actionSheetVisible1"
            cancelable
            title="Note actions"
    >
        <v-ons-action-sheet-button v-for="(item, index) in items" :key="index" @click=menuClicked(item.name)>{{item.title}}</v-ons-action-sheet-button>
        <v-ons-action-sheet-button @click="hideActionSheets">Cancel</v-ons-action-sheet-button>
    </v-ons-action-sheet>
    <v-ons-action-sheet
            :visible.sync="actionSheetVisible2"
            cancelable
            title="Note actions"
    >
        <v-ons-action-sheet-button v-for="(item, index) in items" :key="index" @click=menuClicked(item.name)>{{item.title}}</v-ons-action-sheet-button>
        <v-ons-action-sheet-button @click=menuClicked(removeName)>Remove reminder</v-ons-action-sheet-button>
        <v-ons-action-sheet-button @click="hideActionSheets">Cancel</v-ons-action-sheet-button>
    </v-ons-action-sheet>
    <ReminderModal :showModal="showReminder" :note="this.note" :index="this.index" @close="showReminder=false"></ReminderModal>
    <update-modal :showModal="showUpdate" :note="cloneNote" @close="showUpdate=false"></update-modal>
</div>

</template>

<script>
    import { mapMutations } from 'vuex'
    import ReminderModal from './ReminderModal';
    import UpdateModal from './UpdateModal'

    export default {
        data: () => ({
            actionSheetVisible1: false,
            actionSheetVisible2: false,
            showReminder: false,
            showUpdate: false,
            cloneNote: null,
            removeName: 'removeReminder',
            items: [
                {
                    title: 'Edit note',
                    name: 'Edit'
                },
                {
                    title: 'Delete note',
                    name: 'Delete'
                },
                {
                    title: 'Set reminder',
                    name: 'setReminder'
                },
            ]
        }),
        props: [
            'note',
            'index'
        ],
        components: {
            ReminderModal,
            UpdateModal
        },
        methods: {
            ...mapMutations([
                'setSelectedNote',
                'removeNote']),
            noteClicked() {
                if (!this.$store.state.dragging) {
                    if (!this.note.reminderTime) this.actionSheetVisible1 = true;
                    else this.actionSheetVisible2 = true;
                }
            },
            menuClicked(name) {
                this.hideActionSheets();
                if (name === "Edit") this.edit();
                else if (name === "Delete") this.remove();
                else if (name === "setReminder") this.showReminder = true;
                else if (name === "removeReminder") this.removeReminder();
            },
            hideActionSheets() {
                this.actionSheetVisible1 = false;
                this.actionSheetVisible2 = false;
            },
            edit() {
                const clone = {...this.note}; // ensure only modified after pressing "save"
                clone["index"] = this.index;
                this.cloneNote = clone;
                this.showUpdate = true;
            },
            remove () {
                clearTimeout(this.$store.state.notes[this.index]["reminderAlert"]);
                this.removeNote(this.index); // Must remove locally before removing remotely, or buggy behavior
                this.$store.state.currentNoteRef.child(this.note.key).remove();
                this.$ons.notification.toast('Note removed', { timeout: 2000, animation:"fall"} );
            },
            removeReminder () {
                this.$store.state.notes[this.index]["reminderTime"] = null; // Vue cannot detect if delete object[key] is done
                clearTimeout(this.$store.state.notes[this.index]["reminderAlert"]);
                this.$store.state.notes[this.index]["reminderAlert"] = null;
                this.$store.state.currentNoteRef.child(this.note.key + "/reminderTime").remove();
                this.$ons.notification.toast('Reminder removed', { timeout: 2000, animation:"fall"} );
            }
        }
    }

</script>
