<template>
  <nav class="s-sidebar__nav">
    <ul class="h-100">
      <li>
        <router-link class="s-sidebar__nav-link" :to="{ name: 'admin.tasks.index' }">
          <i class="fa fa-file-text"></i><em>Overview</em>
        </router-link>
      </li>
      <li>
        <router-link
          class="s-sidebar__nav-link"
          :to="{ name: 'admin.users.index' }"
        >
          <i class="fa fa-map-marker"></i><em>Users</em>
        </router-link>
      </li>

      <li class="logout">
        <a
          class="s-sidebar__nav-link"
          href="#"
          @click.prevent="logout"
        >
          <i class="fa fa-sign-out-alt"></i><em>Logout</em>
        </a>
      </li>
    </ul>
    
  </nav>
</template>

<script>
export default {
   methods:{ 
      logout(){
         this.$auth.logout();
         this.$router.push({name: 'login'});
      }
   }
}
</script>

<style>
.s-sidebar__nav {
   position: fixed;
   top: 0;
   left: -15em;
   overflow: hidden;
   transition: all .3s ease-in;
   width: 15em;
   height: 100%;
   background: black;
   color: rgba(255, 255, 255, 0.7);
}

.s-sidebar__nav:hover,
.s-sidebar__nav:focus,
.s-sidebar__trigger:focus + .s-sidebar__nav,
.s-sidebar__trigger:hover + .s-sidebar__nav {
   left: 0;
}

.s-sidebar__nav ul {
   position: absolute;
   top: 4em;
   left: 0;
   margin: 0;
   padding: 0;
   width: 15em;
}

.s-sidebar__nav ul li {
   width: 100%;
}

.s-sidebar__nav-link {
   position: relative;
   display: inline-block;
   width: 100%;
   height: 4em;
   border-radius: 0 35px 35px 0;
   color: white;
}

.s-sidebar__nav-link em {
   position: absolute;
   top: 50%;
   left: 4em;
   transform: translateY(-50%);
}

.s-sidebar__nav-link:hover,
.s-sidebar__nav-link.active {
   background: white;
   color: #000;
}

.logout .s-sidebar__nav-link:hover,
.logout .s-sidebar__nav-link {
   background: transparent;
   color: white;
}

.s-sidebar__nav-link > i {
   position: absolute;
   top: 0;
   left: 0;
   display: inline-block;
   width: 4em;
   height: 4em;
}

.s-sidebar__nav-link > i::before {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
}
.s-sidebar__nav ul li.logout {
    position: absolute;
    bottom: 15px;
}

/* Mobile First */
@media (min-width: 42em) {
   .s-layout__content {
      margin-left: 4em;
   }
   
   /* Sidebar */
   .s-sidebar__trigger {
      width: 4em;
   }
   
   .s-sidebar__nav {
      width: 4em;
      left: 0;
   }
   
   .s-sidebar__nav:hover,
   .s-sidebar__nav:focus,
   .s-sidebar__trigger:hover + .s-sidebar__nav,
   .s-sidebar__trigger:focus + .s-sidebar__nav {
      width: 15em;
   }
}

@media (min-width: 68em) {
   .s-layout__content {
      margin-left: 15em;
   }
   
   /* Sidebar */
   .s-sidebar__trigger {
      display: none
   }
   
   .s-sidebar__nav {
      width: 15em;
   }
   
   .s-sidebar__nav ul {
      top: 1.3em;
   }
}
</style>