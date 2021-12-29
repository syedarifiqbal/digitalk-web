<template>
  <div class="py-2 my-4 mx-4 table-content">
    <div class="d-flex justify-content-between mb-0">
      <div class="d-flex">
        <router-link class="d-flex p-3" :to="{ name: 'admin.tasks.index' }"
          >All Tasks</router-link
        >
        <router-link class="d-flex p-3" :to="{ name: 'admin.locations.index' }"
          >All Locations</router-link
        >
      </div>
      <filters />
    </div>
    <table class="w-100" v-if="adminTasks">
      <thead>
        <tr>
          <th>Task Summary</th>
          <th>Status</th>
          <th>Due Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in adminTasks.data" :key="task.id">
          <td>{{ task.summary }}</td>
          <td>{{ task.completed ? "Complated" : "Incomplete" }}</td>
          <td>{{ task.due_at | dateFormat }}</td>
          <td>
            <b-dropdown dropleft :id="`dropdown-${task.id}`" class="m-md-2">
              <b-dropdown-item>Third Action</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>Third Action</b-dropdown-item>
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <MyPagination :data="adminTasks" @pageChagne="loadTasks" @pagePageChange="chagneLimit"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Filters from "../Filters.vue";
import filters from "../../../filters.js";
import MyPagination from "../Pagination.vue";
export default {
  filters,
  components: { Filters, MyPagination },
  data: () => ({
    form: undefined,
  }),
  computed: {
    ...mapGetters(["adminTasks"]),
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    loadTasks(page = 1){
      this.$store.dispatch("LOAD_ADMIN_TASK", {page, per_page: this.per_page});
    },
    chagneLimit(per_page){
      this.$store.dispatch("LOAD_ADMIN_TASK", {page: 1, per_page});
    }
  },
};
</script>

<style scoped>
.swipeout-list.card {
  border: none;
}
.swipeout-action {
  background: red;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
}
.swipeout-action i {
  cursor: pointer;
}
.swipeout-content * {
  cursor: all-scroll;
  user-select: none;
}
table tr {
  border-bottom: 1px solid #eee;
}

table tr td,
table tr th {
  padding: 25px;
}
</style>