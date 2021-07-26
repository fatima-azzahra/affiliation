<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
       <div v-if="error">
          <base-material-alert
              color="danger"
              dark
              dismissible
            >
           {{error}}
            </base-material-alert>
       </div> 
         <div v-if="message">
            <base-material-alert
              color="success"
              dark
              dismissible
            >
             {{message}}
            </base-material-alert>  
       </div>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Reset password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit"  method="POST">
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                   required
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  label="Confirm Password"
                  v-model="password_confirm"
                  type="password"
                ></v-text-field>
                 <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-card-actions>
              </v-form>
            </v-card-text>
           
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return{
            password:'',
            password_confirm:'',
            error:''
        
            
        }
    },
    methods : {
         handleSubmit(){
           if(this.password===this.password_confirm){
                const response =axios.post('/reset/:token',{
               password:this.password,
               token:this.$route.params.token
           });
           console.log(response);
           this.$router.push('/users/login');
           }else{
               this.error='try to enter the same password';
           }
        }
    }
}

</script>
