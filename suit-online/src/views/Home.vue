<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div>
  <InputRoom></InputRoom>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import InputRoom from '@/views/InputRoom.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    InputRoom
  }
}
</script>
