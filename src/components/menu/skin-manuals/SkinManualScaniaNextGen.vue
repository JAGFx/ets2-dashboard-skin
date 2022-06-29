<template>
  <div class="overlay manual">
    <b-overlay :show="true" variant="dark" no-wrap>
      <template #overlay>
        <transition mode="out-in" name="slide-fade">
          <div class="manual-wrapper">
            <table class="table table-striped table-dark symbols">
              <thead>
                <th>{{ $t('Symbol') }}</th>
                <th>{{ $t('Label') }}</th>
              </thead>
              <tbody>
                <!-- <editor-folder> General warning symbols  -->
                <tr>
                  <td colspan="2" class="category">
                    {{ $t('General warning symbols') }}
                  </td>
                </tr>
                <SkinManualLine
                  color="green"
                  :icons="['icon-scania-direction-indicator-left_green']"
                  :label="'Left direction indicator'"
                />
                <SkinManualLine
                  color="green"
                  :icons="['icon-scania-direction-indicator-right_green']"
                  :label="'Right direction indicator'"
                />
                <SkinManualLine
                  color="blue"
                  :icons="['icon-scania-main-beam_blue']"
                  :label="'Main beam is on'"
                />
                <!-- </editor-folder> General warning symbols  -->

                <!-- <editor-folder> Menu symbols  -->
                <tr>
                  <td colspan="2" class="category">{{ $t('Menu symbols') }}</td>
                </tr>
                <!--                <SkinManualLine-->
                <!--                  color="yellow"-->
                <!--                  :icons="['icon-scania-fuel_yellow']"-->
                <!--                  :label="'The fuel level is low'"-->
                <!--                />-->
                <SkinManualLine
                  :icons="['icon-scania-cruise_control_white']"
                  :label="'Cruise control'"
                />
                <SkinManualLine
                  :icons="['icon-scania-downhill-spee-control_yellow_white']"
                  :label="'Downhill speed control'"
                  :implemented="false"
                />
                <!--                <SkinManualLine-->
                <!--                  :icons="[-->
                <!--                    'icon-scania-driver-card-tachograph_white',-->
                <!--                    'icon-scania-accrued-rest-time-tachograph_white'-->
                <!--                  ]"-->
                <!--                  :label="'Accrued rest time'"-->
                <!--                />-->
                <SkinManualLine
                  :icons="['icon-scania-ad-blue-low_yellow']"
                  :label="'Ad Blue'"
                />
                <SkinManualLine
                  :icons="['icon-scania-battery_red']"
                  :label="'Battery'"
                />
                <SkinManualLine
                  :icons="['icon-scania-next-gen-trip-information']"
                  :label="'Cruise control, trip computer and driving time information'"
                  :description="'Here, you can set and read off the trip computer; see current operating information and read driving time information from the digital tachograph.'"
                />
                <SkinManualLine
                  :icons="['icon-scania-next-gen-instantaneous-data']"
                  :label="'Instantaneous data'"
                  :description="'Here you can view information about current consumption and current levels.'"
                />
                <SkinManualLine
                  :icons="['icon-scania-menu-settings']"
                  :label="'Settings'"
                  :implemented="false"
                />
                <SkinManualLine
                  :icons="['icon-scania-next-gen-vehicle-information']"
                  :label="'Vehicle information'"
                  :implemented="false"
                  :description="'The vehicle information menu can be used to view cargo weights, status of the differential locks and tyre pressures. Which functions are shown depends on the vehicle’s equipment.'"
                />
                <SkinManualLine
                  :icons="[' icon-scania-next-gen-standard-mode_white']"
                  :label="'Standard mode'"
                  description="In standard performance mode the vehicle is adapted for driving to suit most situations."
                  :implemented="false"
                />
                <!-- </editor-folder> Menu symbols  -->

                <!-- <editor-folder> Others symbols  -->
                <tr>
                  <td colspan="2" class="category">
                    {{ $t('Others symbols') }}
                  </td>
                </tr>
                <SkinManualLine
                  color="red"
                  :icons="['icon-scania-warning_red']"
                  :label="'A fault occurred'"
                />
                <SkinManualLine
                  color="red"
                  :icons="['icon-scania-parking-break_red']"
                  :label="'The parking brake is applied'"
                />
                <SkinManualLine
                  color="red"
                  :icons="['icon-scania-break-pressure_red_yellow']"
                  :label="'Vehicle EBS fault'"
                  :description="'Low brake pressure in parking and trailer brake circuit.'"
                />
                <!--                <SkinManualLine-->
                <!--                  color="red"-->
                <!--                  :icons="['icon-scania-driver-safty-belt_red']"-->
                <!--                  :label="'The driver’s safety belt is not fastened'"-->
                <!--                  :implemented="false"-->
                <!--                />-->
                <SkinManualLine
                  color="yellow"
                  :icons="['icon-scania-warning_yellow']"
                  :label="'A warning occurred'"
                />
                <SkinManualLine
                  color="yellow"
                  :icons="['icon-scania-engine-failure_yellow']"
                  :label="'Engine failure'"
                  :description="'Risk that the level of contaminants in the exhaust gases emitted by the vehicle will be too high. In some cases the engine output is limited and in some cases the vehicle speed is also limited.'"
                />
                <SkinManualLine
                  color="yellow"
                  :icons="['icon-scania-differential-lock_yellow']"
                  :label="'Differential lock is engaged'"
                />
                <SkinManualLine
                  color="yellow"
                  :icons="['icon-scania-tractor-tag-axle-raised_yellow']"
                  :label="'The tag axle on the tractor is raised'"
                />
                <SkinManualLine
                  color="yellow"
                  :icons="['icon-scania-trailer-tag-axle-raised_yellow']"
                  :label="'The tag axle on the trailer is raised'"
                />
                <SkinManualLine
                  color="green"
                  :icons="['icon-scania-retarder_green']"
                  :label="'The retarder is activated'"
                />
                <!-- </editor-folder> Others symbols  -->

                <!-- <editor-folder> Bodybuilder symbols  -->
                <tr>
                  <td colspan="2" class="category">
                    {{ $t('Bodybuilder symbols') }}
                  </td>
                </tr>
                <SkinManualLine
                  color="blue"
                  :icons="['icon-scania-rotating-beacon_blue']"
                  :label="'The rotating beacon is activated'"
                />
                <!-- </editor-folder> Bodybuilder symbols  -->
              </tbody>
            </table>
          </div>
        </transition>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import SkinManualLine from '@/components/menu/skin-manuals/SkinManualLine';

export default {
  name: 'SkinManualScaniaNextGen',
  components: {
    SkinManualLine
  }
};
</script>
