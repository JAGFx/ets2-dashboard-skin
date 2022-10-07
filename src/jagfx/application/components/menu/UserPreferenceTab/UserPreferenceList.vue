<template>
  <div class="row my-2 h-100 configuration-tab">
    <div class="col">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <div class="list-group">
            <UserPreferenceListItemSwitch
              preference-entry-id="events_game.pause"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_refresh_rate"
            />
            <UserPreferenceListItemSelect
              preference-entry-id="general_skin_on_load"
              :values="[{ label: 'One', value: 'One' }]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserPreferenceListItemSelect from '@/jagfx/application/components/menu/UserPreferenceTab/item/UserPreferenceListItemSelect.vue';
import UserPreferenceListItemSwitch from '@/jagfx/application/components/menu/UserPreferenceTab/item/UserPreferenceListItemSwitch.vue';
</script>

<style lang="scss" scoped></style>
