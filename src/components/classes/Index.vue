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
        <subject v-for="subject in subjects"
              :subject="subject"
              :key="subject.key">
        </subject>
    </div>

</template>

<script>
  import Packery from 'packery'
  import Draggabilly from 'draggabilly'
  import Subject from './Class'
  import { auth,db } from '../../firebase'
  import { mapMutations } from 'vuex'

  export default {
    components: {
        Subject
    },
    data() {
      return { subjects: [] }
    },
    mounted() {
      const uid = auth.currentUser.uid;
      let packery = new Packery(this.$refs.subjects, {
        itemSelector: '.subject',
        columnWidth: 800,
        gutter: 16,
        fitWidth: true
      });
      db.ref('subjects/' + uid).on('child_added', (snapshot) => {
        let subject = snapshot.val()
        this.subjects.unshift(subject)
        this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
          packery.reloadItems()
          packery.layout()
        })
      })
    }
  }

</script>
