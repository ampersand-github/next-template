import { ValueObject } from "@/backend";

export interface IPostalCode {
  value: string;
}
export class PostalCode extends ValueObject<IPostalCode> {
  private readonly LENGTH = 7;
  public get value(): IPostalCode["value"] {
    return this._props.value;
  }

  public constructor(props: IPostalCode) {
    super(props);
    if (this._props.value.length !== this.LENGTH)
      throw new Error("郵便番号桁数が7桁ではありません。7桁で入力してください");
    // todo 数値7桁でない場合はエラー
  }
}
