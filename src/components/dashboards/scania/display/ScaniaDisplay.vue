<template>
  <div class="display flex-area flex-column">
    <!-- <editor-folder> Gearbox informations -->
    <div class="gearbox-info d-flex justify-content-between align-items-center">
      <div class="flex-area justify-content-start w-100 gearbox-wrapper">
        <div class="truck-shifterType flex-area">
          <span>{{ telemetry2.truck.shifterTypeLetter }}</span>
        </div>
        <div class="truck-gear flex-area">
          <span>
            {{ telemetry2.truck.gearDisplayedWithoutShifterType }}
          </span>
        </div>
      </div>
      <div class="datetime flex-area">
        <span>
          {{
            $dateTimeLocalized(
              telemetry2.gameTime,
              DATE_FORMAT_NONE,
              TIME_FORMAT_TINY
            )
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
            v-if="telemetry2.symbols.cruiseControlIsEnabled"
            class="value pb-2"
            >{{ telemetry2.truck.cruiseControlSpeed }}</span
          >
          <span v-else class="value pb-2">-</span>
          <span class="unit">{{ $unitReadable('unit_speed') }}</span>
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
          <span class="unit">{{ $unitReadable('unit_speed') }}</span>
        </div>
      </div>
    </div>
    <!-- </editor-folder> Programmable field 1 -->

    <!-- <editor-folder> Menu -->
    <div
      v-if="!menuDisplay && !hasAWarningMessage"
      class="displayMenuOff w-100"
      @click="menuDisplay = true"
    ></div>
    <ScaniaMainMenu
      v-if="menuDisplay && !hasAWarningMessage"
      @quit-menu="menuDisplay = false"
    />
    <ScaniaDisplayMessage v-if="hasAWarningMessage" />
    <!-- </editor-folder> Menu -->

    <!-- <editor-folder> Box warning symbol -->
    <div
      class="box-warning-symbol d-flex justify-content-start align-items-center w-100"
    >
      <div
        v-if="telemetry2.symbols.fuelLevelIsLow"
        class="truck-fuelWarning flex-area item"
      >
        <i class="icon-scania-fuel_yellow" />
      </div>
      <div
        v-for="warningMessage in warningMessages"
        :key="warningMessage.id"
        class="flex-area item message"
        :class="warningMessage.type"
      >
        <i :class="warningMessage.icon" />
      </div>
    </div>
    <!-- </editor-folder> Box warning symbol -->

    <!-- <editor-folder> Programmable field 2 -->
    <div
      class="programmable-field-2 d-flex justify-content-center align-items-center w-100 flex-column py-2"
    >
      <div class="item d-flex justify-content-between align-items-center w-100">
        <div class="icon">
          <i class="icon-scania-driver-card-tachograph_white" />
          <i class="ml-3 icon-scania-accrued-rest-time-tachograph_white" />
        </div>
        <div
          class="value-wrapper d-flex justify-content-between align-items-center"
        >
          <!-- Rest time -->
          <div class="value">
            {{
              $nextRestStopFormater(
                telemetry2.navigation.nextRestStopTime,
                'HH:mm'
              )
            }}
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
        <span class="pl-3">
          {{ telemetry2.truck.odometer.toFixed(1) }}
          {{ $unitReadable('unit_length', 'km') }}
        </span>
      </div>
      <div class="temperature flex-area justify-content-end">
        <span class="pr-3">-{{ $unitReadable('unit_degrees') }}</span>
      </div>
    </div>
    <!-- </editor-folder> Mileage -->
  </div>
</template>

<script>
import ScaniaDisplayMessage from '@/components/dashboards/scania/display/ScaniaDisplayMessage';
import ScaniaMainMenu from '@/components/dashboards/scania/display/ScaniaMainMenu';
import TelemetryMixin from '@/mixins/TelemetryMixin';
import { mapGetters } from 'vuex';

export default {
  name: 'ScaniaDisplay',
  components: { ScaniaMainMenu, ScaniaDisplayMessage },
  mixins: [TelemetryMixin],
  data() {
    return {
      menuDisplay: this.hasSubMenuActive()
    };
  },
  computed: {
    ...mapGetters({
      warningMessages: 'dashboard/getScaniaMessages',
      hasAWarningMessage: 'dashboard/hasScaniaMessage'
    })
  },
  methods: {
    hasSubMenuActive() {
      const configValue = this.config('scania_default_menu');
      return configValue !== null;
    }
  }
};
</script>
