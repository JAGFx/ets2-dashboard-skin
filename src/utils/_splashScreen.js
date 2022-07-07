/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_splashScreen.js
 * Date: 	27/10/2021
 * Time: 	21:41
 */

import { load, loadGameConfig as configLoadGameConfig } from '@/utils/_config';
import { HTY_LEVEL, HTY_ZONE } from '@/utils/_history';
import { telemetryDataIsEnough } from '@/utils/telemetry/_common.utils';
import testData from 'ets2-dashboard-lib/sdk/scs_sdk_plugin_parsed_data.json';
import store from '@/store';
import { basePathHost, pushLog, useFakeData } from '@/utils/_app';
import { changeLocale, fallbackLocale } from '@/utils/_i18n';
import { io } from 'socket.io-client';
import Vue from 'vue';
import { store as telemetryStore } from '@/store/telemetry.store';

export const loadAppConfig = () => {
  store.dispatch('app/showMessage', {
    icon: null,
    title: 'Launching',
    message: 'Load app configuration file'
  });

  return load('app').then((data) => {
    pushLog('Config loaded', HTY_ZONE.MAIN);
    store.commit('config/setApp', data);
  });
};

export const setConfigActive = () => {
  store.dispatch('app/showMessage', {
    icon: null,
    title: 'Launching',
    message: 'Set startup skin'
  });

  return new Promise((resolve) => {
    const skinToLoad = store.getters['config/get']('general_skin_on_load');

    try {
      store.commit('skins/setConfigActive', skinToLoad);
      resolve();
    } catch (e) {
      pushLog(
        'Value set in "general_skin_on_load" was not a valid skin: ' +
          skinToLoad,
        HTY_ZONE.MAIN,
        HTY_LEVEL.ERROR
      );
      store.dispatch('skins/setFirstActive');
      resolve();
    }
  });
};

export const setLocale = () => {
  store.dispatch('app/showMessage', {
    icon: null,
    title: 'Launching',
    message: 'Set language'
  });

  return new Promise((resolve) => {
    const locale = store.getters['config/get']('general_skin_locale');
    try {
      changeLocale(locale);
      resolve();
    } catch (e) {
      pushLog(
        `Value set in "general_skin_locale" was not a valid skin: ${locale}. Revert to fallback locale: ${fallbackLocale}`,
        HTY_ZONE.MAIN,
        HTY_LEVEL.ERROR
      );
      changeLocale(fallbackLocale);
      resolve(e);
    }
  });
};

export const connectToTelemetryServer = () => {
  return new Promise((resolve) => {
    store.dispatch('app/showMessage', {
      icon: null,
      title: 'Launching',
      message: 'Start'
    });

    if (!useFakeData) {
      const telemetrySocket = io(basePathHost());
      telemetrySocket.on('connect', () => {
        store.dispatch('app/showMessage', {
          icon: '<i class="fas fa-truck"></i>',
          title: 'Connected to telemetry server',
          message: 'Ready to delivering'
        });
      });
      telemetrySocket.on('update', (data) => {
        Vue.prototype.$updateTelemetry(data);
      });
      telemetrySocket.on('log', (data) => {
        Vue.prototype.$updateEvent(data);
      });
    } else {
      setTimeout(() => {
        Vue.prototype.$updateTelemetry(testData);
      }, 1000);
    }

    const waitingInterval = setInterval(() => {
      store.dispatch('app/showMessage', {
        icon: '<i class="fas fa-truck"></i>',
        title: 'Waiting game connection',
        message: 'Run the game to start your job !'
      });

      if (telemetryStore.gameConnected) {
        clearInterval(waitingInterval);
        resolve();
      }
    }, 500);
  });
};

export const loadGameConfig = () => {
  store.dispatch('app/showMessage', {
    icon: null,
    title: 'Launching',
    message: 'Load configuration game'
  });

  return configLoadGameConfig().then((data) => {
    pushLog('Game config loaded', HTY_ZONE.MAIN);
    store.commit('config/setGame', data);
  });
};

export const waitingTruckSpawn = () => {
  return new Promise((resolve) => {
    const waitingInterval = setInterval(() => {
      store.dispatch('app/showMessage', {
        icon: null,
        title: 'Launching',
        message: 'Last waiting time to drive'
      });

      if (telemetryDataIsEnough()) {
        clearInterval(waitingInterval);
        resolve();
      }
    }, 500);
  });
};
