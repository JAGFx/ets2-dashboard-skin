<template>
  <div class="row my-2 h-100 configuration-tab">
    <div class="col">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <div class="list-group">
            <UserPreferenceListItemSwitch
              configuration-id="general_refresh_rate"
            />
            <UserPreferenceListItemSelect configuration-id="general_port" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserPreferenceListItemSelect from '@/application/components/menu/UserPreferencesTab/UserPreferenceListItemSelect.vue';
import UserPreferenceListItemSwitch from '@/application/components/menu/UserPreferencesTab/UserPreferenceListItemSwitch.vue';
</script>

<style lang="scss" scoped></style>
