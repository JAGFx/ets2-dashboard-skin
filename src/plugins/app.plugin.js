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
import { filterInputEvent } from '@/utils/_event';
import { HTY_ZONE } from '@/utils/_history';
import { translate } from '@/utils/_i18n';
import additionalTelemetryWatcher from '@/utils/telemetry/_additional-watcher.utils';

export default {
  install: (app) => {
    //app.config.globalProperties.$pushALog = pushLog;

    app.config.globalProperties.$updateEvent = (data) => {
      const theEvent = filterInputEvent(data);

      if (theEvent !== false) {
        const configName = `events_${theEvent.eventName}`;
        const isActive = store.getters['config/enabled'](configName);

        if (isActive) {
          app.config.globalProperties.$pushALog(
            'New event ' + JSON.stringify(theEvent),
            HTY_ZONE.MAIN
          );

          store.dispatch('event/displayAnEvent', {
            eventProcessing: true,
            eventName: theEvent.eventName,
            eventRawData: theEvent.rawData
          });
        }
      }
    };

    app.config.globalProperties.$updateTelemetry = (payload) => {
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

    // FIXME: Apply VUE3 new style
    //additionalTelemetryWatcher(app);
    // ---

    //app.config.globalProperties.$t = translate;
  }
};
