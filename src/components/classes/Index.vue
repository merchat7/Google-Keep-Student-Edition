<style>
    .subject{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 240px;
    }
</style>

<template>

    <div class="subjects" ref="subjects">
        <subject v-for="subject in this.$store.state.subjects"
              :subject="subject"
              :key="subject.key">
        </subject>
    </div>

</template>

<script>

    import Packery from 'packery'
    import Draggabilly from 'draggabilly'
    import Note from './Class'
    import { db } from '../../firebase'
    import { mapMutations } from 'vuex'

    export default {

        components: {
            Note
        },
        methods: {
            ...mapMutations([
                'addSubject',
                'clearSubjects',
                'incrementOrderKey',
                'setUpdatedNotes',
                'incrementLastCheckedIndex'])
        },
        mounted() {
            this.clearSubjects(); // just for when code is updated, so that you don't need to refresh
            let packery = new Packery(this.$refs.subjects, {
                itemSelector: '.subject',
                columnWidth: 240,
                gutter: 16,
                fitWidth: true
            });
            db.ref('subjects').orderByChild("orderKey").on('child_added', (snapshot) => {
                let subject = {title: snapshot.val().title,
                    content: snapshot.val().content,
                    key: snapshot.key};
                this.addSubject(subject);
                this.incrementOrderKey();
                this.$nextTick(() => { // the new subject hasn't been rendered yet, but in the nextTick, it will be rendered
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
                    let subject = {
                        title: title,
                        content: content,
                        key: key
                    };
                    newNotes.push(subject);
                    let updates = {};
                    updates['subjects/' + key + '/orderKey'] = currentIndex;
                    db.ref().update(updates);
                    currentIndex--;
                }
                this.setUpdatedNotes(newNotes);
            });
        }
    }

</script>
