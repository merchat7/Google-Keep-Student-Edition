<style>

  .subject {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 5px #ccc;
    padding: 10px;
    margin: 8px 0;
    width: 100%;
  }

  .subject h1 {
    font-size: 1.1em;
    margin-bottom: 6px;
    word-wrap: break-word;
  }

  .subject pre {
    font-size: 1.1em;
    margin-bottom: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }

</style>

<template>

<div class="subject">
  <v-layout row wrap>
    <v-flex xs11 sm7>
      <h1>{{subject.subject}}</h1>
      <pre>{{subject.lecturer}}</pre>
      <pre>{{subject.timeFrom}}</pre>
      <pre>{{subject.timeTo}}</pre>
      <div id="myKey" style="display: none;">{{subject.key}}</div>
    </v-flex>
    <v-flex xs11 sm5>
      <v-btn block large color="primary" @click="editSubject" >Edit Class</v-btn>
      <v-btn block large color="error" @click="deleteSubject" >Remove Class</v-btn>
    </v-flex>
  </v-layout>
</div>

</template>

<script>
  import Packery from 'packery'
  import { db,auth } from '../../firebase'

  export default {
    props: ['subject'],
    data() {
      return { subjects: [] }
    },
    methods: {
      deleteSubject() {
        const uid = auth.currentUser.uid;
        db.ref('subjects/' + uid).child(this.subject.key).remove();
      },
      editSubject() {

      }
    }
  }
</script>
