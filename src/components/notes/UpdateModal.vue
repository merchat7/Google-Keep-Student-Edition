<template>
    <v-ons-dialog
            cancelable
            :visible.sync="show"
            v-if="note"
            modifier="update"
    >
        <form class="edit-note" v-on:submit.prevent="update" v-on:click.stop="">
            <input name="title" v-model="note.title" placeholder="Title"/>
            <textarea name="content" v-model="note.content" placeholder="Text goes here..." rows="8">
            </textarea>
            <button type="submit" @click="show = false">Save</button>
        </form>
    </v-ons-dialog>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        props: ['note', 'showModal'],
        computed: {
            show: {
                get () {
                    return this.showModal;
                },
                set(value) {
                    if (!value) {
                        this.$emit("close");
                    }
                }
            }
        },
        methods: {
            ...mapMutations([
                'setSelectedNote',
                'replaceNoteByKey']),
            update () {
                this.$store.state.currentNoteRef.child(this.note.key).update(
                    {
                        title : this.note.title,
                        content : this.note.content
                    });
                let noteLocal = {title: this.note.title,
                    content: this.note.content,
                    key: this.note.key,
                    index: this.note.index};
                this.replaceNoteByKey(noteLocal);
                this.$ons.notification.toast('Note saved', { timeout: 2000, animation:"fall"} );
            },
        }
    }
</script>

<style>
    .dialog--update {
        height: 60vh;
    }
    form.edit-note{
        height: 100%;
        max-width: 100%;
        background: #fff;
        padding: 15px;
        border-radius: 2px;
        box-shadow: 0 1px 50px #555;
    }
    form.edit-note input{
        height: 10%;
        width: 100%;
        max-width: 100%;
        border: none;
        padding: 4px;
        outline: none;
        font-size: 1.2em;
    }
    form.edit-note textarea{
        height: 80%;
        width: 100%;
        max-width: 100%;
        border: none;
        padding: 4px;
        outline: none;
        font-size: 1.2em;
        resize: none;
    }
    form.edit-note button[type=submit]{
        font-size: 18px;
        background: #41b883;
        color: #fff;
        border: none;
        border-radius: 3px;
        opacity: 1;
        padding: 4px 6px;
        margin: 0;
    }
    form.edit-note button{
        background: none;
        border: none;
        float: right;
        font-size: 20px;
        opacity: 0.6;
        transition: opacity .5s;
        margin: 0 4px 0 0;
    }
    form.edit-note button:hover, form.edit-note button:focus{
        opacity: 1;
    }
</style>