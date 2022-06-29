# Known issues

## Not yet fixed

<table>
  <tr>
    <th>Issue</th>
    <th>Cause</th>
  </tr>
  <tr>
    <td>Changing settings in the Configuration tab may not be reflected in the application</td>
    <td>Relaunch app</td>
  </tr>
  <tr>
    <td>May not work with some Apple mobile devices.</td>
    <td>No solution yet</td>
  </tr>
  <tr>
    <td>Wrong next rest time and remaining time #46</td>
    <td>See <a href="https://github.com/JAGFx/ets2-dashboard-skin/issues/33#issuecomment-725514001">here</a></td>
  </tr>
  <tr>
    <td>Some dashboard may over or under sized in device</td>
    <td>This problem was found on a device using the scaling definition of their screen.</td>
  </tr>
</table>


## Fixed

<table>
  <tr>
    <th>Issue</th>
    <th>Cause</th>
    <th>Solution</th>
  </tr>
  <tr>
    <td>Wrong time stamp of the job delivery time (and remaining delivery time) on World of Trucks</td>
    <td>The time stamp provided by the API was wrong. And then the estimated remaining delivery time was also wrong.</td>
    <td>Check <a href="https://github.com/JAGFx/ets2-dashboard-skin/issues/33#issuecomment-725514001">here</a></td>
  </tr>
  <tr>
    <td>Application crashed or data update was not smooth</td>
    <td>Memory leak when updating telemetry data</td>
    <td>Fixed on #35</td>
  </tr>
  <tr>
    <td>Data desynchronization on the dashboard (all data can be updated with a delay).</td>
    <td>Unknown</td>
    <td>Stop and restart the application</td>
  </tr>
  <tr>
    <td>Application freeze at a given time (mobile device only)</td>
    <td>Unknown</td>
    <td>Tap on screen to reactivate it #41</td>
  </tr>
  <tr>
    <td>Job information disappears when using Eurotunnel #47</td>
    <td>It seems to be a problem with the SCS SDK.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>The application may crash at launch #89</td>
    <td>Unknown</td>
    <td>Start the app as an <b>Administrator</b></td>
  </tr>
  <tr>
    <td>The application crashes instantly with a message like<br>
        <code>The specified module could not be found.
C:\Users\username\AppData\Local\Temp\pkg\<token>\trucksim-telemetry\build\Release\scsSDKTelemetry.node</code>
    </td>
    <td>Unknown</td>
    <td>Delete folder at <code>C:\Users\username\AppData\Local\Temp\pkg</code> and relaunch</td>
  </tr>
</table>

---
↩️ [Home](../README.md)
