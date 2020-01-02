<template id="">
<div class="freands-f">
  <div class="friends">
    <div class="friends-name">
      <router-link class="link" to="/friends/">
        <p>Друзья</p>

      </router-link>
      <router-link class="link " to="/friends/out">
        <p>Исходящие</p>

      </router-link>
      <router-link class="link" to="/friends/in">
        <p class="active">Входящие</p>
      </router-link>
    </div>
    <div class="friends-all">
      <div v-for="user in users[0]" class="user">
        <p>{{user.nick}}</p>
        <div class="opt">
          <span @click='userin(user.id,user._id)' class='opt-l'>Принять запрос</span>
          <span @click='userout(user.id)' class='opt-l'>Отклонить запрос</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'chat',
  data() {
    return {

      users: [],
    }

  },
  mounted() {
    this.friends()
  },
  methods: {
    // три запроса chat/user/friends

    // chat/user/inreq

    // chat/user/outreq
    async userout(id) {
      console.log(id);
      console.log('запрос на отмену ');
      let response = await fetch('/chat/user/decline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id
        })
      });
      if (response.ok) {
        // let res = await response.json();

      }
    },
    async userin(id, _id) {
      console.log(id);
      console.log('запрос на отмену ');
      let response = await fetch('/chat/user/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          _id: _id
        })
      });
      if (response.ok) {
        // let res = await response.json();

      }
    },
    async friends() {
      console.log('запрос на chat/user/inreq');
      let response = await fetch('/chat/user/inreq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Nik',
          id: '5e0a693ed9942c4e4c946eac'
        })
      });
      if (response.ok) {
        let res = await response.json();
        this.users.push(res)
      }
    }
  }
}
</script>
<style scoped>
.freands-f {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  padding: 5px;
}

.friends {
  background: #fff;
  width: 700px;
  height: 100%;
}

.friends-name {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 20px;
}

.friends-all {
  padding: 20px;
  height: calc(100% - 50px);
  overflow-x: auto;
}


.user {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.opt {
  display: flex;
  height: 0;
  justify-content: space-between;
  width: 40%;
  align-items: center;
  font-size: 12px;
  padding-right: 20px;

}

.opt-l {
  transition: color 0.3s;
}

.opt-l:hover {
  color: blue;
}

.link {
  text-align: center;

  color: #000;
  width: 33.3333333%;
  text-decoration: none;
  position: relative;
}

.active::after {
  position: absolute;
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background: #000;
  margin-top: 15px;
}
</style>
