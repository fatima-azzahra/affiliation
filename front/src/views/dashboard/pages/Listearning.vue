<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Earning list"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Earning list"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Origine Price
            </th>
            <th class="primary--text">
              Pourcentage
            </th>
            <th class="primary--text">
              price
            </th>
            <th class="primary--text">
              Status
            </th>
            <th class="primary--text">
              Date
            </th>
             <th class="primary--text">
              withdrawable
            </th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="e in earning" :key="e">
            <td>{{e.originalPrice}} $</td>
            <td>{{e.pourcentage}} %</td>
            <td>{{e.price}} $</td>
            <td >
              <b title ="this earning has been withdrawn" v-if="e.isPaidOut==true"><v-icon color="green" >mdi-album</v-icon></b> 
              <b title ="this earning has been cenceled" v-if="e.isCenceled==true"><v-icon color="red" >mdi-album</v-icon></b>
              <b title="this income is withdrawable but check id it's ready or not" v-if="e.isCenceled==false&&e.isPaidOut==false"><v-icon color="orange" >mdi-album</v-icon></b>  
            </td>
            <td>{{e.createdAt
            
              }}</td>
            <td>
              <b v-if="e.isCenceled==true">__</b>
              <b v-else-if="e.isPaidOut==true">__</b>
              <b v-else-if="(diffdate(e.createdAt)<7)">Pending</b>
              <b v-else-if="(diffdate(e.createdAt)>7)">Ready</b>

            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />

   
  </v-container>
</template>

<script>
import axios from 'axios'
// import moment from"moment"
  export default {
    data: () => ({
      earning:[],
      
    }),


    created () {
      this.initialize()
    },
  

    methods: {
      async initialize () {
   
        const response =await axios.get(
        "/earning/getAll");
        this.earning=response.data.result;
       
      },
      diffdate:function(date) {
     //  var diff = - moment(date, 'DD-MM-YYYY').diff(Date.now(),'days')
      var diff = 0
     var date1 = new Date(date);
 var date2 = new Date('2021-06-06 22:16:57');                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    var sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-sec)/60);    // Nombre de minutes (partie entière)
    var min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-min)/60);    // Nombre d'heures (entières)
    var hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-hour)/24);   // Nombre de jours restants
    diff = tmp;
     
       console.log(diff)
         return diff; 
      }
    },
  }
</script>