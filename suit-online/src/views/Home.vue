
<template>
<<<<<<< HEAD
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div>
  <InputRoom></InputRoom>
=======
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
>>>>>>> initial commit
  </div>
</template>

<script>
// @ is an alias to /src
<<<<<<< HEAD
import HelloWorld from '@/components/HelloWorld.vue'
import InputRoom from '@/views/InputRoom.vue'
=======
// import HelloWorld from '@/components/HelloWorld.vue'
import db from '@/assets/config.js'
>>>>>>> initial commit

export default {
  name: 'home',
  data(){
    return{
      dummy : ''
    }
  },
  components: {
<<<<<<< HEAD
    HelloWorld,
    InputRoom
=======
    
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
>>>>>>> initial commit
  }
}
</script>
