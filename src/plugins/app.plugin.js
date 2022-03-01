/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	app.plugin.js
 * Date: 	14/08/2021
 * Time: 	19:43
 */

import store from '@/store';
import { mutations } from '@/store/telemetry.store';
import { pushLog } from '@/utils/_app';
import { translate } from '@/utils/_i18n';
import { event, history } from '@/utils/utils';
import additionalTelemetryWatcher from '@/utils/telemetry/_additional-watcher.utils';

export default {
  install(Vue) {
    Vue.prototype.$pushALog = pushLog;

    Vue.prototype.$updateEvent = (data) => {
      const theEvent = event.filterInputEvent(data);

      if (theEvent !== false) {
        const configName = `events_${theEvent.eventName}`;
        const isActive = store.getters['config/enabled'](configName);

        if (isActive) {
          Vue.prototype.$pushALog(
            'New event ' + JSON.stringify(theEvent),
            history.HTY_ZONE.MAIN
          );

          store.dispatch('event/displayAnEvent', {
            eventProcessing: true,
            eventName: theEvent.eventName,
            eventRawData: theEvent.rawData
          });
        }
      }
    };

    Vue.prototype.$updateTelemetry = (payload) => {
      const data = { ...payload };
      Object.freeze(data);
      const gameConnected =
        data.game !== null &&
        typeof data.game === 'object' &&
        Object.keys(data.game).length > 0;

      mutations.setTelemetry(data);
      mutations.setGameConnected(gameConnected);

      if (gameConnected) mutations.setReceivedData(true);
    };

    additionalTelemetryWatcher(Vue);
    // ---

    Vue.prototype.$t = translate;
  }
};
