<template>
    <nav class="game">
      <ul>
        <li><span>Game</span>{{game.name.toUpperCase()}}</li>
        <li><span>Telemetry version</span>{{telemetryVersion}}</li>
        <li><span>Game time</span>{{formatedTime()}}</li>
        <li><span>&copy;</span>JAGFx - v0.0.1</li>
        <!--<li><span>Uptime</span>{{formatedTimestamp()}}</li>-->
      </ul>
      
      <!--<div><span>Game:</span><span>{{game.name.toUpperCase()}}</span></div>
      <div><span>Telemetry version:</span><span>{{telemetryVersion}}</span></div>
      &lt;!&ndash;<div><span>Paused:</span><span>{{paused ? "YES" : "NO"}}</span></div>&ndash;&gt;
      <div><span>Uptime:</span><span>{{formatedTimestamp()}}</span></div>
      <div><span>Game time:</span><span>{{formatedTime()}}</span></div>-->
    </nav>
</template>

<script>
  import Window from '@/components/Window.vue'

  export default {
    name: 'Game',

    components: {
      Window
    },

    props: [
      "timestamp",
      "time",
      "game",
      "paused",
      "sdkActive",
      "pluginVersion",
      "version",
      "telemetryVersion",
      "maxTrailerCount",
      "scale"
    ],

    methods: {
      double: function(num) {
        return  num < 10 ? `0${num}` : num
      },
      formatedTimestamp: function() {
          const hours = Math.floor( this.timestamp.value / 3600000 );
          const min   = Math.floor( this.timestamp.value % 3600000 / 60000 );
          const sec   = Math.floor( this.timestamp.value % 3600000 % 60000 / 1000 );
    
          return `${ this.double( hours ) }:${ this.double( min ) }:${ this.double( sec ) }`;
      },
      formatedTime: function() {
          const date = new Date( this.time.unix );
    
          const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        
        return `${days[date.getUTCDay()]} ${this.double(date.getUTCHours())}:${this.double(date.getUTCMinutes())}`
      }
    }
  }
</script>

<style scoped lang="scss">
  .game {
    background: #272727;
      font-size: .7rem;
      border-bottom: 1px solid var(--color-red);
      margin-bottom: .5rem;
    
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
        margin: 0;
      
      li {
        list-style: none;
        padding: 0.5rem 1rem;
        
        span {
          padding: .2rem .5rem;
          background: var(--color-red);
          color: var(--color-text);
          border-radius: 1rem;
          margin-right: .5rem;
        }
      }
    }
  }
  
  .info,
  .info div {
    display: grid;    
  }

  .info {
    grid-gap: var(--spacing);
  }

  .info div {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .info div span:nth-child(1) {
    font-weight: bold;
  }
</style>
