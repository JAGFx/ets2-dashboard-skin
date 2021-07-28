<template>
  <div class="fields mb-4">
    <h4>Events</h4>

    <!-- <editor-folder> Game -->
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.pause',
        label: 'Game pause',
        disabled: false,
        description: 'Show a pop-up when the game are on pause or unpause',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.fine',
        label: 'Road fine',
        disabled: false,
        description: 'Show a pop-up when you get a road fine',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.tollgate',
        label: 'Toll gate',
        disabled: false,
        description: 'Show a pop-up when you pass through a toll gate',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.ferry',
        label: 'Ferry travel',
        disabled: false,
        description: 'Show a pop-up when you use a ferry',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.train',
        label: 'Train travel',
        disabled: false,
        description: 'Show a pop-up when you use a train',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_game.refuel-payed',
        label: 'Refuel payed',
        disabled: false,
        description: 'Show a pop-up when you refuel you truck tank',
        values: fieldValues( 'on_off' )
      }"
    />
    <!-- </editor-folder> -->
    <!-- <editor-folder> Job -->
    <ConfigFieldChoice
      v-bind="{
        id: 'events_job.cancelled',
        label: 'Job canceled',
        disabled: false,
        description: 'Show a pop-up when a jab was canceled',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_job.delivered',
        label: 'Job delivered',
        disabled: false,
        description: 'Show a pop-up when a job was delivered',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_job.finished',
        label: 'Job finished',
        disabled: false,
        description: 'Show a pop-up when a job was finished',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_job.finished',
        label: 'Job finished',
        disabled: false,
        description: 'Show a pop-up when a job was finished',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_job.started',
        label: 'Job started',
        disabled: false,
        description: 'Show a pop-up when a job was started',
        values: fieldValues( 'on_off' )
      }"
    />
    <!-- </editor-folder> -->
    <!-- <editor-folder> Navigation -->
    <ConfigFieldChoice
      v-bind="{
        id: 'events_navigation.speed-limit',
        label: 'Speed limit',
        disabled: false,
        description: 'Show a pop-up when the speed limit change',
        values: fieldValues( 'on_off' )
      }"
    />
    <!-- </editor-folder> -->
    <!-- <editor-folder> Trailers -->
    <ConfigFieldChoice
      v-bind="{
        id: 'events_trailers.coupling',
        label: 'Trailer coupled',
        disabled: false,
        description: 'Show a pop-up when the trailer was coupled to the truck',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_trailers.damage',
        label: 'Trailer damage',
        disabled: false,
        description: 'Show a pop-up when the damage increase on the trailer',
        values: fieldValues( 'on_off' )
      }"
    />
    <!-- </editor-folder> -->
    <!-- <editor-folder> Truck -->
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.cruise-control',
        label: 'Cruise control set',
        disabled: false,
        description: 'Show a pop-up when the trailer was coupled to the truck',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.cruise-control-increase',
        label: 'Cruise control increase',
        disabled: false,
        description: 'Show a pop-up when the cruise control increase',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.cruise-control-decrease',
        label: 'Cruise control decrease',
        disabled: false,
        description: 'Show a pop-up when the cruise control increase',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.warning',
        label: 'Truck warning',
        disabled: false,
        description: 'Show a pop-up for all truck warning message',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.emergency',
        label: 'Truck emergency',
        disabled: false,
        description: 'Show a pop-up for all truck emergency message',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.electric',
        label: 'Truck electric',
        disabled: false,
        description: 'Show a pop-up when the truck contact was on',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.engine',
        label: 'Truck engine',
        disabled: false,
        description: 'Show a pop-up when the truck engine as started',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.park',
        label: 'Truck park',
        disabled: false,
        description: 'Show a pop-up when the truck parking brake are on',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.damage',
        label: 'Truck damage',
        disabled: false,
        description: 'Show a pop-up when the truck damage increase',
        values: fieldValues( 'on_off' )
      }"
    />
    <ConfigFieldChoice
      v-bind="{
        id: 'events_truck.refuel',
        label: 'Truck refuel',
        disabled: false,
        description: 'Show a pop-up when the truck refuel tank was finished',
        values: fieldValues( 'on_off' )
      }"
    />
    <!-- </editor-folder> -->
  </div>
</template>

<script>
import ConfigCategoryMixin from '@/mixins/ConfigCategoryMixin';

export default {
  name:   'ConfigCategoryEvents',
  mixins: [ ConfigCategoryMixin ]
};
</script>