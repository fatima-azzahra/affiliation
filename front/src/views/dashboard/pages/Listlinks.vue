<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Affiliate Links"
      link="links/create"
    />
    
    <base-material-card
     
      title="List of links"
      class="px-5 py-3"
    >
   
     <v-data-table
    :headers="headers"
    :items="links"
    :search="search"
    :sort-by="['createdAt', 'nbrClicks']"
    :sort-desc="[false, true]"
    multi-sort
    class="elevation-1"
    :loading="myloadingvariable" 
    loading-text="Laden... even geduld aub"
    
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>List of links</v-toolbar-title>
        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
            <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="createLink()"
            >
              New Link
            </v-btn>
          </template>
          

          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.redirect"
                      label="Redirect"
                    ></v-text-field>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this link?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
     
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>

       <v-icon
        small
        v-clipboard="value"
        @click="copyy(item)"
      >
        mdi-file-multiple-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <b>No data</b>
    </template>
  </v-data-table>
       <div class="text-center">
  </div>
    </base-material-card>

    <div class="py-3" />


  </v-container>
</template>
<script>
import axios from 'axios'

  export default {

    data: () => ({
      dialog: false,
      myloadingvariable:true,
      search:'',
      idLink:'',
      redirect:'',
      dialogDelete: false,
      headers: [
        { text: 'Affiliate link', value: 'route' ,  },
        { text: 'redirect to', value: 'redirect' },
        { text: 'Date', value: 'createdAt' },
        { text: 'nbrClicks', value: 'nbrClicks' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      links: [],
      editedIndex: -1,
      editedItem: {
        _id: '',
        route: '',
        redirect: '',
        nbrClicks:'',
        createdAt: '',
      },
      defaultItem: {
        _id: '',
        route: '',
        redirect: '',
        nbrClicks:'',
        createdAt: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Link' : 'Edit Link'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
     
        const response =await axios.get('/links/getAll');
        this.links=response.data.result;
        this.links = response.data.result.map((item)=>{
          let current_datetime = new Date(item.createdAt);
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
                 _id: item._id,
                 route:'http://localhost:4000/api/clicks/create/'+item.userId+'/'+item.route,
                 redirect : item.redirect,
                 nbrClicks:item.nbrClicks,
                 createdAt :formatted_date
             }
         })
         this.myloadingvariable=false;
       
      },

      editItem (item) {
        this.editedIndex = this.links.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.idLink=item._id;
        this.redirect=item.redirect;
        this.dialog = true
      },

      deleteItem (item) {
       
        this.editedIndex = this.links.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.idLink=item._id;
        this.dialogDelete = true
      },
     
      copyy(item){
           const el = document.createElement('textarea');
  el.value =item.route;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("Copied the text: " + item.route);
      },
      async deleteItemConfirm () {
           this.links.splice(this.editedIndex, 1);
        this.closeDelete();
        await  axios.post('/links/deleteOne',{
               idLink:this.idLink
           });
        this.idLink='';
      },
      createLink(){
        this.$router.push('/links/create');
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.links[this.editedIndex], this.editedItem)
          this.close()
          await  axios.post('/links/update',{
               idLink:this.idLink,
               redirect:this.editedItem.redirect,
           });
           this.idLink='';
        } else {
          this.links.push(this.editedItem)
          this.close()
        }
        
      },
    },
  }
</script>
