<template>
    <div class="container" style="margin-top:70px"> 
        
         <img src="https://media1.tenor.com/images/b2a284afcda426722f679d3298566ced/tenor.gif?itemid=4954978"/>
        <h1 class="pb-5"> Login First ! </h1>
        <img src="../assets/google.png" width="200px" height="200px" class="login-button animated infinite bounce" @click="login">
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['isLogin'])
    },
    watch: {
        isLogin(){
            if(this.isLogin === true){
                this.$router.push('/input-room')
                this.$swal('Yayyy', 'Login Success', 'success')
            }
        }
    },
    methods : {
        login(){
            this.$store.dispatch('login')
        }
    }
}
</script>



<style scoped>
    .container {
        font-family: 'Monoton', cursive;
    }
    .login-button{
        -webkit-box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        -moz-box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        border-radius: 50px;
        padding: 20px;
    }
</style>

