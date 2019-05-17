<template>
  <div class="container-fluid">
    <b-modal ref="my-modal" hide-footer title="Create Room">
      <div class="d-block text-center">
        <br>
        <div role="group">
          <b-form-input
            v-model="password"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter password for this rooms"
            trim
          ></b-form-input>

          <b-form-invalid-feedback id="input-live-feedback">Enter at least 3 letters</b-form-invalid-feedback>

          <br>
        </div>
      </div>
      <b-button class="mt-3" variant="outline-success" block @click="checkPassword">Submit Password</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Cancel</b-button>
    </b-modal>

    <div class="list-group row">
      <div>
        <p
          class="list-group-item col"
          style="width: 100%;"
          v-for="(room, i) in roomList"
          :key="i"
          @click="showModal(room)"
        >{{ room }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebase";
import router from '@/router.js'

export default {
  name: "Lobby",
  data() {
    return {
      roomList: [],
      password: "",
      room : ''
    };
  },
  methods: {
    showModal(input) {

      this.room = input
      
        db.collection("rooms").doc(input).get()
        .then(response=>{
            // console.log(response.data(), "masuk room nih")
            let cek = response.data().current_player
            console.log(cek,'pop;olkjhghjkljhdghj')
            if(cek < 2) {
                this.$refs["my-modal"].show();
            } else {
                this.$swal('Oppss', 'room full!', 'error')
            }
        })
        .catch(err=>{
            this.$swal('Oppss', 'error', 'error')
            console.log(err)
        })
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      this.password = "";
    },
    checkPassword() {
        // let room = document.getElementById("namaruang").innerHTML
        db.collection("rooms").doc(this.room).get()
        .then(response=>{
            // console.log(response.data(), "masuk room nih")
            let pwdb = response.data().password
            if(pwdb === this.password) {
                console.log("yes passwordnya sama")
                db.collection("rooms").doc(this.room).update({player2: {name : localStorage.getItem('userName'), score : 0}, current_player : 2, score : 0})
                this.$router.push(`/gamePage/${this.room}`)
            } else {
                this.$swal('Oppss', 'wrong password', 'error')
            }
        })
        .catch(err=>{
            this.$swal('Oppss', 'error', 'error')
            console.log(err)
        })

    }
  },
  mounted() {
    db.collection("rooms").onSnapshot(querySnapshot => {
      querySnapshot.forEach(element => {
        this.roomList.push(element.id);
      });
    });
    console.log("dapet nih");
    console.log(this.roomList);
  }
};
</script>