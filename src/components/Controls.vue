<template>
  <Window title="Controls" :items="['input', 'game', 'shifter']">
    <template v-slot:input>
      <div class="input">
        <div class="wheel" :style="`transform: rotate(${450 * input.steering * -1}deg);`">
          <span></span>
          <span></span>
        </div>
        <div class="bar throttle"><div :style="`height: ${100 * input.throttle}%;`"></div></div>
        <div class="bar brake"   ><div :style="`height: ${100 * input.brake}%;`"   ></div></div>
        <div class="bar clutch"  ><div :style="`height: ${100 * input.clutch}%;`"  ></div></div>
      </div>
    </template>

    <template v-slot:game>
      <div class="game">
        <div class="wheel" :style="`transform: rotate(${450 * game.steering * -1}deg);`">
          <span></span>
          <span></span>
        </div>
        <div class="bar throttle"><div :style="`height: ${100 * game.throttle}%;`"></div></div>
        <div class="bar brake"   ><div :style="`height: ${100 * game.brake}%;`"   ></div></div>
        <div class="bar clutch"  ><div :style="`height: ${100 * game.clutch}%;`"  ></div></div>
      </div>
    </template>

    <template v-slot:shifter>
      <div class="shifter list">
        <div><b>Slot num</b><span>{{transmission.slot}}</span></div>
        <div><b>Slot handle position</b><span>{{transmission.slots[transmission.slot].handlePosition}}</span></div>
        <div><b>Slot selector</b><span>{{transmission.slots[transmission.slot].selector}}</span></div>
        <div><b>Slot gear</b><span>{{transmission.slots[transmission.slot].gear}}</span></div>
        <div><b>Type</b><span>{{transmission.shifterType}}</span></div>
        <div><b>Selector</b><span>{{transmission.selector[0]}} {{transmission.selector[1]}}</span></div>
        <div><b>Selectors</b><span>{{transmission.selectors}}</span></div>
      </div>
    </template>
  </Window>
</template>

<script>
  import Window from '@/components/Window.vue'

  export default {
    name: "Controls",

    components: {Window},

    props: ["input", "game", "transmission"],

    data: function() {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .input,
  .game {
    display: grid;
    grid-template-columns: 112px 36px 36px 36px;
    grid-gap: calc(var(--spacing) * 2);
    justify-content: center;
  }

  .wheel {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 6px solid var(--color-red);

    span {
      position: absolute;
      background-color: var(--color-white);
      z-index: 10;
    }

    span:nth-child(1) {
      height: 6px;
      width: calc(100% + 12px);
      left: -6px;
      top: calc(50% - 3px);
    }

    span:nth-child(2) {
      height: calc(50% + 6px);
      width: 6px;
      top: 50%;
      left: calc(50% - 3px);  
    }
  }

  .bar{
    position: relative;
    border: 3px solid var(--color-white);
    width: 30px;
    height: calc(100% - 6px);

    div {
      background-color: var(--color-white);
      position: absolute;
      height: attr(data-height);
      width: 100%;
      bottom: 0px;
    }
  }

  .throttle div { background-color: var(--color-green); }
  .brake div { background-color: var(--color-red); }
  .clutch div { background-color: var(--color-yellow); }
</style>