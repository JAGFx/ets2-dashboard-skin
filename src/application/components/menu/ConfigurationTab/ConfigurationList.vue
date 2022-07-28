<template>
  <div class="row my-2 h-100 configuration-tab">
    <div class="col">
      <div class="card bg-transparent">
        <div class="card-body p-0">
          <div class="list-group">
            <ConfigurationListItemSwitch
              configuration-id="general_refresh_rate"
            />
            <ConfigurationListItemSelect configuration-id="general_port" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfigurationListItemSelect from '@/application/components/menu/ConfigurationTab/ConfigurationListItemSelect.vue';
import ConfigurationListItemSwitch from '@/application/components/menu/ConfigurationTab/ConfigurationListItemSwitch.vue';
</script>

<style lang="scss" scoped></style>
