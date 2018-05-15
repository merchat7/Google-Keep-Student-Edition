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
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile
            v-else
            :key="i"
            @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
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
      <v-container>
        <create-note-form></create-note-form>
      </v-container>
      <v-container fluid>
        <notes></notes>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Notes from './components/notes/Index'
  import CreateNoteForm from './components/notes/Create'
  export default {
    data: () => ({
      drawer: null,
      items: [
        { icon: 'lightbulb_outline', text: 'Notes' },
        { icon: 'touch_app', text: 'Reminders' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'add', text: 'Create new label' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ]
    }),
    props: {
      source: String
    },
    components: {
      Notes,
      CreateNoteForm
    }
  }
</script>

<style scoped>
    *:focus {
    outline: none;
    }

    body {
    margin: 0;
    padding: 0;
    background: #DDD;
    font-size: 16px;
    color: #222;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    }

    #login-box {
    position: relative;
    margin: 5% auto;
    width: 600px;
    height: 400px;
    background: #FFF;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    .left {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 40px;
    width: 300px;
    height: 400px;
    }

    h1 {
    margin: 0 0 20px 0;
    font-weight: 300;
    font-size: 28px;
    }

    input[type="text"],
    input[type="password"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #AAA;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    transition: 0.2s ease;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
    border-bottom: 2px solid #16a085;
    color: #16a085;
    transition: 0.2s ease;
    }

    button[type="submit"] {
    margin-top: 15px;
    width: 120px;
    height: 32px;
    background: #16a085;
    border: none;
    border-radius: 2px;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    transition: 0.1s ease;
    cursor: pointer;
    }

    button[type="submit"]:hover,
    button[type="submit"]:focus {
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
    }

    input[type="submit"]:active {
    opacity: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
    }

    .or {
    position: absolute;
    top: 155px;
    left: 280px;
    width: 40px;
    height: 40px;
    background: #DDD;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    line-height: 40px;
    text-align: center;
    }

    .right {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    padding: 40px;
    width: 300px;
    height: 400px;
    background: url('https://goo.gl/YbktSj');
    background-size: cover;
    background-position: center;
    border-radius: 0 2px 2px 0;
    }

    .right .loginwith {
    display: block;
    margin-bottom: 40px;
    font-size: 28px;
    color: #FFF;
    text-align: center;
    }

    button.social-signin {
    margin-bottom: 20px;
    width: 220px;
    height: 36px;
    border: none;
    border-radius: 2px;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    transition: 0.2s ease;
    cursor: pointer;
    }

    button.social-signin:hover,
    button.social-signin:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.2s ease;
    }

    button.social-signin:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.2s ease;
    }

    button.social-signin.facebook {
    background: #32508E;
    }

    button.social-signin.twitter {
    background: #55ACEE;
    }

    button.social-signin.google {
    background: #DD4B39;
    }
</style>
