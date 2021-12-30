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
    <div class="">
    <table class="w-100" v-if="locations">
      <thead>
        <tr>
          <th>Locations</th>
          <th>Coordinate</th>
          <th>Check in Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4" v-if="locations.data && locations.data.length === 0">No record found</td>
        </tr>
        <tr v-for="task in locations.data" :key="task.id">
          <td>{{ task.location }}</td>
          <td>{{ task.lat }}, {{ task.lng }}</td>
          <td>
            <p class="mb-0">{{ task.date }}</p>
            <span class="text-muted">{{ task.time }}</span>
          </td>
          <td>
            <b-dropdown dropleft :id="`dropdown-${task.id}`" class="m-md-2">
              <b-dropdown-item>Not implemented</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>Not implemented</b-dropdown-item>
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <MyPagination :data="locations" @pageChagne="loadLocations" @pagePageChange="chagneLimit"/>
    </div>
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
    ...mapGetters(["locations"]),
  },
  mounted() {
      this.loadLocations();
  },
  methods: {
    loadLocations(page = 1){
      this.$store.dispatch("LOAD_ADMIN_LOCATION", {page, per_page: this.per_page});
    },
    chagneLimit(per_page){
      this.$store.dispatch("LOAD_ADMIN_LOCATION", {page: 1, per_page});
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
td span.text-muted{
    font-size: 14px;
    color: rgba(197, 199, 205, 1);
}
</style>