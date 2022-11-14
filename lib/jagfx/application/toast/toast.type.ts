export type ToastState = {
  queue: Map<number, Toast>;
};

export enum ToastType {
  MESSAGE
}

export interface Toast {
  type: ToastType;
  component: string;
  timestamp: number;
  delay: number;
}

export abstract class AbstractToast implements Toast {
  private readonly _type: ToastType;
  private readonly _timestamp: number;
  private readonly _delay: number = 4500;
  private _component: string;

  protected constructor(type: ToastType) {
    this._type = type;
    this._timestamp = Date.now() + Math.round(Math.random() * 100);
  }

  set component(component: string) {
    this._component = component;
  }

  get component() {
    return this._component;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get type(): ToastType {
    return this._type;
  }

  get delay(): number {
    return this._delay;
  }
}
