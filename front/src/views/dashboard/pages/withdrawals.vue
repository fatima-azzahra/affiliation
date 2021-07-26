<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Withdrawals table"
      link="components/simple-tables"
    />
    <v-card class="mx-auto">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>ELIGIBILITY FOR NEXT WITHDRAWAL</v-card-title>

      <v-divider class="mx-4"></v-divider>

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
            <div v-if="total_current > 0.0">
            <p class="text--disabled">
              (the gray color corresponds to your income in the last 7 days. You can't withdrawal it now!)
            </p>
            </div>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-actions>
        <v-row align="center" justify="end">
          <!--
<div v-if="total <= 75.0">
      <v-btn disabled>
      Withdraw
    </v-btn>
</div>
<div v-else>
      <v-btn to="/withdrawals/paypal">
      Withdraw
    </v-btn>
</div> -->
          <v-btn color="primary" to="/withdrawals/paypal"> Withdraw </v-btn>
        </v-row>
      </v-card-actions>
      <br />
    </v-card>

      <base-material-card
      icon="mdi-clipboard-text"
      title="Withdrawals table"
      class="px-5 py-3"
    >
      <v-data-table :headers="headers" :items="withdrawals" class="elevation-1">
        <template v-slot:header.name="{ header }">
          {{ header.text.toUpperCase() }}
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    headers: [
      { text: "Date", value: "date" },
      { text: "Total", value: "total" },
    ],
    withdrawals: [],
    total_withdraw: "",
    total_current: "",
    pourcentage_withdraw: "",
    pourcentage_current: "",
    test:''
  }),
  created() {
    this.initialize2(),
    this.initialize(),
    this.initialize3()
  },
  beforeCreate(){
  //  this.initialize2();

  },
  beforeMount() {



  },

  methods: {
    async initialize() {
      const response = await axios.get(
        "/withdrawals/get-withdrawals");
      this.withdrawals = response.data.withdrawals.map((item) => {
        let current_datetime = new Date(item.date);
        let formatted_date =
          current_datetime.getFullYear() +
          "/" +
          (current_datetime.getMonth() + 1) +
          "/" +
          current_datetime.getDate() +
          " at " +
          current_datetime.getHours() +
          "h" +
          current_datetime.getMinutes() +
          "min";

        return {
          date: formatted_date,
          total: item.total +" $",
        };
      });
      //  console.log(this.date.getMonth())
    },
    async initialize2() {
      const response = await axios.post(
        "/withdrawals/get-total-withdraw");
      if (response.data.total[0]) {
        this.total_withdraw = response.data.total[0].sum;
     //   this.total_withdraw = 50.9;
      //    console.log(this.total_withdraw)
       // console.log(this.total_current)

        this.pourcentage_withdraw = (this.total_withdraw * 100) / 75.0;
      } else {
        // this.total_withdraw = 75.9;
        this.total_withdraw = 0.0;

        this.pourcentage_withdraw = (this.total_withdraw * 100) / 75.0;
      }
    },
    async initialize3() {
      const response = await axios.post(
        "withdrawals/get-total-current");
      if (response.data.total[0]) {
         this.total_current = 0;
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
  },
};
</script>