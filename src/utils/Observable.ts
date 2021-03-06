// ====================================================== //
// ======================== Event ======================= //
// ====================================================== //

// Modified JS-Class by Alexander Bazo
export class Event {
  type: string;
  data: any;
  constructor(type: string, data: any) {
    this.type = type; // event type
    this.data = data; // extra data (e.g. click event data)
    Object.freeze(this);
  }
}

// ====================================================== //
// ===================== Observable ===================== //
// ====================================================== //

// JS-Class by Alexander Bazo

export class Observable {
  listener: any = {};
  constructor() {
    this.listener = {};
  }

  addEventListener(type: string, callback: Function) {
    if (this.listener[type] === undefined) {
      this.listener[type] = [];
    }
    this.listener[type].push(callback);
  }

  removeEventListener(type: string, callback: Function) {
    if (this.listener[type] !== undefined) {
      for (let i = 0; i < this.listener[type].length; i++) {
        if (this.listener[type][i] === callback) {
          this.listener[type].splice(i, 1);
          return;
        }
      }
    }
  }

  notifyAll(event: Event) {
    if (this.listener[event.type] !== undefined) {
      for (let i = 0; i < this.listener[event.type].length; i++) {
        this.listener[event.type][i](event);
      }
    }
  }

  clear() {
    this.listener = {};
  }
}

export class LiveData extends Observable {
  static EVENT_DATA_CHANGED: string = "dataChanged";
  private _value: any;
  constructor(data: any) {
    super();
    this._value = data;
  }

  get value() {
    return this._value;
  }

  set value(data: any) {
    this._value = data;
    this.notifyAll(new Event(LiveData.EVENT_DATA_CHANGED, data));
  }
}

// ====================================================== //
// ====================== EventBus ====================== //
// ====================================================== //

// Usage:
// 1. import EventBus from "...EventBus.js";
// 2. Send event to EventBus: EventBus.notifyAll(new Event(...));
// 3. Listen to events via: EventBus.addEventListener(EVENT_TYPE, (event) => {...});

export const D3EventBus = new Observable();
export const WebEventBus = new Observable();
