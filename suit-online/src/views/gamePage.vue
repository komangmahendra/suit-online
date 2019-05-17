<template>
    <div class="jumbotron">
        <img src="https://i.pinimg.com/originals/10/b2/7d/10b27d33cb1d1b69e9db7384e3a7e9bd.png" id="bg" alt="">
        <h1>Lets play our game</h1>
        <div id="score-board" class="card col-2 offset-5 d-flex justify-content-end"  style="height : 100px ;text-align: center; background-color:green">
            <div class="row justify-content-center mb-2" >
            <div id="p1" class="score" style="margin : 0 20px">
                {{this.p1score}}
            </div>
            <div class="score"> : </div>
            <div id="p2" class="score" style="margin : 0 20px">
                {{this.p2score}}
            </div>
            <!-- <h1>  0 : 0 </h1> -->
            </div>
        </div>
        <div v-if="ready == true" id="choicesBoard" class="card col-4 offset-4 d-flex justify-content-end"  style="text-align: center;background-color: orange ; height: 100px">
            <div class="row justify-content-around" >
              <div class="card row mt-2" style="background : none ; border: none">
              <i v-show="choice1 === 'r'" class="far fa-hand-rock fa-4x"></i>
              <i v-show="choice1 === 's'" class="far fa-hand-scissors fa-4x"></i>
              <i v-show="choice1 === 'p'" class="far fa-hand-paper fa-4x"></i>
              </div>
              <div class="vertical-line" style="height: 90px;"></div>
              <div class="card row mt-2" style="background : none ; border: none">
              <i v-show="choice1 === 'r'" class="far fa-hand-rock fa-4x"></i>
              <i v-show="choice1 === 's'" class="far fa-hand-scissors fa-4x"></i>
              <i v-show="choice1 === 'p'" class="far fa-hand-paper fa-4x"></i>
              </div>
            </div>
        </div>
        <div>
            
        </div>
        <div class="card-header col-8 offset-2">
            <h2> please choose your choice</h2>
            <div class="card-body">
                <div class="row logo justify-content-around">
                    <div>
                    <button type="submit" @click="register('r')"><i class="far fa-hand-rock fa-4x"></i></button>
                    </div>
                    <div>
                    <button type="submit" @click="register('s')"><i class="far fa-hand-scissors fa-4x"></i></button>
                    </div>
                    <div>
                    <button type="submit" @click="register('p')"><i class="far fa-hand-paper fa-4x"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'gamePage',
    data(){
        return {
            choice1 : '',
            choice2: '',
            p1score : 0,
            p2score : 0,
            ready : false
        }
    },
    methods : {
        register(input){
            console.log(input);
            this.choice1 = input
            this.choice2 = input
        }
    },
    created(){
        this.choice1 = ''
        this.choice2 = ''
    }
}
</script>

<style>
      .vertical-line{
      width: 0px; /* Use only border style */
      height: 100%;
      float: left; 
      border: 1px inset; /* This is default border style for <hr> tag */
    }

    .score{
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

