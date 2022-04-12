<template>
  <div class="display on">
    <div class="squareArea driveMode">
      <div>A</div>
      <div>B</div>
    </div>
    <div class="menu-selector w-100">
      <div class="button tiny left warning">
        <span>C</span>
      </div>
      <div class="wrapper">
        <div class="button active">A</div>
        <div class="button">B</div>
        <div class="button">C</div>
        <div class="button">C</div>
      </div>
      <div class="button tiny right">
        <span>D</span>
      </div>
    </div>
    <div class="menu h-100">menu</div>
    <div class="programmable-field">programmable-field-bottom</div>
    <div class="squareArea shifter">
      <div>{{ telemetry2.truck.gearDisplayedWithoutShifterType }}</div>
      <div>{{ telemetry2.truck.shifterTypeLetter }}</div>
    </div>
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaNextGenDisplay',
  mixins: [TelemetryMixin]
};
</script>
