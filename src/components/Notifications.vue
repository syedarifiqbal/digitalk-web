<template>
  <div class="notification-container" v-if="notifications.length > 0">
    <div
      class="notification"
      v-for="(notification, index) in notifications"
      :key="notification.id"
    >
      <div class="notification-header"></div>
      <div class="notification-body">
        <div class="notification-content">
          <h3>{{ notification.summary }}</h3>
          <p>{{ notification.description }}</p>
        </div>
        <div class="icon-container">
          <i class="fa fa-clock"></i>
        </div>
      </div>
      <div class="notification-footer">
        <a href="#" @click.prevent="deleteNotification(index)">Skip</a>
        <a href="#" @click.prevent="remindMeLater(index)">Remind me later.</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import baseUrl from '../main';
export default {
  data: () => ({
    Pusher: window.Pusher,
    notifications: [],
    alreadySubscribed: false,
  }),
  computed: {
    ...mapGetters(['authUser']),
  },
  mounted() {
    // Enable pusher logging - don't include this in production
    // this.Pusher.logToConsole = true;
  },
  methods: {
    deleteNotification(index) {
      this.notifications.splice(index, 1);
    },
    remindMeLater(index) {
      alert("This feature is not build.");
    },
    subscriptPusherEvents(){
      var pusher = new this.Pusher("1a62105181a4f7b62bff", {
        cluster: "ap2",
        authEndpoint: `${baseUrl.baseURL}/api/broadcasting/auth`,
        auth: {
          headers: { Authorization: `Bearer ${this.$auth.getToken()}` },
        },
      });
      var channel = pusher.subscribe(`private-task.${this.authUser.id}`);
      channel.bind("due", (data) => {
        try {
          data = JSON.parse(data.toString());
        } catch (error) {
          console.log('')
        }
          console.log(data);
        const taskExists = this.notifications.findIndex(
          (n) => n.id === data.task.id
        );
        if (taskExists >= 0) return;
        this.notifications.push(data.task);
        // app.messages.push(JSON.stringify(data));
      });
      this.alreadySubscribed = true;
    }
  },
  watch: {
    'authUser': function(){
      if(this.authUser === undefined || this.alreadySubscribed) return;
      this.subscriptPusherEvents();
    }
  }
};
</script>
<style>
.notification-container {
  position: fixed;
  top: 0;
  right: 0;
  max-width: 350px;
  height: 100%;
  /* background: #ffffffa3; */
  z-index: 10002;
  padding: 10px;
  overflow-y: auto;
}
.notification {
  background: white;
  margin-bottom: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}
.notification-body {
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
}

.notification-content {
  flex: 1;
  margin-right: 20px;
}

.notification-content h3{
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 0;
}

.notification-content p{
    margin-bottom: 0;
}

.icon-container {
  background: #fabb18;
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 22px;
}

.notification-footer {
  background: #f7f5f5;
  display: flex;
  justify-content: flex-end;
}

.notification-footer a {
  display: flex;
  padding: 5px;
  margin-left: 10px;
}
</style>