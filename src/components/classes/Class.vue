<style>

    .subject{
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px #ccc;
        padding: 10px;
        margin: 8px 0;
        width: 75.6%;
        margin-right: 12.2%;
        margin-left: 12.2%;
    }

    .subject h1{
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
    <v-flex>
      <h1>{{subject.subject}}</h1>
      <pre>{{subject.lecturer}}</pre>
      <pre>{{subject.timeFrom}}</pre>
      <pre>{{subject.timeTo}}</pre>
      <div id="myKey" style="display: none;">{{subject.key}}</div>
    </v-flex>
    <v-btn outline medium fab color="pink" @click="deleteSubject" style="top: 30px;">
      <v-icon>delete</v-icon>
    </v-btn>
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
        location.reload()
      }
    }
  }
</script>
