<template>
  <v-container id="user-profile" fluid tag="section">
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
    <v-row justify="center">
      
       <v-col cols="12" md="7">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Edit Profile</div>
            <div class="subtitle-1 font-weight-light">Complete Profile</div>
          </template>

          
          <v-form
            @submit.prevent="handleSubmit"
            ref="form"
            v-model="valid1"
            lazy-validation
          >
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Email Address"
                    class="purple-input"
                    v-model="email"
                    :value="`${email}`"
                    :rules="emailRules"
                    required
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                    v-model="first_name"
                    :value="`${first_name}`"
                    :counter="20"
                    :rules="nameRules"
                    required
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                    v-model="last_name"
                    :value="`${last_name}`"
                    :counter="20"
                    :rules="nameRules"
                    required
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Adress"
                    class="purple-input"
                    v-model="address"
                    :value="`${address}`"
                    :counter="30"
                    :rules="addressRules"
                    required
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="City"
                    class="purple-input"
                    v-model="city"
                    :value="`${city}`"
                    :counter="30"
                    :rules="addressRules"
                    required
                  />
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="country"
                    :items="items"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Country"
                    :value="`${country}`"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    class="purple-input"
                    label="Postal Code"
                    type="number"
                    v-model="zip_code"
                    :value="`${zip_code}`"
                    required
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn
                    color="primary"
                    :disabled="!valid1"
                    class="mr-0"
                 
                    type="submit"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="5">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Edit Password</div>
            <div class="subtitle-1 font-weight-light">Change your password</div>
          </template>

          <v-form
            @submit.prevent="handleSubmit2"
            ref="form"
            v-model="valid2"
            lazy-validation
          >
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="12">
                  <v-text-field
                    class="purple-input"
                    label="Old Password"
                    v-model="old_password"
                    type="password"
                    :rules="passwordRules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    class="purple-input"
                    label="New Password"
                    v-model="new_password"
                    type="password"
                    :rules="passwordRules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <v-text-field
                    class="purple-input"
                    label="Confirm New Password"
                    v-model="confirm_new_password"
                    type="password"
                    :rules="passwordRules"
                    required
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn
                    color="primary"
                    :disabled="!valid2"
                    class="mr-0"
                    
                    type="submit"
                  >
                    Update Password
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
import axios from "axios";

export default {
  data() {
    return {
      valid1: true,
      valid2: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
      zipRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      addressRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 3) || "Address must be more than 3 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Morocco", "Algerie", "France", "Italie"],
      passwordRules: [
        (v) => !!v || "Name is required",
        (v) =>
          (v && v.length >= 8) || "Password must be more than 8 characters",
      ],
      first_name: "",
      last_name: "",
      email: "",
      city: "",
      zip_code: "",
      country: "",
      address: "",
      old_password: "",
      new_password: "",
      confirm_new_password: "",
      message: "",
      error: "",
      id:'',
      idf:'',
    };
  },
  methods: {
    getid:async function(){
      const responseid = await axios.post("/getID");
      console.log(responseid.data.id);
this.idf=responseid.data.id;
    },
    getUnits: async function () {
 

       const response = await axios.post("/profile");
      if (response.data) {
     
        this.first_name = response.data.user.first_name;
        this.last_name = response.data.user.last_name;
        this.email = response.data.user.email;
        this.country = response.data.user.address.country;
        this.city = response.data.user.address.city;
        this.zip_code = response.data.user.address.zip_code;
        this.address = response.data.user.address.address;
        }
   
    },
    async handleSubmit() {
      const response = await axios.post(
        "/update-profile",
        {
          id:this.idf,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          address: this.address,
          city: this.city,
          country: this.country,
          zip_code: this.zip_code,
        }
      );

      //    console.log(response.data.message);
      if (response.data.error) {
        this.message = "";
        this.error = response.data.error;
      } else {
        this.error = "";
        this.message = response.data.message;
      }
    },
    async handleSubmit2() {
      if (this.new_password === this.confirm_new_password) {
        const response = await axios.post(
          "update-password",
          {
            id: localStorage.getItem('currentUser'),
            old_password: this.old_password,
            new_password: this.new_password,
          }
        );
        if (response.data.error) {
          this.message = "";
          this.error = response.data.error;
        } else {
          this.error = "";
          this.message = response.data.message;
        }
      } else {
        this.message = "";
        this.error = "try to enter the same password";
      }
    },
  },
  created: function () {
    this.getid();
    this.getUnits();
  },
};
</script>

