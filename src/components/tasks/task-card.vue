<template>
  <div class="card-content mb-3">
    <p class="mb-1">
      <input type="checkbox" @change="toggleTaskCompletion($event, task.id)" :checked="task.completed">
      {{ task.summary }}</p>
    <p style="padding-left: 15px">
      <i class="far fa-clock"></i>
      {{ task.due_at | dateFormat }}
    </p>
  </div>
</template>

<script>
import filters from '../../filters';
export default {
  filters,
  props: {
    task: {
      required: true,
    },
  },
  computed: {
  },
  methods: {
    toggleTaskCompletion($event, id){
      $event.target.checked = !$event.target.checked;
      this.$store.commit("TOGGLE_TASK_COMPLETION", id);
    }
  }
};
</script>