<style>

    form.create-subject {
        position: relative;
        width: 80%;
        max-width: 100%;
        margin: 0 auto 15px;
        background: #fff;
        padding: 15px;
        border-radius: 2px;
        box-shadow: 0 1px 5px #ccc;
    }

    form.create-subject input[type="notTimePicker"] {
        width: 100%;
        max-width: 100%;
        border: none;
        padding: 4px;
        outline: none;
        font-size: 1.2em;
        padding-top: 20px;
    }

    form.create-subject button[type="edit"] {
        position: absolute;
        right: 18px;
        bottom: -18px;
        background: #307fff;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        outline: none;
    }

</style>

<template>

    <form class="create-subject" v-on:submit.prevent="editSubject()">
        <h1 class="grey--text">Edit Class Information</h1>
        <v-layout row wrap>
          <v-flex xs11 sm5>
            <v-menu
              ref="menuFrom1"
              :close-on-content-click="false"
              v-model="menuFrom"
              :nudge-right="40"
              :return-value.sync="timeFrom"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
            <v-text-field
              slot="activator"
              v-model="timeFrom"
              label="From"
              prepend-icon="access_time"
              readonly
            ></v-text-field>
            <v-time-picker v-model="timeFrom" @change="$refs.menuFrom1.save(timeFrom)"></v-time-picker>
          </v-menu>
        </v-flex>
        <v-flex xs11 sm5>
          <v-menu
            ref="menuTo1"
            :close-on-content-click="false"
            v-model="menuTo"
            :nudge-right="40"
            :return-value.sync="timeTo"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
          <v-text-field
            slot="activator"
            v-model="timeTo"
            label="To"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="timeTo" @change="$refs.menuTo1.save(timeTo)"></v-time-picker>
        </v-menu>
      </v-flex>
      </v-layout>
      <input name="subject" type="notTimePicker" v-model="subject" placeholder="Subject Name" />
      <v-divider></v-divider>
      <input name="lecturer" type="notTimePicker" v-model="lecturer" placeholder="Lecturer" rows="3"></input>
      <button type="edit">
        <v-icon>edit</v-icon>
      </button>
    </form>

</template>

<script>
    import { auth,db } from '../../firebase'
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        data() {
          return {
              subject: '',
              lecturer: '',
              menuFrom: false,
              timeFrom: null,
              menuTo: false,
              timeTo: null
          }
        },
        computed: {
            ...mapGetters({
                mySubjects: 'getSubjects',
                myCurrentDisplaySubject: 'getCurrentDisplaySubject'
            })
        },
        methods: {
          ...mapMutations(['replaceSubject']),
          editSubject() {
              const uid = auth.currentUser.uid;
              if (this.subject === null || this.lecturer === null || this.timeFrom === null || this.timeTo === null) {
                alert("Please fill in all required information!")
              } else {
                db.ref('subjects/' + uid).child(this.myCurrentDisplaySubject).update({
                  subject: this.subject,
                  lecturer: this.lecturer,
                  timeFrom: this.timeFrom,
                  timeTo: this.timeTo,
                });
                let classLocal = {
                  subject: this.subject,
                  lecturer: this.lecturer,
                  timeFrom: this.timeFrom,
                  timeTo: this.timeTo,
                  key: this.myCurrentDisplaySubject
                };
                // this.replaceClassByKey(classLocal);
                this.$notify({
                    group: 'info',
                    title: '[Success]',
                    text: "Class changes saved",
                    type: 'success'
                });
            }
          }
        }
    }

</script>
