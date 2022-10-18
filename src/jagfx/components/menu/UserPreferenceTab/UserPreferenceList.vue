<template>
  <div class="row my-2 h-100 configuration-tab">
    <div class="col">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <div class="list-group">
            <!-- <editor-folder> General -->
            <UserPreferenceListItemSelect
              preference-entry-id="general_refresh_rate"
            />
            <UserPreferenceListItemInput
              preference-entry-id="general_port"
              type="number"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_skin_on_load"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_job_remaining"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_h-shift-layout"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_damage_accurate"
            />
            <!-- </editor-folder> General -->

            <!-- <editor-folder> Event -->
            <!-- <editor-folder> Event/Game -->
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.pause"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.fine"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.tollgate"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.ferry"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.train"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.refuel-payed"
            />
            <!-- </editor-folder> -->
            <!-- <editor-folder> Event/Job -->
            <UserPreferenceListItemSwitch
              preference-entry-id="events_job.cancelled"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_job.delivered"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_job.finished"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_job.started"
            />
            <!-- </editor-folder> -->
            <!-- <editor-folder> Event/Navigation -->
            <UserPreferenceListItemSwitch
              preference-entry-id="events_navigation.speed-limit"
            />
            <!-- </editor-folder> Event/Navigation -->
            <!-- <editor-folder> Event/Trailers -->
            <UserPreferenceListItemSwitch
              preference-entry-id="events_trailers.coupling"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_trailers.damage"
            />
            <!-- </editor-folder> Event/Trailers -->
            <!-- <editor-folder> Event/Truck -->
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.cruise-control"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.cruise-control-increase"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.cruise-control-decrease"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.warning-message"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.emergency-message"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.electric"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.engine"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.park"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.damage"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="events_truck.refuel"
            />
            <!-- </editor-folder> Event/Truck -->
            <!-- </editor-folder> Event -->

            <!-- <editor-folder> JAGFx -->
            <!-- <editor-folder> JAGFx/Right -->
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_oilTemperature"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_brakesTemperature"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_brakesAirPressure"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_fuel"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_fuelConsumption"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_cruiseControl"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_waterTemperature"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_batteryVoltage"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_restStop"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_right_map"
            />
            <!-- </editor-folder> JAGFx/Right -->

            <!-- <editor-folder> JAGFx/Middle top -->
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_top_retarder"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_top_parkingBrake"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_top_beamHigh"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_top_beamLow"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_top_beacon"
            />
            <!-- </editor-folder> JAGFx/Middle top -->

            <!-- <editor-folder> JAGFx/Middle Bottom -->
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_bottom_rpm"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_bottom_fuel"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_bottom_speedLimit"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="jagfx_elements_mid_bottom_blinker_turn"
            />
            <!-- </editor-folder> JAGFx/Middle Bottom -->
            <!-- </editor-folder> JAGFx -->

            <!-- <editor-folder> Map -->
            <!-- <editor-folder> Map/General -->
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_general_debug"
            />
            <!-- </editor-folder> Map/General -->

            <!-- <editor-folder> Map/Elements -->
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_elements_eta"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_elements_speedAndGear"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_elements_mapControls"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_elements_speedLimit"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_elements_rotateWithPlayer"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="maps_map_navigationRemaining"
            />
            <!-- </editor-folder> Map/Elements -->

            <!-- <editor-folder> Map/Tiles -->
            <UserPreferenceListItemSelect
              preference-entry-id="maps_map_activeMap"
            />
            <UserPreferenceListItemSelect preference-entry-id="maps_map_type" />
            <UserPreferenceListItemSelect
              preference-entry-id="maps_map_tilesRemotePath"
            />
            <UserPreferenceListItemSwitch
              preference-entry-id="maps_map_tilesRemoteUseCustom"
            />
            <UserPreferenceListItemInput
              preference-entry-id="maps_map_tilesRemotePath"
              type="text"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="maps_map_tilesVersion"
            />
            <!-- </editor-folder> Map/Tiles -->
            <!-- </editor-folder> Map -->

            <!-- <editor-folder> Scania -->
            <UserPreferenceListItemSelect
              preference-entry-id="scania_default_menu"
            />
            <!-- </editor-folder> Scania -->

            <!-- <editor-folder> Unit -->
            <UserPreferenceListItemSelect preference-entry-id="unit_weight" />
            <UserPreferenceListItemSelect preference-entry-id="unit_length" />
            <UserPreferenceListItemSelect preference-entry-id="unit_degrees" />
            <UserPreferenceListItemSelect
              preference-entry-id="unit_consumption"
            />
            <UserPreferenceListItemSelect preference-entry-id="unit_volume" />
            <UserPreferenceListItemSelect preference-entry-id="unit_pressure" />
            <UserPreferenceListItemSelect preference-entry-id="unit_speed" />
            <UserPreferenceListItemSelect preference-entry-id="unit_currency" />
            <!-- </editor-folder> Unit -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserPreferenceListItemInput from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemInput.vue';
import UserPreferenceListItemSelect from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemSelect.vue';
import UserPreferenceListItemSwitch from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemSwitch.vue';
</script>

<style lang="scss" scoped></style>
