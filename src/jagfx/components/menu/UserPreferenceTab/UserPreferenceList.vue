<template>
  <div class="row my-2 h-100 configuration-tab">
    <div class="col">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <div class="list-group">
            <!-- <editor-folder> General -->
            <UserPreferenceListItemSelect preference-entry-id="general_refresh_rate" />
            <UserPreferenceListItemInput preference-entry-id="general_port" type="number" />
            <UserPreferenceListItemSelect preference-entry-id="general_skin_on_load" />
            <UserPreferenceListItemSelect preference-entry-id="general_job_remaining" />
            <UserPreferenceListItemSelect preference-entry-id="general_h-shift-layout" />
            <UserPreferenceListItemSelect preference-entry-id="general_damage_accurate" />
            <!-- </editor-folder> General -->

            <!-- <editor-folder> Event -->
            <!-- <editor-folder> Event/Game -->
            <UserPreferenceListItemSwitch preference-entry-id="events_game.pause" />
            <UserPreferenceListItemSwitch preference-entry-id="events_game.fine" />
            <UserPreferenceListItemSwitch preference-entry-id="events_game.tollgate" />
            <UserPreferenceListItemSwitch preference-entry-id="events_game.ferry" />
            <UserPreferenceListItemSwitch preference-entry-id="events_game.train" />
            <UserPreferenceListItemSwitch preference-entry-id="events_game.refuel-payed" />
            <!-- </editor-folder> -->
            <!-- <editor-folder> Event/Job -->
            <UserPreferenceListItemSwitch preference-entry-id="events_job.cancelled" />
            <UserPreferenceListItemSwitch preference-entry-id="events_job.delivered" />
            <UserPreferenceListItemSwitch preference-entry-id="events_job.finished" />
            <UserPreferenceListItemSwitch preference-entry-id="events_job.started" />
            <!-- </editor-folder> -->
            <!-- <editor-folder> Event/Navigation -->
            <UserPreferenceListItemSwitch preference-entry-id="events_navigation.speed-limit" />
            <!-- </editor-folder> Event/Navigation -->
            <!-- <editor-folder> Event/Trailers -->
            <UserPreferenceListItemSwitch preference-entry-id="events_trailers.coupling" />
            <UserPreferenceListItemSwitch preference-entry-id="events_trailers.damage" />
            <!-- </editor-folder> Event/Trailers -->
            <!-- <editor-folder> Event/Truck -->
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.cruise-control" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.cruise-control-increase" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.cruise-control-decrease" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.warning-message" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.emergency-message" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.electric" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.engine" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.park" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.damage" />
            <UserPreferenceListItemSwitch preference-entry-id="events_truck.refuel" />
            <!-- </editor-folder> Event/Truck -->
            <!-- </editor-folder> Event -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserPreferenceListItemInput
                                    from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemInput.vue';
import UserPreferenceListItemSelect from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemSelect.vue';
import UserPreferenceListItemSwitch from '@/jagfx/components/menu/UserPreferenceTab/item/UserPreferenceListItemSwitch.vue';
</script>

<style lang="scss" scoped></style>
