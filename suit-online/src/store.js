import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : '',
    userName : ''
  },
  mutations: {
    setIsLogin(state, data){
      state.isLogin = data
    },
    setUserName( state, data){
      state.userName = data
    }
  },
  actions: {
    login(context){

      var firebaseConfig = {
        apiKey: "AIzaSyD3pDawLP3DHj3D8fGUA23iZZuOT0ly2tU",
        authDomain: "rps-hacktiv8.firebaseapp.com",
        databaseURL: "https://rps-hacktiv8.firebaseio.com",
        projectId: "rps-hacktiv8",
        storageBucket: "rps-hacktiv8.appspot.com",
        messagingSenderId: "525684810443",
        appId: "1:525684810443:web:55dab42f1e0c8f40"
      };
      
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
      
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;

          localStorage.setItem('token', token)

          let user = result.user;
          localStorage.setItem('userName', user.displayName)
          context.commit('setIsLogin', true)
          context.commit('setUserName', user.displayName)
          
      }).catch((error) => {
        console.log(error)
      });
    },


  }
})
