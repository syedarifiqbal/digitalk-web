<template>
  <div class="s-layout">
    <!-- Sidebar -->
    <div class="s-layout__sidebar">
      <a class="s-sidebar__trigger" href="#0" @click.prevent="">
        <i class="fa fa-bars"></i>
      </a>
      <Sidebar />
    </div>

    <!-- Content -->
    <main class="s-layout__content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
export default {
  name: "HelloWorld",
  components: { Sidebar },
  props: {
    msg: String,
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
  /* justify-content: center;
  align-items: center; */
  flex: 1;
  padding: 20px 25px;
  background-color: white;
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
</style>
