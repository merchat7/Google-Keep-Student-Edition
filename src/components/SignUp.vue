<template>
  <div class="sign-up">
      <div id="login-box">
        <div class="left">
          <h1>Sign up</h1>

          <input type="text" v-model="email" name="email" placeholder="E-mail" />
          <input type="password" v-model="password" name="password" placeholder="Password" />
          <input type="password" v-model="password2" name="password2" placeholder="Retype password" />

          <button v-on:click="signUp" type="submit">Sign Me Up </button>
          <p>Or go back to <router-link to="/login">login</router-link></p>
        </div>

        <div class="right">
          <span class="loginwith">Sign in with<br/>social network</span>

          <button class="social-signin facebook">Log in with facebook</button>
          <button class="social-signin google">Log in with Google+</button>
        </div>
        <div class="or">OR</div>
      </div>
  </div>
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
      position: fixed;
      margin: 5% auto;
      width: 600px;
      height: 350px;
      top: 50%;
      left: 50%;
      margin-top: -150px;
      margin-left: -300px;
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

    .or {
      position: absolute;
      top: 125px;
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
      top: -45px;
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
