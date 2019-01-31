import Vue from 'vue';
import App from './App.vue';
import router from './router';

import ElementUI from 'element-ui'; // TODO: can import individual components to save file size
import 'element-ui/lib/theme-chalk/index.css';

import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.config.productionTip = false;

Vue.use(VueFire);
Vue.use(ElementUI);

const config = {
  apiKey: "AIzaSyBC-cal4iOEv2S-YNal4mniBJ6fbReqkno",
  authDomain: "surf-ipsum.firebaseapp.com",
  databaseURL: "https://surf-ipsum.firebaseio.com",
  projectId: "surf-ipsum",
  storageBucket: "surf-ipsum.appspot.com",
  messagingSenderId: "160597735774"
};

firebase.initializeApp(config);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


export const db = firebase.firestore();
