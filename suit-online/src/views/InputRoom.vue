<template>
  <div class="container-fluid" style="height:100vh">
    <b-modal ref="my-modal" hide-footer title="Create Room">
      <div class="d-block text-center">
        <br>
        <div role="group">
          <b-form-input
            v-model="name"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter name"
            trim
          ></b-form-input>
          <br>
          <b-form-input
            v-model="password"
            :state="nameState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter password for this rooms"
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">Enter at least 3 letters</b-form-invalid-feedback>

          <br>
        </div>
      </div>
      <b-button class="mt-3" variant="outline-success" block @click="toRoom">Create</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Cancel</b-button>
    </b-modal>

    <div class="row" style="height:100%">
        <div class=" col-lg-6 col-xs-12 row d-flex align-items-center justify-content-center"
        style="background-image: url(https://www.setaswall.com/wp-content/uploads/2017/10/8-Bit-Nature-Lu-Wallpaper-1080x1920-768x1365.jpg);
            background-repeat: no-repeat;background-size:cover
        ">
           <div style="width:100%">
                <h1 style="color:white" class="mb-3"> Welcome <br>
                     Rock Paper Scissors Master, <br>
                     <span> <b>{{ namePlayer1 }}</b></span>
                </h1>
                <button class="btn btn-success btn-lg mb-3" style="width:80%;" @click="showModal">create Room >></button>
                <button class="btn btn-primary btn-lg" style="width:80%;" @click="logout">Logout</button>
                <button class="btn btn-primary btn-lg" style="width:80%;" @click="coba">Logout</button>
           </div>
        </div>

        <div class="col-lg-6 col-xs-12">

        </div>
       
    </div>
   
  </div>
</template>

<script>
import  db   from '@/firebase/firebase.js';
import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
    data(){
        return {
            name : '',
            password : '',
            listRoom: [],
            namePlayer1: localStorage.getItem('userName')
        }
    },
    computed : {
        ...mapState(['userName', 'isLogin']),
        nameState() {
            return this.password.length > 2 ? true : false;
        },
    },
    mounted(){
        this.getAllRoom()
    },
    methods: {
        coba(){
             db.collection('rooms').doc('hahaha')
                .update({ player1: {score: 80}})
                .then( data => {
                    console.log(data)
                })
                .catch( err => {
                    console.log(err)
                })
        },
        logout(){
            localStorage.clear()
            this.$router.push('/')
            firebase.auth().signOut().then(function() {
                this.$swal('Bye bye ;D', 'see you soon again', 'success')
            }).catch(function(error) {
                console.log(error)
            });
        },
        getAllRoom() {
            db.collection("rooms").onSnapshot(doc => {
                this.listRoom = [];
                doc.forEach(el => {
                    let newObj = { id: el.id, ...el.data() };
                    this.listRoom.push(newObj);
                });
            });
        },
        showModal() {
            this.$refs["my-modal"].show();
        },
        hideModal() {
            this.$refs["my-modal"].hide();
            this.password = "";
        },
        toRoom() {
        let obj = {}
            obj = {
            status: 0,
            current_player: 1,
            password: this.password,
            // players:[this.name],
            player1:{id:1,name:this.userName,score:0},
            player2:{id:2,name:'',score:0}
        }
        
        let flagDuplicate = false
        this.listRoom.map( el => {
            if(el.id == this.name) {
                flagDuplicate = true
            } 
        })

        if(flagDuplicate){
            this.$swal('Duplicate room name', 'Choose another room name', 'error')
        } else {
            db.collection('rooms').doc(this.name)
                .set(obj)
                .then(doc => {
                    console.log(doc)
                    console.log(this.listRoom)
                    // this.room_id = doc.id;
                    // this.roomCreated = true;
                })
                .catch(function(error) {
                    //this.$swal('Ooppss..', `${error.Message}`, 'error')
                    console.error("Error writing document: ", error);
                });
        }

        //   db.collection("rooms")
        //     .doc(this.room_id)
        //     .update({
        //       players: firebase.firestore.FieldValue.arrayUnion({
        //         name: this.name,
        //       })
        //     })
        //     .then(doc => {
        //       localStorage.setItem('id',1)
        //       console.log(doc)
        //       //this.$router.push(`/room/${this.room_id}`);
        //     })
        //     .catch(function(error) {
        //       console.error("Error writing document: ", error);
        //     });
        
      }
    }
}
</script>


<style scoped>
    * {
        font-family: 'Orbitron', sans-serif;
    }
</style>


