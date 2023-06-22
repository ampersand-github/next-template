import { ValueObject } from "@/backend";

export interface IPrefecture {
  value: string;
}
export class Prefecture extends ValueObject<IPrefecture> {
  public get value(): IPrefecture["value"] {
    return this._props.value;
  }

  public constructor(props: IPrefecture) {
    super(props);
    // TODO 47都道府県に一致しない場合はエラーを出力する
  }
}
