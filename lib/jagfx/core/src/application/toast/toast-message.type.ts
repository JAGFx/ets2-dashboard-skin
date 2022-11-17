import { AbstractToast, ToastType } from '@core/application/toast/toast.type';

export class ToastMessage extends AbstractToast {
  private _message: string;

  constructor(message: string) {
    super(ToastType.MESSAGE);
    this._message = message;
    this.component = 'ToastMessageComponent';
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
