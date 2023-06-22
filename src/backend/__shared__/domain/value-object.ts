import deepEqual from "deep-equal";
import { IEquatable } from "./equatable";

export abstract class ValueObject<T> implements IEquatable {
  protected readonly _props: T;

  protected constructor(props: T) {
    this._props = Object.freeze(props);
  }

  public equals(other: ValueObject<T>): boolean {
    return deepEqual(this._props, other._props);
  }
}
