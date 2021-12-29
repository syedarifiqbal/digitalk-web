<template>
  <div>
    <Create :task="form" @modalClosed="form=undefined" />

    <p class="mt-5"><strong>Incomplete Tasks</strong></p>
      <swipe-list
        ref="list"
        class="card"
        :disabled="false"
        :items="incompleteTasks"
        item-key="id"
        @swipeout:click="itemClick"
      >
        <template v-slot="{ item }">
          <task-card
            :task="item"
          />
        </template>

        <template v-slot:right="{ item, index }">
          <div class="swipeout-action blue">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-trash" @click="deleteTask(item.id, index)"></i>
          </div>
        </template>

      </swipe-list>

    <p class="mt-5"><strong>Completed Tasks</strong></p>
      <swipe-list
        ref="list"
        class="card"
        :disabled="false"
        :items="completedTasks"
        item-key="id"
        @swipeout:click="itemClick"
      >
        <template v-slot="{ item }">
          <task-card
            :task="item"
          />
        </template>

        <template v-slot:right="{ item, index }">
          <div class="swipeout-action blue">
            <!-- place icon here or what ever you want -->
            <i class="fa fa-trash" @click="deleteTask(item.id, index)"></i>
          </div>
        </template>
      </swipe-list>
  </div>
</template>

<script>
import Create from "./Create.vue";
import { mapGetters } from "vuex";
import TaskCard from "./task-card.vue";
import { SwipeList } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';
export default {
  components: { Create, TaskCard, SwipeList },
  data: () => ({
    form: undefined,
  }),
  computed: {
    ...mapGetters(["incompleteTasks", "completedTasks"]),
  },
  mounted(){
      this.$store.dispatch("LOAD_TASK");
  },
  methods: {
      itemClick(task){
        //   this.$store.commit("DELETE_TASK", id);
        //   console.log(x,y,z);
        this.form = task;
      },
      deleteTask(id){
          this.$store.commit("DELETE_TASK", id);
      }
  }
};
</script>

<style scoped>
.swipeout-list.card{
    border: none;
}
.swipeout-action {
    background: red;
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
}
.swipeout-action i {
    cursor: pointer;
}
.swipeout-content * {
    cursor: all-scroll;
    user-select: none;
}
</style>