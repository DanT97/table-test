<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ClientsTable :clients="clients" />
  </div>
</template>

<script>
// @ is an alias to /src
import ClientsTable from "@/components/ClientsTable.vue";
import TableService from "@/services/TableService.js";

export default {
  name: "HomeView",
  components: {
    ClientsTable,
  },
  data() {
    return {
      clients: [],
      currentClients: 4,
      filteredClients: [],
    };
  },
  created() {
    TableService.getClients()
      .then((response) => {
        this.clients = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
