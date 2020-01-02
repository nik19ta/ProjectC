<template>
<div class="chat">
  <div class="users-list">
    <div class="header-user">
      <p>Чаты </p>
      <div class="">
        <img class='image-add-user' @click='addchat' src="https://image.flaticon.com/icons/svg/88/88206.svg" alt="">
      </div>
      <div class="add-user">
        <form class="" @submit='adduser' method="post">
          <input class="input-add-user" id='adduser' type="text" name="" placeholder="Имя друга" value="">
          <input class="input-add-user" type="submit" name="" value="Добавить друга">
        </form>
      </div>
    </div>
    <div @click='chat(user._id)' v-for='user in users' class="user">
      <p>Чат</p>
      <div class="urs" v-for='urs in user.users'>
        <p class="pu">{{urs}}</p>
      </div>
    </div>
  </div>
  <div class="chat-content">
    <div class="header">
      <p>{{usersheader[1]}}</p>
    </div>
    <div class="messange-scroll">
      <div class='messange'>
        <div class="mess" v-for='ch in chats.chat'>
          <div class="data">
            <span class="time">{{new Date(ch.time).getHours()}}:</span>
            <span class="time">{{`${new Date(ch.time).getMinutes()}`.length == 1 ? `0${new Date(ch.time).getMinutes()}`:new Date(ch.time).getMinutes()}}</span>
          </div>
          <p class='msg'>{{ch.msg}}</p>
          <p class='name'>{{ch.name}}</p>
        </div>
      </div>
    </div>
    <div class="send-messange">
      <form @submit='send' class="" method="post">
        <input id="messange" type="text" name="" maxlength="80" value="" placeholder="Напиши сообщение...">
        <input class='send-button' type="submit" value='Отправить'>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import $ from "jquery"

export default {
  name: 'chat',
  data() {
    return {
      chats: [{}],
      usersheader: [{}],
      getmes: 1,
      ord: 1,
      scrolled: 0,
      input: '',
      users: [],
      idchat: ''
    }
  },
  mounted() {
    // this.chat()
    // this.get()
    // this.scrollchat()
    this.main()
  },
  methods: {
    chatid(id) {
      console.log(id);
    },
    async main() {
      let response = await fetch('/chat/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Nik'
        })
      });
      if (response.ok) {
        let res = await response.json();
        this.users = res
        console.log(res);
      }
    },
    addchat() {
      let el = document.querySelector('.add-user')

      el.classList.add("user-add-visible");
      $(document).mouseup(function(e) {
        var info = $(".add-user");
        if (!info.is(e.target) && info.has(e.target).length === 0) {
          $(".add-user").removeClass("user-add-visible")
        } else {}
      });

    },
    scrollchat() {
      let scrollHeight = document.querySelector('.messange-scroll').scrollHeight;
      let clientHeight = document.querySelector('.messange-scroll').clientHeight;
      let scrollTop = scrollHeight - clientHeight;
      document.querySelector('.messange-scroll').scrollTop = scrollTop;
      console.log('scroll');
    },
    scrollchatlazy() {
      let scroll = document.querySelector('.messange-scroll').scrollHeight - this.scrolled + document.querySelector('.messange-scroll').scrollTop;
      document.querySelector('.messange-scroll').scrollTop = scroll;
    },
    async get() {
      let lthis = this;
      console.log('nik');
      let response = await fetch('/chat/get', {
        method: 'POST',
        creadentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Nik'
        })
      });
      if (response.ok) {
        let res = await response.json();
        this.get()
        lthis.chats.chat.push(res);
        console.log(lthis.chats.chat);
        setTimeout(this.scrollchat, 0);
      }

    },
    async chat(id) {
      this.idchat = id;
      let lthis = this;
      let response = await fetch('/chat/new', {
        method: 'POST',
        creadentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // name: 'Nik',
          id: id,
          ord: this.ord
        })
      });
      if (response.ok) {
        lthis.get()
        let res = await response.json();
        this.usersheader = res.users;
        this.chats = res;
        setTimeout(this.scrollchat, 0);
        setTimeout(function() {
          document.querySelector('.messange-scroll').addEventListener('scroll', async function() {
            if (this.scrollTop < 100) {
              if (lthis.getmes == 1) {
                lthis.getmes = 0;
                lthis.ord++;
                let resp = await fetch('/chat/new', {
                  method: 'POST',
                  creadentials: 'include',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: '5e0a693ed9942c4e4c946eac',
                    ord: lthis.ord
                  })
                });
                if (resp.ok) {
                  let ress = await resp.json();
                  ress.chat.reverse();
                  lthis.scrolled = document.querySelector('.messange-scroll').scrollHeight;
                  for (let ch of ress.chat) {
                    lthis.chats.unshift(ch);
                  }
                  setTimeout(function() {
                    lthis.scrollchatlazy();
                    setTimeout(function() {
                      lthis.getmes = 1;
                    }, 0)
                  }, 0)
                }
              }
            }
          });
        })
      }
    },

    async adduser() {
      console.log('nik');
      event.preventDefault()
      let login = document.querySelector('#adduser').value
      let response = await fetch('/chat/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usr: login,
        })
      });
      if (response.ok) {
        let res = await response.json();
        console.log(res);
      }
    },
    async send() {
      let idcaht = this.idchat;
      event.preventDefault()
      this.input = '';
      let input = document.querySelector('#messange').value;
      document.querySelector('#messange').value = '';
      let response = await fetch('/chat/send', {
        method: 'POST',
        creadentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            msg: input,
            name: 'NIk'
          },
          id: idcaht
        })
      });
      if (response.ok) {
        // this.get()
      }

    }
  }
};
</script>
<style scoped>
.chat {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  padding: 10px;
}

