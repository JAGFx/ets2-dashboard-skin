import TelemetryJob from '@/model/telemetry-job.model';
import TelemetryNavigation from '@/model/telemetry-navigation.model';
import TelemetrySymbols from '@/model/telemetry-symbols.model';
import TelemetryTrailer from '@/model/telemetry-trailer.model';
import TelemetryTruck from '@/model/telemetry-truck.model';
import { store as telemetryStore } from '@/store/telemetry.store';

export default class Telemetry {
  constructor() {
    this._truck = new TelemetryTruck();
    this._navigation = new TelemetryNavigation();
    this._symbols = new TelemetrySymbols();
    this._job = new TelemetryJob();
    this._trailer = new TelemetryTrailer();
  }

  get gameTime() {
    return telemetryStore.telemetry.game.time.unix;
  }
  get gameId() {
    return telemetryStore.telemetry.game.game.id;
  }
  get gameSdkIsActive() {
    return telemetryStore.telemetry.game.sdkActive;
  }

  get truck() {
    return this._truck;
  }
  get navigation() {
    return this._navigation;
  }
  get symbols() {
    return this._symbols;
  }
  get job() {
    return this._job;
  }
  get trailer() {
    return this._trailer;
  }
}
