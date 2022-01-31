/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_config.js
 * Date: 	08/04/2020
 * Time: 	17:50
 */

import fieldValues from '@/data/config-field-values.json';
import store from '@/store';
import { store as telemetryStore } from '@/store/telemetry.store';
import { basePathHost, useFakeData } from '@/utils/_app';
import axios from 'axios';
import defaultAtsConfig from 'ets2-dashboard-lib/config/config.ats.json';
import defaultEts2Config from 'ets2-dashboard-lib/config/config.ets2.json';
import defaultGeneralConfig from 'ets2-dashboard-lib/config/config.json';
import FileSaver from 'file-saver';

export const generateEmptyData = (config, configSkins) => {
  let emptyData = {};

  config.categories.forEach((category) => {
    category.elements.forEach((element) => {
      emptyData[element.id] = null;
    });
  });

  Object.entries(configSkins).forEach((skin) => {
    skin.categories.forEach((category) => {
      category.elements.forEach((element) => {
        emptyData[element.id] = null;
      });
    });
  });

  return emptyData;
};

export const emptyData = (withGame = false, gameId) => {
  let gameConfig = null;

  if (withGame) {
    gameConfig = gameId === 'ets2' ? defaultEts2Config : defaultAtsConfig;
  }

  return {
    app: defaultGeneralConfig,
    game: gameConfig
  };
};

export const save = async (data, target) => {
  store.dispatch('app/startProcessing');

  const gameId = telemetryStore.telemetry.game.game.name;

  if (useFakeData)
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch('app/endProcessing');
        resolve(data);
      }, 1000);
    });

  return await axios
    .post(basePathHost() + `/config/${target}`, {
      data: data[target],
      gameId
    })
    .then(
      (response) => {
        store.dispatch('app/endProcessing');
        return response.data;
      },
      (error) => {
        store.dispatch('app/setError', {
          message: {
            type: 'dark',
            title: error.name,
            message: error.message
          },
          details: {
            error: error,
            code: 'CONFIG_SAVE_FAILED'
          }
        });
        throw error;
      }
    );
};

export const download = (target) => {
  return load(target).then((data) => {
    const gameId = telemetryStore.telemetry.game.game.name;
    const fileName = target === 'app' ? 'config.json' : `config.${gameId}.json`;

    const file = new File([JSON.stringify(data, null, 2)], fileName, {
      type: 'application/json;charset=utf-8'
    });

    FileSaver.saveAs(file);
  });
};

export const load = (target) => {
  if (useFakeData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.getters[`config/${target}`] ?? emptyData()[target]);
      }, 1000);
    });

  return axios.get(basePathHost() + '/config').then(
    (response) => {
      return response.data[target];
    },
    (error) => {
      store.dispatch('app/setError', {
        message: {
          type: 'dark',
          title: error.name,
          message: error.message
        },
        details: {
          error: error,
          code: 'CONFIG_LOAD_FAILED'
        }
      });
      throw error;
    }
  );
};

export const loadGameConfig = () => {
  const gameName = telemetryStore.telemetry.game.game.name;

  if (useFakeData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(emptyData(true, gameName).game);
      }, 1000);
    });

  return axios.get(basePathHost() + `/config`).then(
    (response) => {
      return response.data.game;
    },
    (error) => {
      store.dispatch('app/setError', {
        message: {
          type: 'dark',
          title: error.name,
          message: error.message
        },
        details: {
          error: error,
          code: 'CONFIG_LOAD_FAILED'
        }
      });
      throw error;
    }
  );
};

export const upload = (file, target) => {
  return new Promise((resolve, reject) => {
    try {
      if (file.type !== 'application/json') throw 'Invalid file type';

      let reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          const checkResult = uploadChecker(data, target);

          if (!checkResult.state)
            throw 'An entry required was not found: ' + checkResult.value;

          save(data, target).then(
            (data) => resolve(data),
            (error) => reject(error)
          );
        } catch (e) {
          reject(e);
        }
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
    } catch (e) {
      reject(e);
    }
  });
};

export const getFieldValues = (fieldId) => {
  if (Object.hasOwnProperty.call(fieldValues, fieldId))
    return new Promise((resolve) => resolve(fieldValues[fieldId]));
  else return new Promise((resolve) => resolve([]));
};

const uploadChecker = (input, target) => {
  let result = {
    state: true
  };

  Object.entries(emptyData()[target]).forEach((entry) => {
    const key = entry[0];

    if (!Object.hasOwnProperty.call(input, key))
      result = {
        state: false,
        value: key
      };
  });

  return result;
};
