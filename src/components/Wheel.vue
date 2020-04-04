<template>
  <div class="wheel">
    <b>Wheel #{{id}}</b>
    <div :style="`transform: rotate(${360 * rotation}deg);`"><div></div></div>
    <div :style="`transform: rotate(${180 * steering * -1}deg);`"></div>
    <div v-if="damage"><b>Damage</b><div>{{Math.round(100 * damage)}}%</div></div>
    <div><b>Susp Deflection</b><div>{{suspDeflection.toFixed(6)}}</div></div>
    <div><b>Velocity</b><div>{{velocity.toFixed(6)}}</div></div>
    <div v-if="lift"><b>Lift</b><div>{{lift.toFixed(6)}}</div></div>
    <div v-if="liftOffset"><b>Lift Offset</b><div>{{liftOffset.toFixed(6)}}</div></div>
    <div><b>Substance</b><div>{{substance.name}}</div></div>
    <div><b>Steerable</b><div>{{steerable ? "YES" : "NO"}}</div></div>
    <div><b>Simulated</b><div>{{simulated ? "YES" : "NO"}}</div></div>
    <div><b>Powered</b><div>{{powered ? "YES" : "NO"}}</div></div>
    <div><b>Liftable</b><div>{{liftable ? "YES" : "NO"}}</div></div>
    <div><b>On Ground</b><div>{{onGround ? "YES" : "NO"}}</div></div>
  </div>
</template>

<script>
  export default {
    name: 'wheel',

    props: [
      "id",
      "rotation",
      "steering",
      "damage",
      "suspDeflection",
      "velocity",
      "lift",
      "liftOffset",
      "substance",
      "steerable",
      "simulated",
      "powered",
      "liftable",
      "onGround",
    ]
  }
</script>

<style scoped lang="scss">
  .wheel {
    display: grid;
    justify-items: center;
    grid-gap: var(--spacing);
    text-align: center;
    font-size: .8rem;

    > div:nth-child(2) {
      position: relative;
      border: 2px solid var(--color-white);
      width: 50px;
      height: 50px;
      border-radius: 50%;

      div {
        position: absolute;
        background-color: var(--color-red);
        height: 50%;
        width: 4px;
        top: 50%;
        left: calc(50% - 2px);
      }
    }

    > div:nth-child(3) {
      background-color: var(--color-black);
      border: 2px solid var(--color-white);
      width: 25px;
      height: 50px;
      border-radius: 5px;
    }

  }
</style>