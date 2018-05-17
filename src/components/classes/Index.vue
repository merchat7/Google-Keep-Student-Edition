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
    <subject v-for="subject in this.mySubjects"
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
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    components: {
        Subject
    },
    computed: {
        ...mapGetters({
            mySubjects: 'getSubjects'
        })
    },
    methods: {
        ...mapMutations(['addSubject'])
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
        var subjectExists = false;
        let subject = { subject: snapshot.val().subject,
                        lecturer: snapshot.val().lecturer,
                        timeFrom: snapshot.val().timeFrom,
                        timeTo: snapshot.val().timeTo,
                        key: snapshot.key
                      };
        console.log("SUBJECT: " + subject.key);
        for (var oldSubject in this.mySubjects) {
          console.log("SUBJECT OLD: " + oldSubject.key);
          if (oldSubject.key === subject.key) subjectExists = true;
        }
        if (subjectExists === false) this.addSubject(subject);
        this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
          packery.reloadItems()
          packery.layout()
        })
      })
      db.ref('subjects/' + uid).on('child_removed', (snapshot) => {
        var index = 0;

        for (let i=0; i < this.subjects.length; i++) {
          if (this.subjects[i].key === snapshot.key) {
            index = i;
            break;
          }
        }

        this.subjects.splice(index, 1)
        this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
          packery.reloadItems()
          packery.layout()
        })
      })
    }
  }

</script>
