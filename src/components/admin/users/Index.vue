<template>
  <div class="py-2 my-4 mx-4 table-content">
    <div class="d-flex justify-content-between mb-0">
      <div class="d-flex">
        <a class="d-flex p-3" href="#">All Users</a>
      </div>
      <filters />
    </div>
    <table class="w-100" v-if="users">
      <thead>
        <tr>
          <th>User Details</th>
          <th>Total Tasks</th>
          <th>Last Updated</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.data" :key="user.id">
          <td>
            <p class="mb-0">{{ user.name }}</p>
            <span class="text-muted">Active {{ user.last_active }}</span>
          </td>
          <td>{{ user.tasks_count }}</td>
          <td>
            <p class="mb-0">{{ user.date }}</p>
            <span class="text-muted">{{ user.time }}</span>
          </td>
          <td>
            <b-dropdown dropleft :id="`dropdown-${user.id}`" class="m-md-2">
              <b-dropdown-item
                @click="
                  $router.push({
                    name: 'admin.users.edit',
                    params: { ID: user.id },
                  })
                "
                >Edit</b-dropdown-item
              >
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click.prevent="deleteUser(user.id)"
                >Delete</b-dropdown-item
              >
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <MyPagination
      v-if="users"
      :data="users"
      @pageChange="loadUsers"
      @pagePageChange="chagneLimit"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MyPagination from "../Pagination.vue";
import Filters from "../Filters.vue";
export default {
  components: { MyPagination, Filters },
  data: () => ({
    form: undefined,
  }),
  computed: {
    ...mapGetters(["users"]),
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    loadUsers(page = 1) {
      this.$store.dispatch("LOAD_USERS", { page, per_page: this.per_page });
    },
    chagneLimit(per_page) {
      this.$store.dispatch("LOAD_USERS", { page: 1, per_page });
    },
    async deleteUser(id) {
      try {
        await this.$store.dispatch("DELETE_USER", { id });

        this.$notify({
          title: "Success",
          type: "success",
          text: "Deleted Successfully",
        });
        this.loadUsers();
      } catch (error) {
        this.$notify({
          title: "Error",
          type: "error",
          text: error.response.message || "Something went wrong",
        });
      }
    },
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