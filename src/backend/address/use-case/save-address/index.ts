import { Address, IAddress } from "@/backend/address/domain";
import { AddressRepository } from "@/backend/address/repository";
import { UserId } from "@/backend/user";
import { PrismaClient } from "@prisma/client";
import { ISaveAddressRequest } from "./request-interface";
import { ISaveAddressResponse } from "./response-interface";

type Props = ISaveAddressRequest & { userId: string };

/**
 * @public
 */
export class SaveAddress {
  private repository: AddressRepository = new AddressRepository();
  constructor(private readonly prisma: PrismaClient) {}
  async execute({
    postalCode,
    prefecture,
    city,
    town,
    block,
    userId,
  }: Props): Promise<ISaveAddressResponse> {
    // データを作成
    const _userId = UserId.reBuild(userId);
    const props: IAddress = {
      postalCode: postalCode,
      prefecture: prefecture,
      city: city,
      town: town,
      block: block,
    };
    const _address: Address = Address.reBuild(props, _userId);

    // データを保存(リポジトリを跨る場合はlongTransactionを使う)
    const result: Address = await this.repository.save(this.prisma, _address);

    // 返却
    return {
      postalCode: result.postalCode,
      prefecture: result.prefecture,
      city: result.city,
      town: result.town,
      block: result.block ?? "",
    };
  }
}
