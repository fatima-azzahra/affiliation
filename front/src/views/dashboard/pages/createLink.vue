<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
  <div v-if="error">
          <base-material-alert
              color="danger"
              dark
              dismissible
            >
           {{error}}
            </base-material-alert>
       </div> 
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Add link
            </div>

            <div class="subtitle-1 font-weight-light">
              create your own link
            </div>
          </template>
          
          <v-form
          ref="form"
    v-model="valid"
    lazy-validation
          >
            <v-container class="py-0">
              <v-row>
              
                <v-col cols="12">
                  <v-text-field
                    label="route"
                    class="purple-input"
                    v-model="route"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="redirect"
                    class="purple-input"
                    v-model="redirect"
                  />
                </v-col>
          
                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    class="mr-0"
                    @click="validate"
                  >
                    Add link
                  </v-btn>
                  
                   <v-btn
                     color="#E5E9EC"
                     class="mr-4"
                     @click="reset"
                   >
                    Reset
                   </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

     
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      valid: true,
      route:'',
      redirect:'',
      error:''
     
    })
      ,
    methods: {
      async validate () {

      const response = await  axios.post('/links/create',{
               route:this.route,
               redirect:this.redirect,
           }); 
           if(response.data.message){
          this.error=response.data.message
           }else{
          this.reset();
          this.$router.push('/links');
           }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>
