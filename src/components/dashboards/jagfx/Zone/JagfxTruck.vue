<template>
  <div class="truck d-flex flex-column h-100">
    <div class="t-info">
      <div class="theTruk">
        <div class="truck-data">
          <span></span>
          <!--					<img alt="" class="brand" v-bind:src="`img/Truck/brands/${brand.id}.svg`">-->
          <!--<img src="../assets/Truck/brands/volvo.svg" class="brand" alt="">-->
          <small>
            <span>{{ telemetry.truck.model.name }}</span>
          </small>
          <!--<span>
            {{unit_consumption( telemetry.truck.fuel.avgConsumption )}} l/100
          </span>-->
        </div>
        <div class="truck-stats">
          <div class="damage right">
            <span>{{ $truckDamage() }} %</span>
          </div>
          <span>
						<span class="licencePlate"><span class="flag">{{
                $flag( telemetry.truck.licensePlate.country.id,
                    telemetry.game.game.id )
              }}</span>{{ telemetry.truck.licensePlate.value }}</span>
					</span>
        </div>
      </div>
    </div>

    <!--<div class="truck-wear text-center capitalized">
      &lt;!&ndash;<div class="telemetry.truck.damage" v-for="key in Object.keys(telemetry.truck.damage)">
        <b>{{key}}</b>
        <span>{{Math.round(100 * telemetry.truck.damage[key])}}%</span>
      </div>&ndash;&gt;
      <div class="telemetry.truck.damage">
        <span>{{Math.floor(100 * chassis.telemetry.truck.damage)}}%</span>
      </div>
    </div>-->

    <Map :show-speed="false" :show-speed-limit="false" :show-navigation-eta="false" class="dash-element mx-3 my-2 theMap" v-if="allConfig['jagfx_elements_right_map'] === 'true'"></Map>
    <ul class="dash-element right" v-else>
      <!-- Cruise control -->
      <li v-bind:class="{
					'green' : telemetry.truck.cruiseControl.enabled,
					'disabled' : !telemetry.truck.cruiseControl.enabled
				}"
          v-if="elementIsEnabled( 'jagfx_elements_right_cruiseControl' )">
        <span v-show="!telemetry.truck.cruiseControl.enabled">OFF</span>
        <span v-show="telemetry.truck.cruiseControl.enabled">{{ unit_speed( telemetry.truck.cruiseControl ) }}</span>
        <div class="round">
          <i class="icon-cruise_control"></i>
        </div>
      </li>

      <!-- Fuel -->
      <li class="blue" v-bind:class="{
					'orange': telemetry.truck.fuel.warning.enabled
				}"
          v-if="elementIsEnabled( 'jagfx_elements_right_fuel' )">
        <span>{{ unit_volume( telemetry.truck.fuel.value ) }}</span>
        <div class="round">
          <i class="icon-fuel"></i>
        </div>
      </li>

      <!-- Fuel consumption -->
      <li class="white" v-if="elementIsEnabled( 'jagfx_elements_right_fuelConsumption' )">
        <span>{{ unit_consumption( telemetry.truck.fuel.avgConsumption ) }}</span>
        <div class="round">
          <i class="icon-fuel_consumption"></i>
        </div>
      </li>

      <!-- Next rest stop -->
      <li class="default" v-if="elementIsEnabled( 'jagfx_elements_right_restStop' )">
        <span>in {{ $nextRestStop( telemetry.navigation.nextRestStop ) }}</span>
        <div class="round">
          <i class="icon-rest_stop"></i>
        </div>
      </li>

      <!-- Air pressure -->
      <li class="blue" v-bind:class="{
					'orange': telemetry.truck.brakes.airPressure.warning.enabled,
					'red': telemetry.truck.brakes.airPressure.emergency.enabled
				}"
          v-if="elementIsEnabled( 'jagfx_elements_right_brakesAirPressure' )">
        <span>{{ unit_pressure( telemetry.truck.brakes.airPressure.value ) }}</span>
        <div class="round">
          <i class="icon-air_pressure"></i>
        </div>
      </li>

      <!-- Oil temperature -->
      <li class="default" v-if="elementIsEnabled( 'jagfx_elements_right_oilTemperature' )">
        <span>{{ unit_degrees( telemetry.truck.engine.oilTemperature.value ) }}</span>
        <div class="round">
          <i class="icon-oil"></i>
        </div>
      </li>

      <!-- Brakes temparature -->
      <li class="white" v-if="elementIsEnabled( 'jagfx_elements_right_brakesTemperature' )">
        <span>{{ unit_degrees( telemetry.truck.brakes.temperature.value ) }}</span>
        <div class="round">
          <i class="icon-brakes_temperature"></i>
        </div>
      </li>

      <!-- Water temperature -->
      <li class="blue" v-bind:class="{
					'orange': telemetry.truck.engine.waterTemperature.warning.enabled
				}"
          v-if="elementIsEnabled( 'jagfx_elements_right_waterTemperature' )">
        <span>{{ unit_degrees( telemetry.truck.engine.waterTemperature.value ) }}</span>
        <div class="round">
          <i class="icon-water_temperature"></i>
        </div>
      </li>

      <!-- Battery -->
      <li class="blue" v-bind:class="{
					'orange': telemetry.truck.engine.batteryVoltage.warning.enabled
				}"
          v-if="elementIsEnabled( 'jagfx_elements_right_batteryVoltage' )">
        <span>{{ Math.round( telemetry.truck.engine.batteryVoltage.value ) }} V</span>
        <div class="round">
          <i class="icon-battery"></i>
        </div>
      </li>

      <!-- Empty -->
      <li :key="i" class="disabled" v-for="i in indexEmptyElement()">
        <span></span>
        <div class="round">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import JagfxConfigMixins from '@/components/dashboards/jagfx/JagfxConfigMixins';
import Map               from '@/components/dashboards/shared/Map';

export default {
  name:       'JagfxTruck',
  components: { Map },
  mixins:     [ JagfxConfigMixins ],
  methods:    {
    indexEmptyElement: function () {
      const elementLength = this.$elementsLength( 'right' );
      const maxElement    = this.maxElements[ 'right' ];
      const diff          = maxElement - elementLength;

      return (diff <= 0)
          ? 0
          : diff;
    },
    elementIsEnabled:  function ( element ) {
      return this.$elementIsEnabled( 'right', element );
    }
  }
};
</script>
