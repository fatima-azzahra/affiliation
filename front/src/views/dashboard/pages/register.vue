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
              <v-toolbar-title>Register form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
  <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
    prepend-icon="mdi-account"
      v-model="first_name"
      :counter="20"
      :rules="nameRules"
      label="First Name"
      required
    ></v-text-field>

     <v-text-field
     prepend-icon="mdi-account"
      v-model="last_name"
      :counter="20"
      :rules="nameRules"
      label="Last Name"
      required
    ></v-text-field>

    <v-text-field
    prepend-icon="mdi-email"
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    
     <v-text-field
     prepend-icon="mdi-lock"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>

    
     <v-text-field
     prepend-icon="mdi-lock"
      v-model="password_confirm"
      :rules="passwordRules"
      label="Confirm Password"
      type="password"
      required
    ></v-text-field>

          <v-card-actions>
              <v-spacer></v-spacer>
    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="validate"
    >
      SIGN UP
    </v-btn>
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
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
       first_name:'',
            last_name:'',
            password:'',
            passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
            message:'',
            password_confirm:'',
            error:''
    }),

    methods: {
      async validate () {
        this.$refs.form.validate()
                   if(this.password===this.password_confirm){
          const response = await axios.post('/register',{
               first_name : this.first_name,
               last_name: this.last_name,
               email : this.email,
               password : this.password
              });

       //    console.log(response.data.message);
                if (response.data.error) {
              this.message = '';
              this.error= response.data.error;
                }
                   else {
             this.error ='';
              this.message = 'Email has been sent, kindly activate your account';
                }
           }else{
               this.message='';
               this.error='try to enter the same password on the both'; 
        }
      },

    },
  }
</script>
