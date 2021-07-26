<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-v-component heading="Withdrawals Paypal" link="links/create" />
      <div v-if="error">
      <base-material-alert color="danger" dark dismissible>
        {{ error }}
      </base-material-alert>
    </div>
    <div v-if="message">
      <base-material-alert color="success" dark dismissible>
        {{ message }}
      </base-material-alert>
    </div>
    <v-form @submit.prevent="handleSubmit" v-model="valid" ref="form">
   <v-card
    class="mx-auto"
    outlined
  >
  

      <v-list-item-content>
        <div class="overline mb-4">
    <v-icon
        large
        left
      >
        mdi-currency-usd
    </v-icon>
      Withdraw
        </div>
              <v-divider class="mx-5"></v-divider>
  <v-card-title>
        <v-row>
          <v-col cols="12">
            <v-progress-linear
              :buffer-value="pourcentage_current"
              color="primary"
              stream
              :value="pourcentage_withdraw"
            ></v-progress-linear>
          </v-col>
          <v-col cols="12">
            {{ total_withdraw }} USD / 75.00 USD required
            <div v-if="total_current > 0.0 || total_withdraw >= 75.0">
            <p class="text--disabled">
              (the gray color corresponds to your income in the last 7 days. You can't withdrawal it now!)
            </p>
            </div>
          </v-col>
        </v-row>
      </v-card-title>
          <v-card-title>

        <v-list-item-title class="headline mb-1">
          Paypal Email
        </v-list-item-title>
        <v-list-item-subtitle>

         
          <v-text-field
            :value="`${paypal}`"
            solo
            label="Email"
            prepend-inner-icon="mdi-email"
            hint="example@example.com"
            v-model="paypal"
            :rules="emailRules"
          ></v-text-field>

        </v-list-item-subtitle>
            </v-card-title>

      </v-list-item-content>


    <v-card-title>

    <v-card-actions>
      <v-btn
      color="primary"
        
     @click="validate"      >
        Save
      </v-btn>


<div v-if="total_withdraw <= 75.0">
      <v-btn disabled>
      Withdraw
    </v-btn>
</div>
<div v-else>
       <v-btn
      color="primary"
        type="submit"
      >
        Withdraw
      </v-btn>
</div>

       
    </v-card-actions>
        </v-card-title>

  </v-card>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios"
  export default {
    data: () => ({
      valid: true,
error:'',
message:'',
total_withdraw:'',
total_current:'',
test:'',
pourcentage_withdraw:'',
pourcentage_current:'',
paypal:'',
 emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    }),
      created () {
      this.initialize3(),
      this.initialize2(),
      this.initialize4()
    },

    methods: {
      async handleSubmit () {
          const response = await axios.post('/withdrawals/paypal',{
            paypal:this.paypal,
            total:this.total_withdraw
          });
             if (response.data.error) {
              this.message = '';
              this.error= response.data.error;
                }
                   else {
             this.error ='';
              this.message = 'Success Withdraw, Check your Email.';
                }       
      }, async initialize3() {
      const response = await axios.post(
        "/withdrawals/get-total-withdraw");
      if (response.data.total[0]) {
        this.total_withdraw = response.data.total[0].sum;
       // this.total_withdraw = 75.9;

        this.pourcentage_withdraw = (this.total_withdraw * 100) / 75.0;
      } else {
        // this.total_withdraw = 75.9;
        this.total_withdraw = 0.0;

        this.pourcentage_withdraw = (this.total_withdraw * 100) / 75.0;
      }
    },
    async initialize4() {
      const response = await axios.post(
        "/withdrawals/get-total-current");
      if (response.data.total[0]) { this.total_current = 0;
        for(var i=0 ; i< response.data.total.length ; i++){
                       this.total_current = response.data.total[i].sum + this.total_current;

        }
       // this.total_current = response.data.total[0].sum;
        console.log("withdraw"+this.total_withdraw)
        console.log("current"+this.total_current)
      //  this.total_current = 12.6;
        this.test = this.total_current + this.total_withdraw;
        this.pourcentage_current = (this.test * 100) / 75.0;
      } else {
        // this.total_current = 75.9;
        this.total_current = 0.0;

        this.pourcentage_current = (this.total_current * 100) / 75.0;
      }
    },
      async validate () {
        this.$refs.form.validate()
        console.log(this.email)
const response =await axios.post('/withdrawals/save-paypal',
{
  paypal:this.paypal
});
 if (response.data.error) {
              this.message = '';
              this.error= response.data.error;
                }
                   else {
             this.error ='';
              this.message = 'Email has been Saved.';
                }              
                console.log('fin')
                 },


    async initialize2 () {
       const response = await axios.post("/get-paypal");
      if (response.data) {
          this.paypal = response.data.user.paypal.email;
       
        }

    },

    },
  }
</script>