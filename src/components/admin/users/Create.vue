<template>
  <div class="py-2 my-4 mx-4 table-content">
    <div class="d-flex justify-content-between mb-0">
      <div class="d-flex">
        <a class="d-flex p-3" href="#"
          >{{ ID? "Edit" : "Create" }} User</a>
      </div>
    </div>
    <form class="p-5" @submit.prevent="validateAndSave">
        <div class="form-group mb-4">
            <input type="text" name="name" v-validate="'required'" class="form-control" v-model="form.name" placeholder="Enter name">
            <span class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</span>
        </div>
        <div class="form-group mb-4">
            <input type="email" name="email" v-validate="'required|email'" class="form-control" v-model="form.email" placeholder="Enter Email">
            <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group mb-4">
            <input type="password" name="password" v-validate="{required: !!!ID}" class="form-control" v-model="form.password" :placeholder="ID? 'If password provided it will change the password': 'Enter Password'">
            <span class="text-danger" v-if="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <div class="form-group mb-4">
            <label>
            <input type="checkbox" name="email" v-model="form.is_admin">
            Admin
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary">Save</button>
        </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {  },
  props: {ID: { required: false }},
  data: () => ({
    form: {
        email: '',
        password: '',
        is_admin: false,
        name: ''
    },
  }),
  computed: {
    ...mapGetters(["users"]),
  },
  mounted() {
      this.loadUser();
  },
  methods: {
    async loadUser(){
        if(!this.ID) return;

        const data = await this.$store.dispatch("GET_USER", {id: this.ID});

        this.form = data;
    },
    async validateAndSave(){
        if( ! await this.$validator.validateAll() ) return;

        try {
            const data = await this.$store.dispatch(this.ID? 'UPDATE_USER': 'CREATE_USER', this.form);

            this.$notify({
                title: 'Success',
                type: 'success',
                text: this.ID? "Updated Successfully": "Created Successfully"
            });

            this.$router.replace({name:"admin.users.index"});
        } catch (error) {
            alert('something went wrong.');
        }
    }
  },
};
</script>

<style scoped>
</style>