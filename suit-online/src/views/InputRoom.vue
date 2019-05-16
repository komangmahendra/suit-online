<template>
  <div class="container">
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

    <button class="btn btn-success btn-lg" @click="showModal">create Room</button>
  </div>
</template>

<script>
import db from '@/firebase/firebase.js';
import firebase from 'firebase';
console.log(db)

export default {
    data(){
        return {
            name : '',
            password : ''
        }
    },
    computed : {
            nameState() {
            return this.password.length > 2 ? true : false;
        },
    },
    methods: {
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
            player1:{id:1,name:this.name,score:0},
            player2:{id:2,name:'',score:0}
        }

          db.collection("rooms")
            .add(obj)
            .then(doc => {
                this.room_id = doc.id;
                this.roomCreated = true;
                console.log(doc)
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

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

