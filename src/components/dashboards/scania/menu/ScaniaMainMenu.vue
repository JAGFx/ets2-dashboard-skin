<template>
  <div>
    <!-- Dashboard Menu -->
    <!--      :class="{ on: display }"-->
    <div v-if="!display" class="displayMenuOff" @click="display = true"></div>
    <div
      v-if="display"
      class="displayMenuOn d-flex flex-column justify-content-center align-items-center"
    >
      <div v-if="subMenu === null">
        <div class="dashMenu01On menuSelectorItem" @click="subMenu = '01'">
          <i class="icon-scania-menu-driving-info" />
        </div>
      </div>
      <div
        v-if="subMenu === null"
        class="w-100 d-flex justify-content-around align-items-center"
      >
        <div class="dashMenu03On menuSelectorItem" @click="subMenu = '03'">
          <i class="icon-scania-menu-vehicle-info" />
        </div>
        <div class="dashMenuOff menuSelectorItem" @click="display = false">
          <i class="icon-scania-menu-arrow" />
        </div>
        <div class="dashMenu02On menuSelectorItem" @click="subMenu = '02'">
          <i class="icon-scania-menu-instantaneous-data" />
        </div>
      </div>
      <div v-if="subMenu === null">
        <div class="dashMenu04 menuSelectorItem">
          <i class="icon-scania-menu-settings" />
        </div>
      </div>

      <!-- Aide à la conduite -->
      <div v-if="subMenu === '01'" class="displayMenu01">
        <div class="estimatedDistance menu1Line">
          <div class="value">33</div>
          <div class="unit">km</div>
        </div>
        <div class="digfuelConsumption menu1Line">
          <span class="value">66</span>
          <span class="unit">km/l</span>
        </div>
        <div class="navigation-timeToDestination menu1Line">
          <span class="value">55</span>
          <span class="unit">h</span>
        </div>
        <div class="dashMenu01Off" @click="subMenu = null"></div>
      </div>
      <!-- Vehicle information -->
      <div v-if="subMenu === '03'" class="displayMenu03">
        <i class="icon-scania-menu-weight-truck background" />
        <div class="totalmass flex-area">
          <span>3</span>
        </div>
        <div class="trailer-attached">
          <div class="frontAxleLoad flex-area">
            <span>4</span>
          </div>
          <div class="rearAxleLoad flex-area">
            <span>5</span>
          </div>
          <div class="trailerAxleLoad flex-area">
            <span>-.-</span>
          </div>
        </div>
        <div class="dashMenu03Off" @click="subMenu = null"></div>
      </div>
      <!-- Instantaneous data -->
      <div v-if="subMenu === '02'" class="displayMenu02">
        <div class="batteryVoltage flex-area">
          <span class="w-100 text-right">3</span>
          <span class="w-100 ml-2 unit">V</span>
        </div>
        <div class="_voltageBar">4</div>
        <div class="oilPressure flex-area">
          <span class="w-100 text-right">1</span>
          <span class="w-100 ml-2 unit">bar</span>
        </div>
        <div class="_oilPressureBar">2</div>
        <div class="adblue flex-area">
          <span class="w-100 text-right">5</span>
          <span class="w-100 ml-2 unit">%</span>
        </div>
        <div class="_adblueBar">6</div>
        <div class="dashMenu02Off" @click="subMenu = null"></div>
      </div>
    </div>
    <!--        <div class="navigation-estimatedTime">22</div>-->
    <!--        <div class="navigation-estimatedDistance">11</div>-->
    <!--        <div class="truck-fuelAverageConsumption">00</div>-->
    <!--    <div v-if="!display" class="dashMenu01Off" @click="menu01Off"></div>-->
    <!--    <div v-if="!display" class="displayMenu01"></div>-->
    <!--    <div-->
    <!--      v-if="$hasJob() && $jobRemainingTimeToDueDate()"-->
    <!--      class="navigation-timeToDestination"-->
    <!--    >-->
    <!--        {{-->
    <!--          $jobRemainingTimeDelivery(-->
    <!--            telemetry.job.expectedDeliveryTimestamp.value-->
    <!--          )-->
    <!--        }}-->
    <!--    </div>-->
    <!--    <div-->
    <!--      v-if="$hasJob() && !$jobRemainingTimeToDueDate()"-->
    <!--      class="navigation-estimatedTime"-->
    <!--    >-->
    <!--        {{-->
    <!--          jobDeliveryTime-->
    <!--            | $dateTimeLocalized(DATE_FORMAT_LONG, TIME_FORMAT_SHORT)-->
    <!--        }}-->
    <!--    </div>-->
    <!--    <div class="estimatedDistance">-->
    <!--        <span v-if="telemetry.navigation.distance === 0">{{ $t('N/A') }}</span>-->
    <!--        <span v-else-if="telemetry.navigation.distance < 1000">-->
    <!--          {{ unit_length(telemetry.navigation.distance, 'm') }}</span-->
    <!--        >-->
    <!--        <span v-else>{{ unit_length(telemetry.navigation.distance) }}</span>-->
    <!--    </div>-->
  </div>
</template>

<script>
import TelemetryMixin from '@/mixins/TelemetryMixin';

export default {
  name: 'ScaniaMainMenu',
  mixins: [TelemetryMixin],
  data() {
    return {
      display: false,
      subMenu: null
    };
  },
  computed: {
    mainMenuImage() {
      return this.display
        ? '/img/dashboard/scania/menuOn.png'
        : '/img/dashboard/scania/menuOff.png';
    }
  },
  methods: {
    menuOn() {},
    menuOff() {},
    menu01On() {},
    menu01Off() {},
    menu02On() {},
    menu02Off() {},
    menu03On() {},
    menu03Off() {}
  }
};
</script>

<style scoped></style>
