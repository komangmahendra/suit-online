<template>
  <div class="jumbotron">
    <img
      src="https://i.pinimg.com/originals/10/b2/7d/10b27d33cb1d1b69e9db7384e3a7e9bd.png"
      id="bg"
      alt
    >
    <h1>Lets play our game</h1>
    <div
      id="score-board"
      class="card col-2 offset-5 d-flex justify-content-end"
      style="height : 100px ;text-align: center; background-color:green"
    >
      <div class="row justify-content-center mb-2">
        <div id="p1" class="score" style="margin : 0 20px">{{ game.player1.score }}</div>
        <div class="score">:</div>
        <div id="p2" class="score" style="margin : 0 20px">{{ game.player2.score }}</div>
        <!-- <h1>  0 : 0 </h1> -->
      </div>
    </div>
    <div
      id="choicesBoard"
      class="card col-4 offset-4 d-flex justify-content-end"
      style="text-align: center;background-color: orange ; height: 100px"
    >
      <div class="row justify-content-around">
        <div class="card row mt-2" style="background : none ; border: none">
          <i v-show="game.atk1[game.atk1.length-1] === 'r' && game.atk1.length === game.atk2.length " class="far fa-hand-rock fa-4x"></i>
          <i v-show="game.atk1[game.atk1.length-1] === 's' && game.atk1.length === game.atk2.length" class="far fa-hand-scissors fa-4x"></i>
          <i v-show="game.atk1[game.atk1.length-1] === 'p' && game.atk1.length === game.atk2.length" class="far fa-hand-paper fa-4x"></i>
        </div>
        <div class="vertical-line" style="height: 90px;"></div>
        <div class="card row mt-2" style="background : none ; border: none">
          <i v-show="game.atk2[game.atk2.length-1] === 'r' && game.atk1.length === game.atk2.length" class="far fa-hand-rock fa-4x"></i>
          <i v-show="game.atk2[game.atk2.length-1] === 's' && game.atk1.length === game.atk2.length" class="far fa-hand-scissors fa-4x"></i>
          <i v-show="game.atk2[game.atk2.length-1] === 'p' && game.atk1.length === game.atk2.length" class="far fa-hand-paper fa-4x"></i>
        </div>
      </div>
    </div>
    <div></div>
    <div class="card-header col-8 offset-2">
      <h2>please choose your choice</h2>
      <div class="card-body">
        <div class="row logo justify-content-around">
          <div>
            <button type="submit" @click="register('r')">
              <i class="far fa-hand-rock fa-4x"></i>
            </button>
          </div>
          <div>
            <button type="submit" @click="register('s')">
              <i class="far fa-hand-scissors fa-4x"></i>
            </button>
          </div>
          <div>
            <button type="submit" @click="register('p')">
              <i class="far fa-hand-paper fa-4x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/firebase";

export default {
  name: "gamePage",
  data() {
    return {
      game: {
        player1: {
          score: 0
        },
        player2: {
          score: 0
        }
      },
      choice1: "",
      choice2: "",
      p1score: 0,
      p2score: 0,
      attack1: [],
      ready: false,
      roomGame: this.$route.params.room
    };
  },
  mounted() {
    this.snapShot();
  },
  watch: {
    "game.player1.score"() {
      let user = localStorage.getItem("userName");
      if (this.game.player2.score == 3) {
        if (user == this.game.player2.name) {
          this.$swal("Horray", `${user} are the winner!`, "success");
        } else {
          this.$swal("Sorry", `You lose`, "info");
        }
      } else if (this.game.player1.score == 3) {
        if (user == this.game.player1.name) {
          this.$swal("Horray", `${user} are the winner!`, "success");
        } else {
          this.$swal("Sorry", `You lose`, "info");
        }
      }
    },
    "game.player2.score"() {
      let user = localStorage.getItem("userName");
      if (this.game.player2.score == 3) {
        if (user == this.game.player2.name) {
          this.$swal("Horray", `${user} are the winner!`, "success");
        } else {
          this.$swal("Sorry", `You lose`, "info");
        }
      } else if (this.game.player1.score == 3) {
        if (user == this.game.player1.name) {
          this.$swal("Horray", `${user} are the winner!`, "success");
        } else {
          this.$swal("Sorry", `You lose`, "info");
        }
      }
    }
  },

  methods: {
    cekScore() {
      console.log(
        this.game.atk1.length == this.game.atk2.length &&
          this.game.atk1.length > 0
      );
      if (
        this.game.atk1.length == this.game.atk2.length &&
        this.game.atk1.length > 0
      ) {
        console.log("masuk disini");

        let atk1 = this.game.atk1[this.game.atk1.length - 1];
        let atk2 = this.game.atk2[this.game.atk2.length - 1];

        console.log(atk1, atk2, "checkAAAAA");
        if (atk1 == "p" && atk2 == "r") {
          this.game.player1.score += 1;
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ player1: this.game.player1 });
        } else if (atk1 == "s" && atk2 == "p") {
          this.game.player1.score += 1;
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ player1: this.game.player1 });
        } else if (atk1 == "r" && atk2 == "s") {
          this.game.player1.score += 1;
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ player1: this.game.player1 });
        } else if (atk1 == atk2) {
        } else {
          this.game.player2.score += 1;
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ player2: this.game.player2 });
        }
      }

      console.log(this.game.player1.score, "skor p1");
      console.log(this.game.player2.score, "skor p2");
    },
    snapShot() {
      db.collection("rooms")
        .doc(this.roomGame)
        .onSnapshot(querySnapshot => {
          let data = querySnapshot.data();
          this.game = data;
        });
    },
    register(input) {
      if (this.game.player1.name == localStorage.getItem("userName")) {
        if (this.game.atk1.length <= this.game.atk2.length) {
          this.game.atk1.push(input);
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ atk1: this.game.atk1 })
            .then(() => {
              this.$swal("Attack!", "You attacked player 2", "success");
              this.cekScore();
            })
            .catch(error => {
              // The document probably doesn't exist.
              this.$swal("Sorry", "internal server error", "error");
              console.error("Error updating document: ", error);
            });
        } else {
          this.$swal(
            "Oops",
            "Please wait your opponent before attack again",
            "info"
          );
        }
      } else if (this.game.player2.name == localStorage.getItem("userName")) {
        console.log(this.game.player2, "........");
        if (this.game.atk2.length <= this.game.atk2.length) {
          this.game.atk2.push(input);
          db.collection("rooms")
            .doc(this.roomGame)
            .update({ atk2: this.game.atk2 })
            .then(() => {
              this.$swal("Attack!", "You attacked player 1", "success");
              this.cekScore();
            })
            .catch(error => {
              // The document probably doesn't exist.
              this.$swal("Sorry", "internal server error", "error");
              console.error("Error updating document: ", error);
            });
        } else {
          this.$swal(
            "Oops",
            "Please wait your opponent before attack again",
            "info"
          );
        }
      }
    }
  },
  created() {
    this.choice1 = "";
    this.choice2 = "";
  },
  destroyed() {
    // db.collections('rooms').update('')
  }
};
</script>

<style>
.vertical-line {
  width: 0px; /* Use only border style */
  height: 100%;
  float: left;
  border: 1px inset; /* This is default border style for <hr> tag */
}

.score {
  font-size: 50px;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}
</style>

