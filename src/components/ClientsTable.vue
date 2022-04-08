<template>
  <div class="clientsTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clientsPerPage" :key="client.id">
          <td>{{ client.first_name + " " + client.last_name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.gender }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btns">
      <button @click="prevPage()">back</button>
      <span>{{ this.currentPage }}</span>
      <button @click="nextPage()">next</button>
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
      pageSize: 4,
      currentPage: 1,
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.clients.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  computed: {
    clientsPerPage() {
      return this.clients.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
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
