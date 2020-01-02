import Vue from 'vue';
import Router from 'vue-router';

import chat from '@/components/chat';
import friends from '@/components/friends';
import friendsin from '@/components/friendsin';
import friendsout from '@/components/friendsout';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chat',
      component: chat,
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends,
    },
    {
      path: '/friends/out',
      name: 'friendsout',
      component: friendsout
    },
    {
      path: '/friends/in',
      name: 'friendsin',
      component: friendsin
    },
  ]
});
