<template lang="html">
  <div class="login-component">
    <div class="all">
      <!-- <div class="com"> -->
        <form v-if='auth == "login"'  class='login-form' @submit='login' method="post">
          <p @click='tologin' class='btn'>To login</p>
          <p @click='toreg' class='btnr'>To rsegister</p>
          <p>Login</p>
          <input placeholder="Login" class="input"  type="text" id='login' name="" value="">
          <p>Password</p>
          <input placeholder="Password" class="input" type="text" id='password' name="" value="">
          <input class="input" type="submit" name="" value="Log in">
        </form>
        <form v-if='auth == "register"' class='login-form' @submit='registor' method="post">
          <p @click='tologin' class='btn'>To login</p>
          <p @click='toreg' class='btnr'>To rsegister</p>
          <p>Reg</p>
          <input placeholder="Login" class="input"  type="text" id='login' name="" value="">
          <p>Password</p>
          <input placeholder="Password" class="input" type="text" id='password1' name="" value="">
          <input placeholder="Repeat" class="input" type="text" id='password2' name="" value="">
          <input class="input" type="submit" name="" value="Log in">
        </form>
      <!-- </div> -->
      <!-- <div class="com">

      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      auth: 'login'
    }
  },
  mounted() {},
  methods: {
    async login() {
      event.preventDefault()
      let login = document.querySelector('#login').value
      let password = document.querySelector('#password').value
      if (login && password) {
        let response = await fetch('/chat/login', {
          method: 'POST',
          creadentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: login,
            pass: password
          })
        });
        if (response.ok) {
          this.$emit('login', '')
          console.log('ya');
        } else {
          console.log('no');
        }
      }
    },
    toreg() {
      this.auth = 'register'
    },
    tologin() {
      this.auth = 'login'
    },
    async registor() {
      event.preventDefault()

      let login = document.querySelector('#login').value
      let password1 = document.querySelector('#password1').value
      let password2 = document.querySelector('#password2').value
      if (login && password1 == password2 && password1) {
        let response = await fetch('/chat/reg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: login,
            pass: password1
          })
        });
        if (response.ok) {
          let res = await response.json();
          console.log('ya');
          if (res.status == 1) {
            alert('Такой пользователь уже есть ')
          } else {
            this.$emit('login', '')
          }
        } else {
          console.log('no');
        }
      }
    },

  }
};
</script>

<style lang="css" scoped>
.login-form{
  display: flex;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  position: relative;
}
.btn{
  display: block;
  position: absolute;
  top: 0px;
  left: 10px;
  cursor: pointer;
  /* background: #fafbfc; */

}
.btnr{
  position: absolute;
  top: 00px;
  right: 10px;
  cursor: pointer;
}
.com{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  background: #fff;
}
.all{
  width: 360px;
  box-shadow: 0px 0px 50px 1px #0002;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items:center;
}
.com{
  padding: 10px;
}
.input{
  width: 300px;
  height: 35px;
  font-size: 15px;
  background: #fff;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  border-radius: 5px;
  padding-left: 10px;
}
.login-component{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
