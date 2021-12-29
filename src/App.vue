<template>
  <div id="app">
    <preloader/>
    <notifications/>
    <router-view></router-view>
  </div>
</template>

<script>
// import Layout from './components/Layout.vue'
import Preloader from './components/Preloader.vue';
import Notifications from './components/Notifications.vue';
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
    // Layout
    Preloader,
    Notifications,
  },
  mounted(){
    
  }
}
</script>