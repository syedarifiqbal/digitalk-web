<template>
  <section>
    <!-- <a href="#" @click.prevent="getCurrentLocation">
      <i class="fa fa-plus"></i>
      Check In
    </a> -->
    <Create/>
    <p class="mt-5"><strong>Current Location</strong></p>
    <ul class="list-unstyled">
      <li v-if="location">
        <p class="mb-0">
          <i class="fa fa-map-pin px-3 text-danger"></i>
          {{ location }}
        </p>
        <p>
          <i class="fa fa-map-pin px-3 text-white"></i>
          {{ lat }}, {{ lng }}
        </p>
      </li>
      <li v-else>Please Checkin</li>
    </ul>
    <p class="mt-5"><strong>Previous Location</strong></p>
    <ul class="list-unstyled" v-if="locations">
      <li v-for="location in locations.data" :key="location.id">
        <p class="mb-0">
          <i class="fa fa-map-pin px-3 text-danger"></i>
          {{ location.location }}
        </p>
        <p>
          <i class="fa fa-map-pin px-3 text-white"></i>
          {{ location.lat }}, {{ location.lng }}
        </p>
      </li>
    </ul>
    <p v-else>Please wait...</p>
    <pagination v-if="locations" :data="locations" @pagination-change-page="getResults"></pagination>
  </section>
</template>

<script>
import Create from './Create.vue'
import { mapGetters } from "vuex";
export default {
  components: { Create },
  data: () => ({
    location: "",
    lat: undefined,
    lng: undefined,
  }),
  mounted() {
    this.$store.dispatch('LOAD_LOCATIONS');
  },
  computed: {
    ...mapGetters(["locations"]),
  },
  methods: {
    getResults(page){
      this.$store.dispatch('LOAD_LOCATIONS', page);
    }
  },
};
</script>
