<template id="">
<div class="topbar">
  <div class="links">
    <router-link class="link" to="/">
      <img src="https://image.flaticon.com/icons/svg/1078/1078011.svg" alt="">
    </router-link>
    <router-link class="link" to="/friends/">
      <img src="https://image.flaticon.com/icons/svg/88/88206.svg" alt="">
    </router-link>
  </div>
  <span class='exit' @click='exit'><img src="https://image.flaticon.com/icons/svg/182/182448.svg" alt=""> </span>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'chat',
  data() {

  },
  methods: {
    async exit() {
      let response = await fetch('/chat/exit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exit: true,
        })
      });
      if (response.ok) {
        // this.$emit('tologin', '')
        window.location.reload()
      } else {}
    },
  }
}
</script>
<style scoped>
.topbar {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
}

.link {
  color: #000;
  text-decoration: none;
}

span {
  cursor: pointer;
  width: 30px;
}

.links img {
  /*  */
  width: 30px;
  margin: 10px;
}

.links {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
