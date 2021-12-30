<template>
  <div id="app">
    <preloader/>
    <PuserNotifications/>
    <router-view></router-view>
    <notifications/>
  </div>
</template>

<script>
// import Layout from './components/Layout.vue'
import Preloader from './components/Preloader.vue';
import PuserNotifications from './components/Notifications.vue';
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
    // Layout
    Preloader,
    PuserNotifications,
  },
  mounted(){
    
  }
}
</script>