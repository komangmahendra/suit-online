
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <gamePage></gamePage>
  <!-- <InputRoom></InputRoom> -->
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import InputRoom from '@/views/InputRoom.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import db from '@/firebase/firebase.js'
import gamePage from '@/views/gamePage.vue'
export default {
  name: 'home',
  data(){
    return{
      dummy : ''
    }
  },
  components: {
    // HelloWorld,
    InputRoom,
    gamePage
    
  },
  mounted(){
    
    db.collection('rooms').onSnapshot((querySnapshot)=>{
      let arrTemp = []
      querySnapshot.forEach(doc => {
        arrTemp.push(doc.data())
      });
      this.dummy = arrTemp
      console.log(this.dummy);
      
    })
  }
}
</script>
