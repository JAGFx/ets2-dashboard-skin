/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_app.js
 * Date: 	08/04/2020
 * Time: 	18:36
 */

import store from '@/store';
import { history } from '@/utils/utils';
import countryList from 'country-list';
import emojiFlags from 'emoji-flags';
import momentjs from 'moment-timezone';

import packageJson from '../../package.json';

// --- Variables
const DATE_FORMAT_NONE = '';
const DATE_FORMAT_SHORT = 'MM/DD';
const DATE_FORMAT_LONG = 'ddd';
const DATE_FORMAT_FULL = 'dddd';
const TIME_FORMAT_NONE = '';
const TIME_FORMAT_SHORT = 'LT';
const TIME_FORMAT_FULL = 'LTS';

const GAME_ID_ETS2 = 1;
const GAME_ID_ATS = 2;

// --- Methods

export const version = packageJson.version;
export const isOnDevEnvironment = process.env.NODE_ENV.startsWith('dev');
export const useFakeData = process.env.VUE_APP_USE_FAKE_DATA === 'true';

export const basePathHost = () =>
  `http://${window.location.hostname}:${store.getters['config/app'].general_port}`;
export const moment = () => {
  momentjs.locale(store.getters['config/get']('general_skin_locale'));
  return momentjs;
};

export const flag = (countryName, gameID) => {
  let flag = undefined;

  if (countryName.length !== 0) {
    countryName =
      countryName === 'uk'
        ? 'United Kingdom of Great Britain and Northern Ireland'
        : countryName;
    const countryCode = countryList.getCode(countryName);

    if (countryCode !== undefined) flag = emojiFlags.countryCode(countryCode);

    if (gameIsATS(gameID)) flag = emojiFlags.countryCode('US');
  }

  return flag !== undefined ? flag.emoji : '🏳️';
};

export const numberDigit = (input) => {
  return input < 10 ? `0${input}` : input;
};

export const jsonReadable = (dataIn) => {
  return JSON.parse(JSON.stringify(dataIn));
};

export const dateTimeLocalized = (input, formatDate, formatTime) => {
  const format = formatDate + ' ' + formatTime;
  const momentData = moment()(input, 'x');

  return momentData.tz('Africa/Abidjan').format(format);
};

export const diffDateTimeLocalized = (dFrom, dTo, withDay = true) => {
  const momentFrom = moment()(dFrom, 'x');
  const momentTo = moment()(dTo, 'x');
  const diff = momentTo.diff(momentFrom);
  const format = withDay ? 'DD[d] HH[h] mm[m]' : 'HH[h] mm[m]';

  return moment()(diff, 'x').tz('Africa/Abidjan').format(format);
};

export const displayDuration = (duration, withDay = true) => {
  const d = Math.trunc(duration / 60 / 24);
  const h = Math.trunc(((duration / 60 / 24) % 1) * 24);
  const m = Math.trunc(((duration / 60) % 1) * 60);

  return withDay ? d + 'd ' + h + 'h ' + m + 'm' : h + d * 24 + 'h ' + m + 'm';
};

export const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

export const gameIsATS = (gameID) => gameID === GAME_ID_ATS;

export const gameIsETS2 = (gameID) => gameID === GAME_ID_ETS2;

export const betweenFloat = (data, a, b) => {
  return parseFloat(data) >= a && parseFloat(data) <= b;
};

export const pushLog = (message, zone, level = history.HTY_LEVEL.INFO) => {
  store.dispatch('debug/addLog', {
    message,
    zone,
    level
  });
};

export const formatConstants = {
  DATE_FORMAT_NONE,
  DATE_FORMAT_SHORT,
  DATE_FORMAT_LONG,
  DATE_FORMAT_FULL,
  TIME_FORMAT_NONE,
  TIME_FORMAT_SHORT,
  TIME_FORMAT_FULL,
  GAME_ID_ATS,
  GAME_ID_ETS2
};
