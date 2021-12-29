<template>
  <div class="s-layout">
    <!-- Sidebar -->
    <div class="s-layout__sidebar">
      <a class="s-sidebar__trigger" href="#0" @click.prevent="">
        <i class="fa fa-bars"></i>
      </a>
      <Sidebar/>
    </div>

    <!-- Content -->
    <main class="s-layout__content main-content">
      <top-header></top-header>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./Sidebar.vue";
import TopHeader from "./Header.vue";
export default {
  name: "AdminLayout",
  components: { Sidebar, TopHeader },
  mounted() {},
  computed: {
    ...mapGetters(["authUser"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* Primary Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  font-size: 1em;
  color: #333;
}

h1 {
  font-size: 1.4em;
}

em {
  font-style: normal;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Layout */
.s-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.s-layout__content {
  display: flex;
  flex: 1;
}
.main-content {
  padding: 0 !important;
  display: block !important;
  background-color: #f7f8fc;
}

/* Sidebar */
.s-sidebar__trigger {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4em;
  /* background: #192b3c; */
}

.s-sidebar__trigger > i {
  display: inline-block;
  margin: 1.5em 0 0 1.5em;
  color: #f07ab0;
}

.table-content {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px #eee;
}

td .dropdown-toggle::after {
    content: "\f142";
    font-family: var(--fa-style-family,"Font Awesome 6 Free");
    font-weight: var(--fa-style,900);
    border-left: none;
    border-right: none;
    border-bottom: none;
    border-top: none;
}

td .dropdown-toggle {
    background: transparent;
    color: black;
    border: none;
}


td .dropdown-toggle:hover {
    background: transparent;
    color: black;
}
</style>
