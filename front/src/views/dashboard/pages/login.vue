<template>
  <v-content >
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
              <v-toolbar-title>Login to your Affiliate account</v-toolbar-title>
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
                 
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                   required
                ></v-text-field>
                 <v-card-actions>
              <v-spacer></v-spacer>
              <a href="/forgot" style="margin-right: 10px;">Forgot your password?</a>

              <v-btn type="submit" color="primary">Sign in</v-btn>
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
            password:'',
            message:'',
            error:'',
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 3) || 'Password must be more than 8 characters',
            ],
        }
    },
    methods : {
       async handleSubmit() {
               const response =await  axios.post('/login',{
               email:this.email,
               password:this.password
           });
             console.log("zahr"+response);
             if(response.data.token){
                   const token = response.data.token;
                   localStorage.setItem('x-auth-token',token);
                  
             //const parsed = JSON.stringify(response.data);
             //localStorage.setItem('user', parsed);
             //console.log(localStorage.getItem('user'));
             //localStorage.setItem('token',JSON.stringify(response.data));
             window.location.href="/";
             }else{
            this.error='Invalid username or password';
             }
        }
} 
}
</script>
<style scoped>
body{
   background: url('../../../assets/register.jpg') no-repeat center center fixed !important;
  background-size: cover; 
}

</style>
