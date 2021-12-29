<template>
  <section>
    <a href="#" v-b-modal.location-create-modal :class="{ 'admin-create-icon': admin }">
      <i class="fa fa-plus"></i>
      Check In
    </a>
    <b-modal
      id="location-create-modal"
      no-close-on-backdrop
      no-close-on-esc
      hide-header
      hide-footer
      size="lg"
    >
      <form @submit.prevent="validateAndSave()">
        <div class="container">
          <h4 class="mt-3">New Location</h4>

          <div class="input-group px-3 mt-4">
            <i class="fa fa-map-marker"></i>
            <input
              type="text"
              v-validate="'required'"
              name="location"
              placeholder="Fetching Location"
              v-model="form.location"
            />
          </div>
          <span class="text-danger" v-if="errors.has('location')">{{
            errors.first("location")
          }}</span>
        </div>

        <div class="container mt-5">
          <div class="row">
            <div class="col-md-6 offset-3 text-center">
              <button class="btn btn-primary w-100">Save</button>
              <a href="#" @click.prevent="closeModal" class="mb-3 mt-4 d-block">Cancel</a>
            </div>
          </div>
        </div>
      </form>
    </b-modal>

    <!-- <b-button v-b-modal.location-create-modal>Launch demo modal</b-button>

        <b-modal id="location-create-modal" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
        </b-modal> -->
  </section>
</template>

<script>
export default {
  props: {
    admin: { required: false, default: false },
  },
  data: () => ({
    form: {
      location: "",
      lat: '',
      lng: '',
    },
  }),
  mounted() {
    // this.$http.get(api).then((response) => {
    //     console.log(response.data)
    // })
    this.$root.$on('bv::modal::show', ({type}, modalId) => {
      if(modalId === 'location-create-modal' && type === 'show'){
          this.getCurrentLocation(false);
      }
    });
  },
  methods: {
    closeModal() {
      this.$bvModal.hide("location-create-modal");
    },
    async validateAndSave() {
      if (!(await this.$validator.validateAll())) {
        return;
      }
      try {
        const data = await this.$store.dispatch("CREATE_LOCATION", this.form);
      } catch (error) {
        this.$bvModal.hide("location-create-modal");
      }
      this.$bvModal.hide("location-create-modal");

      this.$emit("modalClosed");
    },
    getCurrentLocation(shouldDispatch = true) {
      if (!navigator.geolocation) {
        alert("Your browser not supported geolocation feature.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.form.lat = position.coords.latitude;
          this.form.lng = position.coords.longitude;
          this.codeLatLng(shouldDispatch);
        },
        (e) => console.log(e)
      );
    },
    async codeLatLng(shouldDispatch) {
      const {
        data: { results },
      } = await this.$http.get(`/locations/${this.form.lat}/${this.form.lng}`);

      this.form.location = results
        .filter((r) => r.types.includes("premise") || r.types.includes('street_address'))
        .shift().formatted_address;

      if (!shouldDispatch) return;

      try {
        const data = await this.$store.dispatch("CREATE_LOCATION", {
          location: this.form.location,
          lat: this.form.lat,
          lng: this.form.lng,
          time: new Date(),
        });
      } catch (error) {
        console.error(error);
      }
    },
    
  }
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