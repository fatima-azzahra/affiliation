<template>
        <v-card
    class="mx-auto"
    max-width="450"
  >

      <base-material-alert
              color="success"
              dark
              
            >
            <v-spacer></v-spacer>
             Your New Email has been Activate   
             <v-btn
        text
        color="white"
        to="/users/login"
      >
        Click here to LOGIN
      </v-btn>
            </base-material-alert>  

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
          axios.post('/verefication-profile',{
               token:this.$route.params.token
           
            });
                console.log(this.$route.params.token);
               localStorage.removeItem('x-auth-token');


        }
    },
    created: function(){
        this.getUnits()
    }


}
</script>
