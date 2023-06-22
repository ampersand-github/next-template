import { UniqueEntityId } from "@/backend";
import { ulid } from "ulid";

export class UserId extends UniqueEntityId {
  private declare _UserIdBrand: void; // クラスの型を区別するためのダミーのプロパティ
  private constructor(value: string) {
    super(value, "UserId");
  }

  public static create(): UserId {
    return new UserId(ulid());
  }

  public static reBuild(value: string): UserId {
    return new UserId(value);
  }
}
