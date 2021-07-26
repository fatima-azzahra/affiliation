<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
            <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-cursor-default-click"
          title="Clicks"
          :value="`${nbrClick}`"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="primary"
          icon="mdi-currency-usd"
          title="Pending Earning"
          :value="`${pendingEarning}`"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-cash-multiple"
          title="Paid out"
          :value="`${paidOut}`"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-filter"
          title="Conversion Rate"
          :value="`${convertionRate}`"
        />
      </v-col>
      <v-col cols="12" md="12">
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
      </v-col>
      <v-col cols="12" md="12">
        <base-material-card color="white" class="px-5 py-3">
          <v-card-text>
            <canvas id="myChart"></canvas>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="12">
        <base-material-card color="white" class="px-5 py-3">
         
          <v-card-text>
            <canvas id="myVue"></canvas>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";
import moment from 'moment';
import $ from 'jquery';
export default {
  name: "user",
  data() {
    return {
      nbrClick: "",
      paidOut: "",
      pendingEarning: "",
      clicks: "",
      data: "",
      chartData: "",
      earnings: "",
      chartEarningData: "",
      withdrawals: "",
      value: '',
       moment:moment().format('MM/DD/YYYY'),
       mydates:[],
       chart1:'',
       chart2:'',
       clickarray:'',
       pourcentage:'',
       total:'',
       convertionRate:'',
       total_withdraw: "",
    total_current: "",
    pourcentage_withdraw: "",
    pourcentage_current: "",
    };
  },
  created() {
    if(localStorage.getItem('x-auth-token')){
       this.initialize2(),
    this.initialize(),
    this.initialize3()
    }else{
          window.location.href="/users/login";
    }
   
    
  },
  async mounted() {

  //DateRangePicker
var vm = this
console.log("this")
console.log(vm)
     $('input[name="daterange"]').daterangepicker({
          ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Last 7 Days': [moment().subtract(6, 'days'), moment()],
              'Last 30 Days': [moment().subtract(29, 'days'), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          alwaysShowCalendars: true,
          buttonClasses: "btn",
          applyClass: "btn-brand-green",
          cancelClass: "btn-brand-red",
          showDropdowns: true,
          autoApply: false,
          opens: 'right',
          maxDate: moment()
      }).on('apply.daterangepicker', function(e, picker){
         let start = picker.startDate.format('YYYY-MM-DD');
         let end = picker.endDate.format('YYYY-MM-DD');
        let dates = {};
        dates.start = start;
        dates.end = end;  
        vm.updateValue(dates);
        vm.clicks = [];

        
        for (var i = 0; i < vm.clickarray.length; i++) {
          var count = vm.clickarray[i].count;
          var date = vm.clickarray[i]._id.date;
          vm.clicks.push([count, date]);
        }
       
       
        vm.chartData = {
          datasets: [
            {
              label: "Clicks",
              data: [],
            },
          ],
        };

        //var week = dates();

        var clickdates = [];
        var dateWherenbrclickzero = [];
        for (var k = 0; k < vm.clicks.length; k++) {
          clickdates.push(vm.clicks[k][1]);
        }
      console.log('database')
      console.log(clickdates)  

        for (let index = 0; index < vm.mydates.length; index++) {
          for (let j = 0; j < clickdates.length; j++) {
            if (!clickdates.includes(vm.mydates[index])) {
              if (!dateWherenbrclickzero.includes(vm.mydates[index])) {
                dateWherenbrclickzero.push(vm.mydates[index]);
              }
            }
          }
        }
       console.log('dateWherenbrclickzero')
      console.log(dateWherenbrclickzero)
        
 for (let k = 0; k < vm.clicks.length; k++) {
          if(vm.mydates.includes(vm.clicks[k][1])){
          vm.chartData.datasets[0].data.push({
            x: vm.clicks[k][1],
            y: vm.clicks[k][0],
          });
          }
        }

        

        for (let k = 0; k < dateWherenbrclickzero.length; k++) {
          {
            vm.chartData.datasets[0].data.push({
              x: dateWherenbrclickzero[k],
              y: 0,
            });
          }
        }
vm.chartData.datasets[0].data.sort((a, b) => (a.x > b.x) ? 1 : -1)
console.log('chart')
console.log(vm.chartData.datasets[0].data)
      vm.chart1=new Chart(ctx, {
      type: "line",
      data: {
        labels: vm.mydates,

        datasets: [
          {
            label: vm.chartData.datasets[0].label,
            data: vm.chartData.datasets[0].data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: {
            type: "datetime",
            time: {
              displayFormats: {
                quarter: "MMM YYYY",
              },
            },
          },
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
      });
//end of date range pick



     $('input[name="daterangepicker"]').daterangepicker({
          ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Last 7 Days': [moment().subtract(6, 'days'), moment()],
              'Last 30 Days': [moment().subtract(29, 'days'), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          alwaysShowCalendars: true,
          buttonClasses: "btn",
          applyClass: "btn-brand-green",
          cancelClass: "btn-brand-red",
          showDropdowns: true,
          autoApply: false,
          opens: 'right',
          maxDate: moment()
      }).on('apply.daterangepicker', function(e, picker){
         let start = picker.startDate.format('YYYY-MM-DD');
         let end = picker.endDate.format('YYYY-MM-DD');
        let dates = {};
        dates.start = start;
        dates.end = end;  
        vm.updateValue(dates);
        
        vm.earnings = [];

        
       for (var i = 0; i < vm.earningarray.length; i++) {
          var total = vm.earningarray[i].total;
          var date = vm.earningarray[i]._id.date;
          vm.earnings.push([total, date]);
        }
       
        vm.chartEarningData = {
          datasets: [
            {
              label: "Earnings",
              data: [],
            },
          ],
        };

        //var week = dates();

        var earningdates = [];
        var dateWherenbrearningzero = [];
        for (var k = 0; k < vm.earnings.length; k++) {
          earningdates.push(vm.earnings[k][1]);
        }

       

         for (let index = 0; index < vm.mydates.length; index++) {
          for (let j = 0; j < earningdates.length; j++) {
            if (!earningdates.includes(vm.mydates[index])) {
              if (!dateWherenbrearningzero.includes(vm.mydates[index])) {
                dateWherenbrearningzero.push(vm.mydates[index]);
              }
            }
          }
        }
        

        
  for (let k = 0; k < vm.earnings.length; k++) {
    if(vm.mydates.includes(vm.earnings[k][1])){
          vm.chartEarningData.datasets[0].data.push({
            x: vm.earnings[k][1],
            y: vm.earnings[k][0],
          });
    }
        }

         for (let k = 0; k < dateWherenbrearningzero.length; k++) {
          {
            vm.chartEarningData.datasets[0].data.push({
              x: dateWherenbrearningzero[k],
              y: 0,
            });
          }
        }
vm.chartEarningData.datasets[0].data.sort((a, b) => (a.x > b.x) ? 1 : -1)

      vm.chart2=new Chart(ctx1, {
      type: "line",
      data: {
        labels: vm.mydates,

        datasets: [
          {
            label: vm.chartEarningData.datasets[0].label,
            data: vm.chartEarningData.datasets[0].data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: {
            type: "datetime",
            time: {
              displayFormats: {
                quarter: "MMM YYYY",
              },
            },
          },
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
      });
//end of date range pick

    await axios
      .post("/clicks/count")
      .then((response) => {
        if(response.data.message){
        this.nbrClick = response.data.message;
        } 
        else{
          this.nbrClick=0
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await axios.post("/earning/paidout")
      .then((response) => {
        console.log(response)
        if(response.data.message[0].total){
        this.paidOut = response.data.message[0].total;
        }else{
        this.paidOut=0;
        }
     
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post("/earning/pendingearning")
      .then((response) => {
        if(response.data.message[0].total){
        this.pendingEarning = parseInt(response.data.message[0].total) ;
        }else{
        this.pendingEarning=0;
        }
      })
      .catch((error) => {
        console.log(error);
      });


 var totalearning=this.pendingEarning+this.paidOut
 var convertionRate1=(this.paidOut*100)/totalearning
 if(convertionRate1){
 this.convertionRate=parseInt(convertionRate1)
 }
 else{
   this.convertionRate=0
 }

//chart data
    await axios
      .post("/clicks/chartdata")
      .then((response) => {
        this.clickarray = response.data.message;

      })
      .catch((error) => {
        console.log(error);
      });


 

//end of  click chart data





    await axios
      .post("/earning/chartMy")
      .then((response) => {
        this.earningarray = response.data.message;

      })
      .catch((error) => {
        console.log(error);
      });



      
   






    var ctx = document.getElementById("myChart").getContext("2d");
    var ctx1 = document.getElementById("myVue").getContext("2d");
    // function to get all date between tow date
  

   

  
    var dateTo = moment().format('YYYY-MM-DD');
    var dateFrom = moment().subtract(7,'d').format('YYYY-MM-DD');
   
    var thisWeek = vm.getDates(dateFrom,dateTo);
     vm.clicks=[]

    for (var i = 0; i < vm.clickarray.length; i++) {
          var count = vm.clickarray[i].count;
          var date = vm.clickarray[i]._id.date;
          vm.clicks.push([count, date]);
        }

        
        vm.chartData = {
          datasets: [
            {
              label: "Clicks",
              data: [],
            },
          ],
        };

        var clickdates = [];
        var dateWherenbrclickzero = [];
        for (var k = 0; k < vm.clicks.length; k++) {
          clickdates.push(vm.clicks[k][1]);
        }

        for (let index = 0; index < thisWeek.length; index++) {
          for (let j = 0; j < clickdates.length; j++) {
            if (!clickdates.includes(thisWeek[index])) {
              if (!dateWherenbrclickzero.includes(thisWeek[index])) {
                dateWherenbrclickzero.push(thisWeek[index]);
              }
            }
          }
        }
        for (let k = 0; k < this.clicks.length; k++) {
          if (thisWeek.includes(vm.clicks[k][1])) {
          this.chartData.datasets[0].data.push({
            x: this.clicks[k][1],
            y: this.clicks[k][0],
          });
          }
        }
       console.log("this.chartData.datasets[0].data",this.chartData.datasets[0].data)

        for (let k = 0; k < dateWherenbrclickzero.length; k++) {
          {
            this.chartData.datasets[0].data.push({
              x: dateWherenbrclickzero[k],
              y: 0,
            });
          }
        }

  vm.chartData.datasets[0].data.sort((a, b) => (a.x > b.x ? 1 : -1));
  console.log("data", vm.chartData.datasets[0].data)
    
    vm.chart1=new Chart(ctx, {
      type: "line",
      data: {
        labels: thisWeek,

        datasets: [
          {
            label: "Clicks",
            data: vm.chartData.datasets[0].data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: {
            type: "datetime",
            time: {
              displayFormats: {
                quarter: "MMM YYYY",
              },
            },
          },
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });


    vm.earnings = [];

        for (let i = 0; i < vm.earningarray.length; i++) {
          var total = vm.earningarray[i].total;
          let date = vm.earningarray[i]._id.date;
          vm.earnings.push([total, date]);
        }

        vm.chartEarningData = {
          datasets: [
            {
              label: "Earnings",
              data: [],
            },
          ],
        };

        //var week = dates();

        var earningdates = [];
        var dateWherenbrearningzero = [];
        for (let k = 0; k < vm.earnings.length; k++) {
          earningdates.push(vm.earnings[k][1]);
        }

        console.log("earningdates",earningdates)
        console.log("thisWeek",thisWeek)

        for (let index = 0; index < thisWeek.length; index++) {
          for (let j = 0; j < earningdates.length; j++) {
            if (!earningdates.includes(thisWeek[index])) {
              if (!dateWherenbrearningzero.includes(thisWeek[index])) {
                dateWherenbrearningzero.push(thisWeek[index]);
              }
            }
          }
        }

        

        for (let k = 0; k < vm.earnings.length; k++) {
          if (thisWeek.includes(vm.earnings[k][1])) {
            vm.chartEarningData.datasets[0].data.push({
              x: vm.earnings[k][1],
              y: vm.earnings[k][0],
            });
          }
        }

        for (let k = 0; k < dateWherenbrearningzero.length; k++) {
          {
            vm.chartEarningData.datasets[0].data.push({
              x: dateWherenbrearningzero[k],
              y: 0,
            });
          }
        }
        vm.chartEarningData.datasets[0].data.sort((a, b) =>a.x > b.x ? 1 : -1);

        console.log("helloeee",vm.chartEarningData.datasets[0].data)



    vm.chart2=new Chart(ctx1, {
      type: "line",
      data: {
        labels: thisWeek,
        datasets: [
          {
            label: "Earnings",
            data:vm.chartEarningData.datasets[0].data,

            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: {
            type: "datetime",
            time: {
              displayFormats: {
                quarter: "MMM YYYY",
              },
            },
          },
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

           const response =await axios.post('withdrawls/get-total');
          if(response.data.total[0]){
            console.log('hello response')
            console.log(response)
        this.total = response.data.total[0].sum;
                this.pourcentage = (this.total * 100) / 75.00;

        }else{
       // this.total = 75.9;
               this.total = 0.00;

        this.pourcentage = (this.total * 100) / 75.00;
}
    
  },
   methods: {
    
    getDates: function(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
},

    updateValue: function(value) {
      this.value=[]
      this.value=value
      this.mydates=this.getDates(this.value.start, this.value.end)
      // console.log(this.dates)
     },

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
  }
};
</script>
