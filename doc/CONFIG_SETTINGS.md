# Configuration settings

## Skin config
 
You can find common elements, and skin config.

### General

#### General 
<table>
    <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Values</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>general_refresh_rate</td>
        <td>Refresh rate</td>
        <td>
            <ul>
                <li>15</li>
                <li>150</li>
                <li>500</li>
                <li>1000</li>
            </ul>
        </td>
        <td>15</td>
    </tr>
    <tr>
        <td>general_skin_on_load</td>
        <td>Default skin loaded</td>
        <td>
            <ul>
                <li>JAGFx</li>
                <li>Test</li>
                <li>Default</li>
                <li>DafXF</li>
                <li>ManTGX</li>
                <li>MercedesAtego</li>
                <li>RdInfo</li>
                <li>Scania</li>
                <li>VolvoFH</li>
                <li>Maps</li>
            </ul>
        </td>
        <td>JAGFx</td>
    </tr>
    <tr>
        <td>general_job_remaining</td>
        <td>Job delivery time</td>
        <td>
            <ul>
                <li>due_date</li>
                <li>remaining_date</li>
            </ul>
        </td>
        <td>due_date</td>
    </tr>
    <tr>
        <td>general_h-shift-layout</td>
        <td>H-Shift layout</td>
        <td>
            <ul>
                <li>h-shifter</li>
                <li>automatic</li>
            </ul>
        </td>
        <td>h-shifter</td>
    </tr>
</table>

#### Event

<table>
    <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Values</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>events_game.pause</td>
        <td>Game pause</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_game.fine</td>
        <td>Road fine</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_game.tollgate</td>
        <td>Toll gate</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_game.ferry</td>
        <td>Ferry travel</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_game.train</td>
        <td>Train travel</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_game.refuel-payed</td>
        <td>Refuel payed</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_job.cancelled</td>
        <td>Job canceled</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_job.delivered</td>
        <td>Job delivered</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_job.finished</td>
        <td>Job finished</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_job.started</td>
        <td>Job started</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_navigation.speed-limit</td>
        <td>Speed limit</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_trailers.coupling</td>
        <td>Trailer coupled</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_trailers.damage</td>
        <td>Trailer damage</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.cruise-control</td>
        <td>Cruise control set</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.cruise-control-increase</td>
        <td>Cruise control increase</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.cruise-control-decrease</td>
        <td>Cruise control decrease</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.warning</td>
        <td>Truck warning</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_truck.emergency</td>
        <td>Truck emergency</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>events_truck.electric</td>
        <td>Truck electric</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.engine</td>
        <td>Truck engine</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.park</td>
        <td>Truck park</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.damage</td>
        <td>Truck damage</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>events_truck.refuel</td>
        <td>Truck refuel</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    

</table>

#### Unit

<table>
    <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Values</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>unit_weight</td>
        <td>Weight</td>
        <td>
            <ul>
                <li>kg</li>
                <li>lb</li>
            </ul>
        </td>
        <td>kg</td>
    </tr>
    <tr>
        <td>unit_length</td>
        <td>Length</td>
        <td>
            <ul>
                <li>m</li>
                <li>ft</li>
            </ul>
        </td>
        <td>m</td>
    </tr>
    <tr>
        <td>unit_degrees</td>
        <td>Degrees</td>
        <td>
            <ul>
                <li>C</li>
                <li>F</li>
            </ul>
        </td>
        <td>C</td>
    </tr>
    <tr>
        <td>unit_consumption</td>
        <td>Consumption</td>
        <td>
            <ul>
                <li>lpkm</li>
                <li>mpg</li>
            </ul>
        </td>
        <td>lpkm</td>
    </tr>
    <tr>
        <td>unit_volume</td>
        <td>Volume</td>
        <td>
            <ul>
                <li>l</li>
                <li>gal</li>
            </ul>
        </td>
        <td>l</td>
    </tr>
    <tr>
        <td>unit_pressure</td>
        <td>Pressure</td>
        <td>
            <ul>
                <li>psi</li>
                <li>bar</li>
            </ul>
        </td>
        <td>psi</td>
    </tr>
    <tr>
        <td>unit_speed</td>
        <td>Speed</td>
        <td>
            <ul>
            <li>kph</li>
            <li>mph</li>
            </ul>
        </td>
        <td>mph</td>
    </tr>
    <tr>
        <td>unit_currency</td>
        <td>Currency</td>
        <td>
            <ul>
                <li>EUR</li>
                <li>GBP</li>
                <li>USD</li>
            </ul>
        </td>
        <td>EUR</td>
    </tr>
