import { AggregateRoot } from "@/backend";
import { UserId } from "./user-id";

export interface IUser {}

export class User extends AggregateRoot<IUser, UserId> {
  private constructor(props: IUser, id: UserId) {
    super(props, id);
    // ここにビジネスルールを書く
  }

  public static create(props: IUser): User {
    return new User(props, UserId.create());
  }

  public static reBuild(props: IUser, id: UserId): User {
    return new User(props, id);
  }
}
