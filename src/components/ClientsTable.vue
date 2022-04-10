<template>
  <div class="clientsTable">
    <input type="text" placeholder="Olha o bacalhau paaaa" v-model="filter" />
    <table>
      <thead>
        <tr>
          <th @click="sortByName()">Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clientsPerPage" :key="client.id">
          <td>{{ client.first_name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.gender }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btns">
      <button @click="prevPage()" v-if="currentPage != 1">back</button>
      <span>{{ this.currentPage }}</span>
      <button @click="nextPage()" v-if="hideNextButton">next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientsTable",
  props: {
    clients: Array,
  },
  data() {
    return {
      filter: "",
      pageSize: 4,
      currentPage: 1,
      clientsFiltred: [],
      sortDir: "AtoZ",
    };
  },
  watch: {
    filter(newText, oldText) {
      if (newText != oldText) {
        this.currentPage = 1;
      }
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.filteredClients.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    sortByName() {
      if (this.sortDir === "AtoZ") {
        this.sortDir = "ZtoA";
      } else if (this.sortDir === "ZtoA") {
        this.sortDir = "AtoZ";
      }
    },
    // searchClient() {
    //   const clientName = row.first_name.toLowerCase();
    //   const searchTerm = this.filter.toLowerCase();
    //   return clientName.includes(searchTerm);
    // },
  },
  computed: {
    filteredClients() {
      return this.clients.filter((client) => {
        const clientName = client.first_name.toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        return clientName.includes(searchTerm);
      });
    },
    sortClients() {
      return this.filteredClients.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === "ZtoA") modifier = -1;
        if (a.first_name < b.first_name) return -1 * modifier;
        if (a.first_name > b.first_name) return 1 * modifier;
        return 0;
      });
    },
    clientsPerPage() {
      return this.sortClients.filter((_, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) {
          return true;
        }
      });
    },
    hideNextButton() {
      return this.currentPage * this.pageSize < this.filteredClients.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clientsTable {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btns {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
table {
  border: 2px solid black;
}
</style>
