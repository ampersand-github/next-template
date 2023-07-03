import { AggregateRoot } from "@/backend";
import { UserId } from "@/backend/user";
import { PostalCode } from "./post-code";
import { Prefecture } from "./prefecture";

export interface IAddress {
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  block?: string;
}

/*
 * 引数はプリミティブ型で受け取る。
 * 集約ルートの中でのみ、その配下のエンティティ、値オブジェクトを生成する。
 * 出力はプリミティブ型で返す。(他の層でエンティティ、値オブジェクトを使わせない)
 */
export class Address extends AggregateRoot<IAddress, UserId> {
  private readonly _postalCode: PostalCode;
  private readonly _prefecture: Prefecture;
  private readonly _city: string;
  private readonly _town: string;
  private readonly _block: string | undefined;

  public get postalCode(): string {
    return this._postalCode.value;
  }

  public get prefecture(): string {
    return this._prefecture.value;
  }

  public get city(): string {
    return this._city;
  }

  public get town(): string {
    return this._town;
  }

  public get block(): string | undefined {
    return this._block;
  }

  private constructor(props: IAddress, userId: UserId) {
    super(props, userId);
    // ここにビジネスルールを書く
    // 丁寧にやるなら返り値をResultにしてもいい
    this._postalCode = new PostalCode({ value: props.postalCode });
    this._prefecture = new Prefecture({ value: props.prefecture });
    this._city = props.city;
    this._town = props.town;
    this._block = props.block;
  }

  /*
  // ログインしている前提なのでこのメソッドは使わない
  public static create(props: IAddress): Address {
    return new Address(props, AddressId.create());
  }
 */

  public static reBuild(props: IAddress, userId: UserId): Address {
    return new Address(props, userId);
  }
}
