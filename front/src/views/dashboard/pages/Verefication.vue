<template>
     <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>your account has been activate !!</div>

    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        to="/users/login"
      >
        Click here to LOGIN
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">
            Origin
          </p>
          <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            token:''
        }
    }, methods:{
        getUnits: function() {
          axios.post('/verefication',{
               token:this.$route.params.token
           
            });
                console.log(this.$route.params.token);

        }
    },
    created: function(){
        this.getUnits()
    }


}
</script>
