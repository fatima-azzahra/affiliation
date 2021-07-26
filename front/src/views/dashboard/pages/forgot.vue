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
              <v-toolbar-title>enter your email</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit"  method="POST">
                <v-text-field
                  prepend-icon="mdi-email"
                  label="Email"
                  :rules="emailRules"
                  v-model="email"
                  required
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
            email:'',
            error:'',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods : {
        async handleSubmit() {
           const response =await  axios.post('/forgot',{
                email:this.email
           });
           console.log(response);
           if(response.data.message){
               this.error=response.data.message;
           }
        }
    }
} 

</script>
