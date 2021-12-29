<template>
<div>

  <header>
    <h1>Admin Panel</h1>
    <ul class="" v-if="authUser">
      <li>
        <a href="">
          {{ authUser.name }}
        </a>
        <img
          width="48"
          height="48"
          src="https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/cache/3.JPG-nggid03125-ngg0dyn-591x591-00f0w010c010r110f110r010t010.JPG"
          alt="Profile Image"
        />
      </li>
    </ul>
  </header>
  <nav>
      <create-task  :task="undefined" :admin="true"/>
      <div class="mx-3"></div>
      <create-location :admin="true"/>
  </nav>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateTask from "../tasks/Create.vue";
import CreateLocation from "../locations/Create.vue";
export default {
  components: { CreateTask, CreateLocation },
  computed: {
    ...mapGetters(["authUser"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
}
header h1 {
  font-size: 22px;
}
header ul {
  list-style-type: none;
}
header ul li {
  display: inline-block;
}
header ul li img {
  border-radius: 50%;
}
header+nav {
  display: flex;
  justify-content: end;
  padding: 0 25px;
}
</style>
