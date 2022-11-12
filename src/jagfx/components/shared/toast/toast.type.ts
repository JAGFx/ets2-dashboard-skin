import { Component, markRaw } from 'vue';

import ToastMessageComponent from '@/jagfx/components/shared/toast/ToastMessageComponent.vue';

export type ToastState = {
  queue: Map<number, Toast>;
};

export enum ToastType {
  MESSAGE
}

export interface Toast {
  type: ToastType;
  component: Component;
  timestamp: number;
  delay: number;
}

abstract class AbstractToast implements Toast {
  private readonly _type: ToastType;
  private readonly _timestamp: number;
  private readonly _delay: number = 4500;
  private _component: Component;

  protected constructor(type: ToastType) {
    this._type = type;
    this._timestamp = Date.now() + Math.round(Math.random() * 100);
  }

  set component(component: Component) {
    this._component = markRaw(component);
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

export class ToastMessage extends AbstractToast {
  private _message: string;

  constructor(message: string) {
    super(ToastType.MESSAGE);
    this._message = message;
    this.component = ToastMessageComponent;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
