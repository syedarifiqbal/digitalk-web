<template>
  <section class="container">
      <form class="row" @submit.prevent="validateAndLogin">
          <div class="col-md-4 offset-4">
              <h2 class="text-center mb-4">{{ isAdmin? "Admin Log In":"Log In" }}</h2>
              <div class="form-group">
                  <input type="email" class="form-control" v-model="form.email" placeholder="Email">
              </div>
              <div class="form-group mt-4 mb-5">
                  <input :type="showPassword? 'text': 'password'" class="form-control" v-model="form.password" placeholder="Password">
                  <a href="#" @mousedown="showPassword = !showPassword"  @mouseup="showPassword = !showPassword" @click.prevent="" class="show-password">{{ showPassword? 'Hide': 'Show' }}</a>
              </div>

              <button class="btn btn-primary w-100">Login</button>
          </div>
      </form>
    
  </section>
</template>

<script>
export default {
  props: {
    isAdmin: { required: true }
  },
  data: () => ({
    form: {
      email: "arifiqbal@outlook.com",
      password: "Admin123",
    },
    showPassword: false,
  }),
  mounted() {
  },
  methods: {
    async validateAndLogin() {
      if (!(await this.$validator.validateAll())) {
        return;
      }
      try {
        const {data: {user}} = await this.$auth.login(this.form);
        await this.$store.commit('SET_AUTH', user);
        this.$router.replace({name: user.is_admin? 'admin.tasks.index': 'tasks.index'});
      } catch (error) {
          console.error(error);
      }
    },
  },
};
</script>
<style>
section.container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form-control {
    background: rgba(246, 246, 246, 1);
    padding: 10px;
    border: 1px solid #E8E8E8;
}
a.show-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
}
.form-group {
    position: relative;
}
</style>