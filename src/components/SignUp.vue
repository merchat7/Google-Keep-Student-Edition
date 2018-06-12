<template>
  <v-ons-page>
    <div class="sign-up">
        <div id="login-box">
          <div class="center">
            <h1>Sign up</h1>

            <input type="text" v-model="email" name="email" placeholder="E-mail" />
            <input type="password" v-model="password" name="password" placeholder="Password" />
            <input type="password" v-model="password2" name="password2" placeholder="Retype password" />

            <button v-on:click="signUp" type="submit">Confirm</button>
            <p>Or go back to <router-link to="/login">login</router-link></p>
          </div>
        </div>
    </div>
  </v-ons-page>
</template>

<script>
  import { auth } from '../firebase'
  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: '',
        password2: '',
      }
    },
    methods: {
      signUp: function() {
        if (this.password === this.password2) {
          auth.createUserWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              this.$router.replace('login')
            },
            (err) => {
              alert('Oops. ' + err.message)
            }
          );
        } else {
          alert('Password was retyped incorrectly')
        }
      }
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
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin: auto;
      border-radius: 2px;
    }

    .center {
      position: relative;
      top: 0;
      left: 0;
      margin: auto;
      box-sizing: border-box;
      padding: 40px;
      width: 300px;
      height: 400px;
    }

    h1 {
      margin: 0 0 20px 0;
      font-weight: lighter;
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
      margin-bottom: 25px;
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
</style>
