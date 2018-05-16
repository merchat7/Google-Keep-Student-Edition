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

    form.create-subject input {
        width: 100%;
        max-width: 100%;
        border: none;
        padding: 4px;
        outline: none;
        font-size: 1.2em;
    }

    form.create-subject button {
        position: absolute;
        right: 18px;
        bottom: -18px;
        background: #41b883;
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

    <form class="create-subject" v-on:submit.prevent="createSubject()">
        <input name="title" v-model="title" placeholder="Subject Name" />
        <input name="content" v-model="content" placeholder="Lecturer" rows="3"></input>
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
              label="Picker in menu"
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
            label="Picker in menu"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="timeTo" @change="$refs.menuTo1.save(timeTo)"></v-time-picker>
        </v-menu>
      </v-flex>
      </v-layout>
      <button type="submit">+</button>
    </form>

</template>

<script>
    import { auth,db } from '../../firebase'
    import { mapMutations } from 'vuex'
    export default {
        data() {
          return {
              title: '',
              content: '',
              menuFrom: false,
              timeFrom: null,
              menuTo: false,
              timeTo: null
          }
        },
        methods: {
          ...mapMutations(['replaceSubject']),
          createSubject() {
            const uid = auth.currentUser.uid;
            if (this.$store.state.updatedSubjects.length > 0) this.replaceSubject(this.$store.state.updatedSubjects);
            if (this.title.trim() || this.content.trim()) {
              db.ref('subjects/' + uid).push({
                title: this.title,
                content: this.content,
                orderKey: this.$store.state.currentOrderKey
              }, (err) => {
                if (err) {
                  alert(err)
                }
                this.title = '';
                this.content = '';
              })
            }
          }
        }
    }

</script>
