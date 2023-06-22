import { UniqueEntityId } from "@/backend/__shared__/domain/unique-entity-id";
import { IEquatable } from "./equatable";

export abstract class Entity<T, U extends UniqueEntityId>
  implements IEquatable
{
  protected readonly _props: T;
  private readonly _id: U;

  protected constructor(_props: T, _id: U) {
    this._props = _props;
    this._id = _id;
  }

  public get id(): U {
    return this._id;
  }

  public equals(object: Entity<T, U>): boolean {
    if (this === object) return true;
    return this.id.equals(object.id);
  }
}
