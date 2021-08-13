<script>
import { app }        from '@/utils/utils';
import {
  length as uc_length,
  mass as uc_mass,
  pressure as uc_pressure,
  temperature as uc_temperature,
  volume as uc_volume
}                     from 'units-converter';
import { mapGetters } from 'vuex';

export default {
  name: 'TelemetryMixin',
  filters: {
    '$dateTimeLocalized': ( time, dFormat, tFormat ) => {
      return app.dateTimeLocalized( time, dFormat, tFormat );
    },
    '$toFixed': ( value, decimal ) => {
      return value.toFixed( decimal );
    }
  },
  computed: {
    ...mapGetters({
      telemetry: 'telemetry/getTelemetry',
      gameConnected: 'telemetry/getGameConnected',
      receivedData: 'telemetry/getReceivedData',
    }),
    jobDeliveryTime(){
      return ( this.telemetry.job.market.id === 'external_contracts' )
          ? this.telemetry.job.expectedDeliveryTimestamp.value
          : this.telemetry.job.expectedDeliveryTimestamp.unix
    },
  },
  created() {
    Object.keys( app.formatConstants ).forEach( ( key ) => {
      const value = app.formatConstants[ key ];
      this[ key ] = value;
    } );
  },
  methods:  {
    // ---------------------------------------
    // --- Commons methods

    config(name){ return this.$store.getters['config/get'](name) },

    // --- Filters

    unit_speed( value, showValue = true, showSymbol = true ) {
      const speed = this.config( 'unit_speed' );
      let unit    = '';

      value = value[ speed ];

      switch ( speed ) {
        case 'kph':
          unit = 'km/h';
          break;
        case 'mph':
          unit = 'm/h';
          break;
      }

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return value.toFixed( 0 ) + ' ' + unit;
    },
    unit_currency( value, showValue = true, showSymbol = true ) {
      const currencySymbolValue = this.config( 'unit_currency' );
      let unit                  = '';

      switch ( currencySymbolValue ) {
        case 'EUR':
          unit = '€';
          break;
        case 'GBP':
          unit = '£';
          value *= 0.9;
          break;
        case 'USD':
          unit = '$';
          value *= 1.1;
          break;
      }

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return unit + ' ' + value.toLocaleString();
    },
    unit_length( value, unitFrom = 'm', showValue = true, showSymbol = true ) {
      const length       = this.config( 'unit_length' );
      const unitExcluded = [ 'in', 'yd', 'ft-us', 'fathom', 'nMi' ];
      let unit           = '';
      let conversion     = uc_length( value )
          .from( unitFrom )
          .to( length );

      switch ( length ) {
        case 'm':
          conversion = uc_length( conversion.value )
              .from( length )
              .toBest( { exclude: unitExcluded } );

          break;
        case 'ft':
          conversion = uc_length( conversion.value )
              .from( length )
              .toBest( { exclude: unitExcluded } );

          break;
      }

      value = conversion.value;
      unit  = conversion.unit;

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      value = value.toFixed( 1 );

      return value.toLocaleString() + ' ' + unit;
    },
    unit_weight( value, showValue = true, showSymbol = true ) {
      const weight       = this.config( 'unit_weight' );
      const unitExcluded = [ 'mcg', 'mg', 'mt', 'oz' ];
      let unit           = '';
      let conversion     = uc_mass( value )
          .from( 'kg' )
          .to( weight );

      switch ( weight ) {
        case 'kg':
          conversion = uc_mass( conversion.value )
              .from( weight )
              .toBest( { exclude: unitExcluded } );

          value = conversion.value;
          unit  = conversion.unit;

          if ( value > 1000 ) {
            value /= 1000;
            unit = 't';
          }

          break;
        case 'lb':
          conversion = uc_mass( conversion.value )
              .from( weight )
              .toBest( { exclude: unitExcluded } );

          value = conversion.value;
          unit  = conversion.unit;

          break;
      }

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return value.toFixed( 1 ) + ' ' + unit;
    },
    unit_volume( value, showValue = true, showSymbol = true ) {
      const unitDefined = this.config( 'unit_volume' );
      let unit          = '';
      let conversion    = uc_volume( value )
          .from( 'l' )
          .to( unitDefined );

      value = conversion.value;
      unit  = conversion.unit;

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return value.toFixed( 0 ) + ' ' + unit;
    },
    unit_consumption( value, showValue = true, showSymbol = true ) {
      const unitDefined = this.config( 'unit_consumption' );
      let conversion    = null;
      let unit          = '';

      value *= 100;

      switch ( unitDefined ) {
        case 'lpkm':
          conversion = {
            unit:  'L/100',
            value: value
          };

          break;
        case 'mpg':
          conversion = {
            unit:  'MPG',
            value: (value === 0)
                       ? 0
                       : 282.4809363 / value
          };

          break;
      }

      value = conversion.value;
      unit  = conversion.unit;

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      value = value.toFixed( 1 );

      return value + ' ' + unit;
    },
    unit_pressure( value, showValue = true, showSymbol = true ) {
      const unitDefined = this.config( 'unit_pressure' );
      let unit          = '';
      let conversion    = uc_pressure( value )
          .from( 'psi' )
          .to( unitDefined );

      value = conversion.value;
      unit  = conversion.unit;

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return value.toFixed( 0 ) + ' ' + unit;
    },
    unit_degrees( value, showValue = true, showSymbol = true ) {
      const unitDefined = this.config( 'unit_degrees' );
      let unit          = '';
      let conversion    = uc_temperature( value )
          .from( 'C' )
          .to( unitDefined );

      value = conversion.value;
      unit  = '°' + conversion.unit;

      if ( showValue && !showSymbol )
        return value;

      if ( !showValue && showSymbol )
        return unit;

      return value.toFixed( 0 ) + ' ' + unit;
    },

    // --- ./Filters


    // --- Commons

    $flag( countryName, gameID ) {
      return app.flag( countryName, gameID );
    },
    $averageDamage( arrayDamage ) {
      const keyLength = Object.keys( arrayDamage ).filter( k => k !== 'total' ).length;
      let sum         = 0;

      for ( const key in arrayDamage ) {
        if ( key !== 'total' )
          sum += arrayDamage[ key ];
      }

      return Math.floor( 100 * (sum / keyLength) );
    },
    $scale( currentSkin ) {
      const scaleX = (currentSkin.size.width === 0)
          ? 1
          : window.innerWidth / currentSkin.size.width;

      const scaleY = (currentSkin.size.height === 0)
          ? 1
          : (window.innerHeight - 41) / currentSkin.size.height;

      return Math.min( scaleX, scaleY );
    },
    $pressureToBar: function ( inPressure, unit = 'bar' ) {
      let pressure;

      switch ( unit ) {
        case 'bar':
          pressure = inPressure * 0.0689476;
          break;

        default:
          pressure = inPressure;
          break;
      }

      return pressure;
    },
    $gameTime() {
      const currentGameTime = this.telemetry.game.time.unix;

      return currentGameTime;
    },

    // --- ./Commons

    // --- Truck

    $hasTruck: function () {
      return (this.telemetry.truck.brand.id.length !== 0);
    },
    $truckDamage: function () {
      return (this.config('general_damage_accurate') === 'damage-diagnostic')
          ? this.$averageDamage( this.telemetry.truck.damage )
          : Math.floor( 100 * this.telemetry.truck.damage.chassis );
    },

    // --- ./Truck

    // --- Job

    $hasJob: function () {
      return (this.telemetry.job.cargo.id.length !== 0);
    },
    $jobRemainingTimeDelivery( time ) {
      const gameTime = this.telemetry.game.time.value;
      const jobDeliveringTime = time;
      let diff = (jobDeliveringTime - gameTime) ;

      return app.displayDuration( diff );
    },
    $jobRemainingTimeToDueDate() {
      return this.config('general_job_remaining') === 'due_date';
    },
    $nextRestStop( time ) {
      return app.diffDateTimeLocalized( 0, time, false );
    },

    // --- ./Job


    // --- Trailer

    $hasTrailer:       function () {
      return this.telemetry.trailer.model.id.length !== 0;
    },
    $hasTrailerAndJob: function () {
      return this.telemetry.trailer.model.id.length !== 0 && this.telemetry.job.cargo.name.length !== 0;
    },
    $trailerDamage:    function () {
      return (this.config('general_damage_accurate') === 'damage-diagnostic')
          ? this.$averageDamage( this.telemetry.trailer.damage )
          : Math.floor( 100 * this.telemetry.trailer.damage.chassis );
    },

    // --- ./Trailer


    // --- Navigation

    $trukGear: function ( transmission, brand ) {
      const hShiftLayout            = this.config('general_h-shift-layout' );
      const rangeAndSplitterEnabled = hShiftLayout === 'h-shifter';

      let gear         = transmission.gear.displayed;
      let strGear      = gear;
      let crawlingGear = 0;

      switch ( brand.name ) {
        case 'Volvo':
        case 'Scania':
        case 'Kenworth':
          crawlingGear = 2;
          break;
      }

      if ( transmission.shifterType === 'hshifter' && rangeAndSplitterEnabled ) {
        let realGearCount = gear - crawlingGear;
        let spliter       = (realGearCount % 2)
            ? 'L'
            : 'H';
        let realGear      = Math.ceil( realGearCount / 2 );
        strGear           = realGear + spliter;
      } else {
        strGear = gear - crawlingGear;
      }

      if ( gear <= crawlingGear )
        strGear = 'C' + Math.abs( gear );

      if ( transmission.shifterType === 'automatic' )
        strGear = 'D' + gear;

      if ( gear === 0 )
        strGear = 'N';

      if ( gear < 0 )
        strGear = 'R' + Math.abs( transmission.gear.displayed );

      return strGear;
    },

    $etaDueDate: function () {
      const currentGameTime = this.$gameTime();
      let etaTime           = this.telemetry.navigation.time + currentGameTime;

      return etaTime;
    },
    $etaRemaing: function () {
      const currentGameTime = this.$gameTime();
      const etaTime         = this.$etaDueDate();

      return app.diffDateTimeLocalized( currentGameTime, etaTime );
    },
    $haveAnActiveNavigation() {
      return this.telemetry.navigation.distance > 0;
    },
    $haveAnActiveSpeedLimit() {
      return this.telemetry.navigation.speedLimit.value > 0;
    }

    // --- ./Navigation
  }
};
</script>