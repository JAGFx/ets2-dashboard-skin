/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	config.js
 * Date: 	15/11/2021
 * Time: 	22:10
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { ConfigurationException } from './exceptions.js';
import store from './store.js';

const oldConfigPath = (basePath = null) =>
  path.resolve(
    basePath ?? process.cwd(),
    './config/config.ets2-dashboard-skin.json'
  );

export const initAppConfig = () => {
  return new Promise((resolve) => {
    store.set('config', {
      app: JSON.parse(appConfig()),
      game: null
    });
    resolve();
  });
};

export const appConfigPath = () => {
  const basePath = store.get('configPath');
  const newAppConfigPath = path.resolve(
    basePath ?? process.cwd(),
    `./config/config.json`
  );

  return existsSync(newAppConfigPath)
    ? newAppConfigPath
    : oldConfigPath(basePath);
};

export const gameConfigPath = (gameId) => {
  const basePath = store.get('configPath');
  const newGameConfigPath = path.resolve(
    basePath ?? process.cwd(),
    `./config/config.${gameId}.json`
  );

  return existsSync(newGameConfigPath)
    ? newGameConfigPath
    : oldConfigPath(basePath);
};

export const appConfig = () => {
  const configFileName = appConfigPath();

  try {
    return readFileSync(configFileName, 'UTF-8');
  } catch (e) {
    throw new ConfigurationException(
      'Unable to read the configuration application file',
      { configFileName, reason: e.message }
    );
  }
};

export const gameConfig = (target) => {
  const configFileName = gameConfigPath(target);

  try {
    return readFileSync(configFileName, 'UTF-8');
  } catch (e) {
    throw new ConfigurationException(
      'Unable to read the configuration game file',
      { target, configFileName, reason: e.message }
    );
  }
};

export const saveAppConfig = (data) => {
  const configFileName = appConfigPath();

  try {
    const appConfig = JSON.stringify(data, null, 2);
    writeFileSync(configFileName, appConfig);

    store.set('config.app', appConfig);
  } catch (e) {
    throw new ConfigurationException(
      'Unable to save the configuration application file',
      { configFileName, reason: e.message }
    );
  }
};

export const saveGameConfig = (gameId, data) => {
  const configFileName = gameConfigPath(gameId);

  try {
    const gameConfig = JSON.stringify(data, null, 2);

    writeFileSync(configFileName, gameConfig);

    store.set('config.game', gameConfig);
  } catch (e) {
    throw new ConfigurationException(
      'Unable to save the configuration game file',
      { gameId, configFileName, reason: e.message }
    );
  }
};
