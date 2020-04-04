<template>
  <Window title="Event log" :items="['log']">
    <template v-slot:log>
      <div class="log list">
        <div v-for="item in log">
          <b>{{formatTime(item.timestamp)}}</b>
          <div>{{item.txt}}</div>
        </div>
      </div>
    </template>
  </Window>
</template>

<script>
  import Window from '@/components/Window.vue'

  export default {
    name: 'Events',

    components: {Window},

    props: ["log"],

    methods: {
      formatTime: function(timestamp) {
        const d = new Date(timestamp)
        const double = num => num < 10 ? `0${num}` : num

        return `${d.getFullYear()}.${double(d.getMonth()+1.)}.${double(d.getDate())} ${double(d.getHours())}:${double(d.getMinutes())}:${double(d.getSeconds())}`
      }
    }
  }
</script>

<style scoped>
  .list > div {
    grid-template-columns: 170px minmax(0, 1fr);
  }
</style>