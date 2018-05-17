<style>
    .note{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 240px; /* collumn size */
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
    .note button{
        background: none;
        border: none;
        font-size: 20px;
        opacity: 0;
        cursor: pointer;
        transition: opacity .5s;
        margin: 0 4px 0 0;
    }
    .note button.edit{
        float: right;
    }
    .note button.delete{
        float: left;
    }
    .note:hover, .note:focus{
        box-shadow: 0 2px 10px #999;
    }
    .note:hover button, .note:focus button{
        opacity: 0.6;
    }
    .note button:hover, .note button:focus{
        opacity: 1;
    }
</style>

<template>

<div class="note" @click=noteClicked>
    <h1>{{note.title}}</h1>
    <pre>{{note.content}}</pre>
    <div id="myKey" style="display: none;">{{note.key}}</div>
    <button class="delete" @click.stop="remove" type="button">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
    </button>
    <v-menu auto full-width open-on-hover>
        <button class="edit" type="button" slot="activator">
            <i class="fa fa-pencil" aria-hidden="true"></i>
        </button>
        <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index" @click=menuClicked(item.name)>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</div>

</template>

<script>
    import { db } from '../../firebase'
    import { mapMutations } from 'vuex'

    export default {
        data: () => ({
            showMenu: false,
            items: [
                {
                    title: 'Edit note',
                    name: 'Edit'
                },
                {
                    title: 'Set reminder',
                    name: 'Reminder'
                },
            ]
        }),
        props: [
            'note',
            'index'
        ],
        methods: {
            ...mapMutations([
                'setSelectedNote',
                'removeNote']),
            noteClicked() {
                if (!this.$store.state.dragging) this.edit();
            },
            menuClicked(name) {
                if (name === "Edit") this.edit();
            },
            edit() {
                const clone = {...this.note}; // ensure only modified after pressing "save"
                clone["index"] = this.index;
                this.setSelectedNote(clone);
            },
            remove () {
                this.removeNote(this.index); // Must remove locally before removing remotely, or buggy behavior
                db.ref('notes').child(this.note.key).remove();
            }
        }
    }

</script>
