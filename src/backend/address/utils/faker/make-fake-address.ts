import { UserId } from "@/backend/user";
import { Address, IAddress } from "../../domain/index";

// - - - - - - - - - - - - - - - - - - - - - - - -
// デフォルト値
// - - - - - - - - - - - - - - - - - - - - - - - -
export const defaultAddress: IAddress = {
  postalCode: "1000001",
  prefecture: "東京都",
  city: "千代田区",
  town: "千代田1-1",
  block: "千代田ビル",
};

// - - - - - - - - - - - - - - - - - - - - - - - -
// テスト用インスタンス作成
// - - - - - - - - - - - - - - - - - - - - - - - -
export const makeFakeAddress = ({
  userId = UserId.create(),
  postalCode = defaultAddress.postalCode,
  prefecture = defaultAddress.prefecture,
  city = defaultAddress.city,
  town = defaultAddress.town,
  block = defaultAddress.block,
}): Address => {
  return Address.reBuild({ postalCode, prefecture, city, town, block }, userId);
};
