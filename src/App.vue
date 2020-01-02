<template>
<div id="app">
  <div class="app">
    <login @login='login' v-if='Auth == "login"' />
    <div v-if='Auth == "chat"' name="component-fade" mode="out-in">
      <topbar @tologin='tologin' />
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</div>
</template>
<script>
import login from './components/login'
import topbar from './components/topbar'

export default {
  name: 'app',
  data() {
    return {
      Auth: ''
    }
  },
  components: {
    login,
    topbar
  },
  mounted() {
    this.main()
  },
  methods: {
    tologin() {
      this.Auth = 'login'
    },
    login() {
      this.Auth = 'chat'
    },
    async main() {
      let vuecom = this
      console.log('main');

      function ok() {
        console.log('ok');
        vuecom.Auth = 'chat'
      }

      function err() {
        console.log('err');
        vuecom.Auth = 'login'

      }
      let data = {
        nik: 'nik'
      }
      this.send('main', data, ok, err)
    },
    async main2() {
      // event.preventDefault()
      if (login && password) {
        let response = await fetch('/chat/main', {
          method: 'POST',
          credentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nik: 'nik'
          })
        });
        if (response.ok) {
          this.auth == false
        } else if (response.status == 403) {
          this.auth == true
        }
      }
    },
    async send(path, data, ok, err) {
      let response = await fetch(`/chat/${path}`, {
        method: 'POST',
        creadentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        ok();
      } else if (response.status == 403) {
        err();
      }
    }
  },
}
</script>

<style>
/* .component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter {
  opacity: 0;
}

.component-fade-leave-to {
  opacity: 0;
} */

button,
a {
  cursor: pointer;
}

* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

#app,
body {
  margin: 0px;
  width: 100%;
  height: 100%;
  background: #fafafa;
  /* background-image: url(https://i.pinimg.com/originals/f9/27/f0/f927f04a41fa84f59726dc26765a5b45.jpg); */
  /* background-image: url(https://static2.aniimg.com/upload/20170507/253/W/l/Q/WlQEEF.jpg); */
  background-position: top;
  background-size: cover;
  overflow-x: hidden;
}

#app {
  /* opacity: 0.9; */
}

.app {
  height: 100%;
  width: 100%;
}
</style>
