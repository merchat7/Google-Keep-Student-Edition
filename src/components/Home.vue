<template>
    <v-ons-page>
        <v-app id="inspire">
            <v-navigation-drawer
                    v-model="drawer"
                    fixed
                    clipped
                    class="grey lighten-4"
                    app
            >
                <v-list
                        dense
                        class="grey lighten-4"
                >
                    <v-flex xs6>
                        <v-subheader>Classes</v-subheader>
                    </v-flex>
                    <!--  Add class/note -->
                    <v-list-tile
                            avatar
                            ripple
                            v-if="myCurrentDisplaySubject === null"
                            @click="addClassButton=!addClassButton"
                    >
                        <v-list-tile-action>
                            <v-icon>add</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="text">
                                Add new class
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                            avatar
                            ripple
                            v-else-if="myCurrentDisplaySubject != null && !inClassAddNote"
                            @click="addClassButton=!addClassButton
                          inClassAddNote = !inClassAddNote"
                    >
                        <v-list-tile-action>
                            <v-icon>add</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="text">
                                Add new note
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                            avatar
                            ripple
                            v-else-if="myCurrentDisplaySubject != null && inClassAddNote"
                            @click="inClassAddNote = !inClassAddNote"
                    >
                        <v-list-tile-action>
                            <v-icon>add</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="text">
                                Update class information
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!--  -->
                    <template v-for="(subject, i) in this.mySubjects">
                        <v-list-tile
                                :key="i"
                                ripple
                                @click="toggleClass(subject.key)"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title class="grey--text">
                                    {{ subject.subject }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                    <v-list-tile
                            avatar
                            ripple
                            @click="logout"
                    >
                        <v-list-tile-action>
                            <v-icon>archive</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="text">
                                Log Out
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-toolbar color="amber" app absolute clipped-left>
                <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
                <span class="title ml-3 mr-5">Google&nbsp;<span class="text">Keep</span></span>
                <v-spacer></v-spacer>
            </v-toolbar>
            <classes style="display: none;"></classes>
            <v-content v-if="!addClassButton && myCurrentDisplaySubject === null">
                <v-container>
                    <form class="create-subject">
                        <h1 class="grey--text"> Welcome to Google Keep Student Edition </h1>
                        <pre>Head to your next stop through items in the drawer!</pre>
                    </form>
                </v-container>
            </v-content>
            <v-content v-else-if="addClassButton && myCurrentDisplaySubject === null">
                <v-container>
                    <create-class-form></create-class-form>
                </v-container>
            </v-content>
            <v-content v-else="myCurrentDisplaySubject != null">
                <v-container v-if="!inClassAddNote">
                    <update-class></update-class>
                </v-container>
                <v-container v-else-if="inClassAddNote">
                    <create-note-form></create-note-form>
                </v-container>
                <v-container fluid>
                    <classes></classes>
                </v-container>
                <v-container>
                    <notes></notes>
                </v-container>
            </v-content>
        </v-app>
    </v-ons-page>
</template>

<script>
  import { db,auth } from '../firebase'
  import Classes from './classes/Index'
  import UpdateClass from './classes/Update'
  import Notes from './notes/Index'
  import CreateClassForm from './classes/Create'
  import CreateNoteForm from './notes/Create'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    data: () => ({
      drawer: null,
      addClassButton: false,
      inClassAddNote: false,
      currentDisplaySubject: null
    }),
    props: {
      source: String
    },
    computed: {
        ...mapGetters({
            mySubjects: 'getSubjects',
            myCurrentDisplaySubject: 'getCurrentDisplaySubject'
        })
    },
    components: {
      Classes,
      Notes,
      UpdateClass,
      CreateClassForm,
      CreateNoteForm
     },
    methods: {
      ...mapMutations([
        'setCurrentDisplaySubject',
        'setCurrentNoteRef',
        'setSelectedNote'
      ]),
      logout: function() {
        auth.signOut().then(() => {
          this.$router.replace('login')
        })
      },
      toggleClass: function(key) {
          const uid = auth.currentUser.uid;
          this.setCurrentNoteRef(null);
          this.setSelectedNote(null);
          if (key !== this.myCurrentDisplaySubject) {
              this.setCurrentDisplaySubject(null);
              // workaround to force mounted in component/notes/Index.vue to be called
              let sleep = function(time) {return new Promise((resolve) => setTimeout(resolve, time));};
              sleep(100).then(() => {
                  this.setCurrentDisplaySubject(key);
                  this.setCurrentNoteRef(db.ref('notes/' + uid + this.myCurrentDisplaySubject))
              });
          } else {
              this.setCurrentDisplaySubject(null);
          }
      }
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
