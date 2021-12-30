<template>
  <section>
    <a href="#" v-b-modal.modal-1 :class="{ 'admin-create-icon': admin }">
      <i class="fa fa-plus"></i>
      Add new task
    </a>
    <b-modal
      id="modal-1"
      no-close-on-backdrop
      no-close-on-esc
      hide-header
      hide-footer
      size="lg"
    >
      <form @submit.prevent="validateAndSave()">
        <div class="container">
          <h4 class="mt-3">New Task</h4>

          <div class="input-group px-3 mt-4">
            <i class="far fa-comment"></i>
            <input
              type="text"
              v-validate="'required'"
              name="summary"
              placeholder="Summary"
              v-model="form.summary"
            />
          </div>
          <span class="text-danger" v-if="errors.has('summary')">{{
            errors.first("summary")
          }}</span>

          <div class="input-group px-3 mt-4">
            <i class="fa fa-align-right"></i>
            <textarea
              v-validate="'required'"
              name="description"
              placeholder="description"
              v-model="form.description"
            />
          </div>
          <span class="text-danger" v-if="errors.has('description')">{{
            errors.first("description")
          }}</span>

          <div class="input-group px-3 mt-4">
            <i class="far fa-clock"></i>
            <Datetime
              hidden-name="due_date"
              type="datetime"
              v-model="due_at"
            />
          </div>

          <span class="text-danger" v-if="errors.has('due_date')">{{
            errors.first("due_date")
          }}</span>
        </div>

        <div class="container mt-5">
          <div class="row">
            <div class="col-md-6 offset-3 text-center">
              <button class="btn btn-primary w-100">Save</button>
              <a href="#" @click.prevent="closeModal" class="mb-3 mt-4 d-block"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </form>
    </b-modal>

    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button>

        <b-modal id="modal-1" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
        </b-modal> -->
  </section>
</template>

<script>
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
export default {
  components: { Datetime },
  props: {
    task: { required: true },
    admin: { required: false, default: false },
  },
  data: () => ({
    form: {
      summary: "",
      description: "",
      due_at: "",
      completed: false,
    },
    due_at: '',
  }),
  mounted() {
    // this.$http.get(api).then((response) => {
    //     console.log(response.data)
    // })
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("modal-1");
      this.clearForm();
    },
    async validateAndSave() {
      if (!(await this.$validator.validateAll())) {
        return;
      }
      try {
        const data = await this.$store.dispatch(this.form.id? "UPDATE_TASK": "CREATE_TASK", this.form);
      } catch (error) {
        this.$bvModal.hide("modal-1");
      }
      this.$bvModal.hide("modal-1");

      this.$emit("modalClosed");
      this.$store.dispatch(this.admin? 'LOAD_ADMIN_TASK': 'LOAD_TASK');
      this.clearForm();
    },
    clearForm() {
      this.form = {
        summary: "",
        description: "",
        // due_at: "",
        completed: false,
      };
    },
  },
  watch: {
    task: function () {
      if (this.task === undefined) return;

      this.form = { ...this.task };
      this.$bvModal.show("modal-1");
    },
    due_at: function () {
      this.form.due_at = this.due_at;
    },
  },
};
</script>
<style>
.modal-header {
  border-bottom: 1px solid transparent !important;
}
.modal-footer {
  border-top: 1px solid transparent !important;
}
.input-group {
  display: flex;
  /* align-items: center !important; */
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 10px;
}

.input-group input,
.input-group textarea {
  flex: 1;
  border: none;
  resize: none;
}
.input-group textarea {
  min-height: 100px;
}

.input-group i {
  display: flex;
  margin-top: 5px;
  padding-right: 15px;
}

.input-group input:focus,
.input-group textarea:focus {
  border: none;
  outline: none;
}
.admin-create-icon i {
  display: inline-block;
  background: #f0f1f7;
  color: #9fa2b4;
  padding: 5px;
  border-radius: 5px;
}
</style>