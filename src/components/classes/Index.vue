<style>
    .subject{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 240px;
    }
    form.hint {
        position: relative;
        width: 80%;
        max-width: 100%;
        margin: 0 auto 15px;
        background: #fff;
        padding: 15px;
        border-radius: 2px;
        box-shadow: 0 1px 5px #ccc;
    }
</style>

<template>
  <div class="subjects" ref="subjects">
    <subject v-for="(subject, i) in this.mySubjects"
            :subject="subject"
            :myKey="i"
            v-if="subject.key === myCurrentDisplaySubject">
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
    props: ['subject'],
    components: {
        Subject
    },
    computed: {
        ...mapGetters({
            mySubjects: 'getSubjects',
            myCurrentDisplaySubject: 'getCurrentDisplaySubject'
        })
    },
    methods: {
        ...mapMutations([
          'addSubject',
          'removeSubject'
        ])
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
        for (var index in this.mySubjects)
          if (this.mySubjects[index].key === subject.key) subjectExists = true;
        if (!subjectExists) this.addSubject(subject);
        this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
          packery.reloadItems()
          packery.layout()
        })
      })
      db.ref('subjects/' + uid).on('child_changed', (snapshot) => {
        var subjectExists = false;
        let subject = { subject: snapshot.val().subject,
                        lecturer: snapshot.val().lecturer,
                        timeFrom: snapshot.val().timeFrom,
                        timeTo: snapshot.val().timeTo,
                        key: snapshot.key
                      };
        for (var index in this.mySubjects) {
          if (this.mySubjects[index].key === subject.key) {
            this.mySubjects[index].subject = subject.subject;
            this.mySubjects[index].lecturer = subject.lecturer;
            this.mySubjects[index].timeFromt = subject.timeFrom;
            this.mySubjects[index].timeTo = subject.timeTo;
          }
        }
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

        this.removeSubject(index);
        this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
          packery.reloadItems()
          packery.layout()
        })
      })
    }
  }

</script>