</table>

### JAGFx

<table>
    <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Values</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>jagfx_elements_right_oilTemperature</td>
        <td>Oil temperature</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_brakesTemperature</td>
        <td>Oil temperature</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_brakesAirPressure</td>
        <td>Brakes air pressure</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_fuel</td>
        <td>Fuel</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_fuelConsumption</td>
        <td>Fuel consumption</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_cruiseControl</td>
        <td>Cruise control</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_waterTemperature</td>
        <td>Water temperature</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_batteryVoltage</td>
        <td>Battery voltage</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_top_retarder</td>
        <td>Retarder</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_top_parkingBrake</td>
        <td>Parking brake</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_top_beamHigh</td>
        <td>Beam high</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_top_beamLow</td>
        <td>Beam low</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_top_beacon</td>
        <td>Beacon</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_bottom_rpm</td>
        <td>RPM</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_bottom_fuel</td>
        <td>Fuel</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_bottom_speedLimit</td>
        <td>Speed limit</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>jagfx_elements_right_restStop</td>
        <td>Next rest stop</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>jagfx_elements_mid_bottom_blinker_turn</td>
        <td>Turning indicator</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>false</td>
    </tr>

</table>

> Note: We can displayed 7 element max in the right side and 4 in the middle side. Place your element on the top.

### Maps

<table>
    <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Values</th>
        <th>Default</th>
    </tr>
    <tr>
        <td>maps_elements_eta</td>
        <td>ETA information</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>maps_elements_speedAndGear</td>
        <td>Speed and gear</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>maps_elements_mapControls</td>
        <td>Map controls</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>maps_elements_speedLimit</td>
        <td>Speed limit</td>
        <td>
            <ul>
                <li>true</li>
                <li>false</li>
            </ul>
        </td>
        <td>true</td>
    </tr>
    <tr>
        <td>maps_map_tilesLocation</td>
        <td>Tiles location</td>
        <td>
            <ul>
                <li>remote</li>
                <li>local</li>
            </ul>
        </td>
        <td>remote</td>
    </tr>
    <tr>
        <td>maps_map_type</td>
        <td>Kind of map</td>
        <td>
            <ul>
                <li>vanilla</li>
                <li>mod</li>
            </ul>
        </td>
        <td>vanilla</td>
    </tr>
    <tr>
        <td>maps_map_tilesRemotePath</td>
        <td>Custom remote tiles location</td>
        <td>
            N/A
        </td>
        <td>https://ets2.jagfx.fr</td>
    </tr>
    <tr>
        <td>maps_map_activeMap</td>
        <td>Active map</td>
        <td>
            <ul>
                <li>null</li>
                <li>ets</li>
                <li>ats</li>
                <li>promod</li>
                <li>promod-ca</li>
            </ul>
        </td>
        <td>null</td>
    </tr>
    <tr>
        <td>maps_map_navigationRemaining</td>
        <td>Navigation ETA</td>
        <td>
            <ul>
                <li>due_date</li>
                <li>remaining_date</li>
            </ul>
        </td>
        <td>remaining_date</td>
    </tr>

</table>

> Note: When the `maps_map_tilesLocations` is set to `local`, you need to download the tiles collection. See the [MAP](./MAP.md) README.

---
↩️ [Home](../README.md)
