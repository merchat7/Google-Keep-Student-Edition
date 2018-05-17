<template>
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
        <v-list-tile
          avatar
          ripple
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
        <template v-for="(subject, i) in this.mySubjects">
          <!-- <v-divider
            v-else-if="item.divider"
            :key="i"
            class="my-3"
          ></v-divider> -->
          <v-list-tile
            :key="i"
            ripple
            @click=""
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
      <v-text-field
        solo-inverted
        flat
        label="Search"
        prepend-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-spacer></v-spacer>
      <v-container v-if="addClassButton">
        <create-note-form></create-note-form>
      </v-container>
      <v-container fluid>
        <notes></notes>
        <update-modal :note="this.$store.state.selectedNote ? this.$store.state.selectedNote : null"></update-modal>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { auth } from '../firebase'
  import Notes from './classes/Index'
  import CreateNoteForm from './classes/Create'
  import { mapMutations, mapGetters } from 'vuex'
  // import UpdateModal from './notes/UpdateModal'
  export default {
    data: () => ({
      drawer: null,
      addClassButton: false,
      items: [
        { divider: true },
        { icon: 'archive', text: 'Archive', function: '' },
        { icon: 'delete', text: 'Trash', function: '' },
        { divider: true },
      ]
    }),
    props: {
      source: String
    },
    computed: {
        ...mapGetters({
            mySubjects: 'getSubjects'
        })
    },
    components: {
      Notes,
      CreateNoteForm,
      // UpdateModal
     },
    methods: {
      logout: function() {
        auth.signOut().then(() => {
          console.log(this.mySubjects.length);
          this.$router.replace('login')
        })
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
