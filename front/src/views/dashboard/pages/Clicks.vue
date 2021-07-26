<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Clicks Table"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Clicks Table"
      class="px-5 py-3"
    >
      <v-data-table :headers="headers" :items="clicks" class="elevation-1">
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
      { text: "Link", value: "link" },
    ],
    clicks: []
  }),
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      const response = await axios.post(
        "clicks/getAll");
      this.clicks = response.data.result.map((item) => {
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
          link: item.link,
        };
      });
      //  console.log(this.date.getMonth())
    },
  },
};
</script>
