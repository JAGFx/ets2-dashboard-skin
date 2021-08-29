<template>
  <div>
    <div class="fields mb-4">
      <div class="mb-4">
        <h4>General</h4>
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_general_debug',
            label: 'Enable debug information',
            disabled: false,
            description: 'Display some debug information',
            values: fieldValues( 'on_off' )
          }"
        />
      </div>

      <div class="mb-4">
        <h4>Elements</h4>

        <ConfigFieldChoice
          v-bind="{
            id: 'maps_elements_eta',
            label: 'ETA information',
            disabled: false,
            description: 'Display the remaining or ETA time and the current remaining distance to the destination',
            values: fieldValues( 'on_off' )
          }"
        />
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_elements_speedAndGear',
            label: 'Speed and gear',
            disabled: false,
            description: 'Display the current speed and gear',
            values: fieldValues( 'on_off' )
          }"
        />
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_elements_mapControls',
            label: 'Map controls',
            disabled: false,
            description: 'Display map controls (Recenter, focus on user, zoom in and zoom out)',
            values: fieldValues( 'on_off' )
          }"
        />
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_elements_speedLimit',
            label: 'Speed limit',
            disabled: false,
            description: 'Display current speed limit',
            values: fieldValues( 'on_off' )
          }"
        />
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_elements_rotateWithPlayer',
            label: 'Map rotation',
            disabled: !configEnabled( 'maps_elements_mapControls' ),
            description: 'Enable or disable the map rotation on the first load',
            values: fieldValues( 'on_off' )
          }"
        />
        <ConfigFieldChoice
          v-bind="{
            id: 'maps_map_navigationRemaining',
            label: 'Navigation ETA',
            disabled: !configEnabled( 'maps_elements_eta' ),
            description: 'Display the due date or the remaining time for the current route',
            values: fieldValues( 'maps_map_navigationRemaining' )
          }"
        />
      </div>
    </div>
    <div class="fields mb-4">
      <h4>Tiles</h4>

      <ConfigFieldChoice
        v-bind="{
          id: 'maps_map_activeMap',
          label: 'Active map',
          disabled: false,
          description: 'Change the active map',
          values: fieldValues( 'maps_map_activeMap' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'maps_map_type',
          label: 'Kind of map',
          disabled: false,
          description: 'Use the ETS2 or ATS map automatically or use the modded map',
          values: fieldValues( 'maps_map_type' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'maps_map_tilesRemotePath',
          label: 'Remote tiles location',
          disabled: configEnabled( 'maps_map_tilesRemoteUseCustom' ),
          description: 'Set a remote location for the map tiles. It can be on your local machine',
          values: fieldValues( 'maps_map_tilesRemotePath' )
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'maps_map_tilesRemoteUseCustom',
          label: 'Custom tiles',
          disabled: false,
          description: 'Set to ON if you wan to use a custom tiles location',
          values: fieldValues( 'on_off' )
        }"
      />
      <ConfigFieldInput
        v-bind="{
          id: 'maps_map_tilesRemoteCustomPath',
          label: 'Custom tiles location',
          disabled: !configEnabled( 'maps_map_tilesRemoteUseCustom' ),
          description: 'The host of your tiles location',
        }"
      />
      <ConfigFieldChoice
        v-bind="{
          id: 'maps_map_tilesVersion',
          label: 'Game version',
          disabled: configEnabled( 'maps_map_tilesRemoteUseCustom' ),
          description: 'The latest get the tiles for the latest version, else the specified version',
          values: fieldValues( 'maps_map_tilesVersion' )
        }"
      />
    </div>
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name:   'ConfigCategoryMap',
  mixins: [ ConfigCategoryMixin ]
};
</script>