.chat-content {
  width: 550px;
  height: 100%;
  background: #ffffff;
  border: solid 1px #dbdbdb;
  position: relative;
}

.users-list {
  width: 300px;
  height: 100%;
  background: #ffffff;
  border: solid 1px #dbdbdb;
  border-right: 0px;
}

.header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  padding-right: 50px;
}

.header-user {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  padding-left: 10px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}


.add-user {
  position: absolute;
  background: #fff;
  box-shadow: 0px 0px 10px 1px #dbdbdb;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  top: 55px;
  width: 280px;
  height: 130px;
  padding: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
}

.user-add-visible {
  visibility: visible;
  opacity: 1;
}

form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.input-add-user {
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-size: 13px;
  height: 35px;
  border: 1px solid #dbdbdb;
  margin: 5px;
  border-radius: 2px;
}

.messange {
  width: 100%;
  padding: 5px;
  height: auto;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  /* white-space: pre-wrap; */
}

.msg {
  margin-top: 30px;
  font-size: 13px;
}

.mess {
  position: relative;
}

.name {
  position: absolute;
  top: 0;
  color: #42648b;
  font-size: 13px;
}

.data {
  position: absolute;
  font-size: 12px;
  top: 0;
  right: 20px;
}

.time {
  color: hsla(220, 8%, 51%, .6) !important;
  font-size: 12px;
  line-height: 1.4;
  color: #456;
}

.user {
  width: 100%;
  height: 70px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
}

.send-messange {
  bottom: 0;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #dbdbdb;
  background: #fafbfc;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
}

#messange {
  width: 400px;
  height: 30px;
  box-shadow: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  border-top: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  border: 1px solid #dbdbdb;
  font-size: 13px;
}

.send-button {
  height: 30px;
  font-size: 13px;
  margin-left: 10px;
  border-radius: 5px;
  border-top: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  background-color: #fff;
  width: 100px;
}

form {
  display: flex;
}

.messange-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 100px);
}

.user-name {
  color: #222;
  white-space: nowrap;
}

.image-add-user {
  width: 25px;
  margin: 5px;
  cursor: pointer;
}

.user {
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}

.user:hover {
  background: #edeef0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

}


.user:hover>.urs {
  display: flex;
}

.urs {
  display: none;
  width: 300px;
  background: #456;
  z-index: 5;
  /* position: absolute; */
  /* margin: 20px; */
}


.pu {
  margin: 30px;
}
</style>
