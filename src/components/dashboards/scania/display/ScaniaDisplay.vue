<template>
  <div class="display flex-area flex-column">
    <!-- <editor-folder> Gearbox informations -->
    <div class="gearbox-info d-flex justify-content-between align-items-center">
      <div class="flex-area justify-content-start w-100 gearbox-wrapper">
        <div class="truck-shifterType flex-area">
          <span>{{
            $trukShifterTypeLetter(
              telemetry.truck.transmission,
              telemetry.truck.brand
            )
          }}</span>
        </div>
        <div class="truck-gear flex-area">
          <span>
            {{
              $trukGear(
                telemetry.truck.transmission,
                telemetry.truck.brand,
                false
              )
            }}
          </span>
        </div>
      </div>
      <div class="datetime flex-area">
        <span>
          {{
            $gameTime() | $dateTimeLocalized(DATE_FORMAT_NONE, TIME_FORMAT_TINY)
          }}
        </span>
      </div>
    </div>
    <!-- </editor-folder> Gearbox informations -->

    <!-- <editor-folder> Programmable field 1 -->
    <div
      class="programmable-field-1 w-100 d-flex justify-content-around align-items-center"
    >
      <div class="item d-flex justify-content-center align-items-center">
        <div class="icon py-3 d-flex justify-content-center align-items-center">
          <i class="icon-scania-cruise_control_white" />
        </div>
        <div
          class="d-flex justify-content-center align-items-center flex-column px-3"
        >
          <span
            v-if="telemetry.truck.cruiseControl.enabled"
            class="value pb-2"
            >{{ unit_speed(telemetry.truck.cruiseControl, true, false) }}</span
          >
          <span v-else class="value pb-2">-</span>
          <span class="unit">{{
            unit_speed(telemetry.truck.cruiseControl, false, true)
          }}</span>
        </div>
      </div>
      <div class="item d-flex justify-content-center align-items-center">
        <div class="icon py-3 d-flex justify-content-center align-items-center">
          <i class="icon-scania-downhill-spee-control_yellow_white" />
        </div>
        <div
          class="d-flex justify-content-center align-items-center flex-column px-3"
        >
          <span class="value pb-2">-</span>
          <span class="unit">{{
            unit_speed(telemetry.truck.cruiseControl, false, true)
          }}</span>
        </div>
      </div>
    </div>
    <!-- </editor-folder> Programmable field 1 -->

    <!-- <editor-folder> Menu -->
    <div
      v-if="!menuDisplay"
      class="displayMenuOff w-100"
      @click="menuDisplay = true"
    ></div>
    <ScaniaMainMenu v-if="menuDisplay" @quit-menu="menuDisplay = false" />
    <!-- </editor-folder> Menu -->

    <!-- <editor-folder> Box warning symbol -->
    <div
      class="box-warning-symbol d-flex justify-content-start align-items-center w-100"
    >
      <div class="truck-fuelWarning flex-area">
        <i class="icon-scania-fuel_yellow" />
      </div>
    </div>
    <!-- </editor-folder> Box warning symbol -->

    <!-- <editor-folder> Programmable field 2 -->
    <div
      class="programmable-field-2 d-flex justify-content-center align-items-center w-100 flex-column py-2"
    >
      <div class="item d-flex justify-content-between align-items-center w-100">
        <div class="icon">
          <i class="icon-scania-ad-blue-low_yellow" />
          <i class="icon-scania-ad-blue-low_yellow" />
        </div>
        <div
          class="value-wrapper d-flex justify-content-between align-items-center"
        >
          <!-- Rest time -->
          <div class="value">
            {{ $nextRestStop(telemetry.navigation.nextRestStop, 'HH:mm') }}
          </div>
          <div class="unit">h</div>
        </div>
      </div>
    </div>
    <!-- </editor-folder> Programmable field 2 -->

    <!-- <editor-folder> Mileage -->
    <div
      class="mileage d-flex justify-content-between align-items-center w-100"
    >
      <div class="truck-odometer flex-area justify-content-start">
        <span class="pl-3">{{
          unit_length(telemetry.truck.odometer, 'km')
        }}</span>
      </div>
      <div class="temperature flex-area justify-content-end">
        <span class="pr-3">-°{{ config('unit_degrees') }}</span>
      </div>
    </div>
    <!-- </editor-folder> Mileage -->
  </div>
</template>

<script>
import ScaniaMainMenu from '@/components/dashboards/scania/display/ScaniaMainMenu';
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaDisplay',
  components: { ScaniaMainMenu },
  mixins: [TelemetryMixin],
  data() {
    return {
      menuDisplay: false
    };
  }
};
</script>
