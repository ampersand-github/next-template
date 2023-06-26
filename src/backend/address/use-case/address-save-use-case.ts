import { Address, IAddress } from "@/backend/address/domain";
import { AddressRepository } from "@/backend/address/repository";
import { UserId } from "@/backend/user";
import { Result, Success } from "@/lib/result";
import { PrismaClient } from "@prisma/client";

type RequestType = {
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    town: string;
    block: string;
  };
  userId: string;
};

type ResponseType = {
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  block: string;
};

export class AddressSaveUseCase {
  private repository: AddressRepository = new AddressRepository();
  constructor(private readonly prisma: PrismaClient) {}
  async execute({
    address,
    userId,
  }: RequestType): Promise<Result<ResponseType, Error>> {
    // データを作成
    const _userId = UserId.reBuild(userId);
    const props: IAddress = {
      postalCode: address.postalCode,
      prefecture: address.prefecture,
      city: address.city,
      town: address.town,
      block: address.block,
    };
    const _address: Address = Address.reBuild(props, _userId);

    // データを保存(リポジトリを跨る場合はlongTransactionを使う)
    const result: Address = await this.repository.save(this.prisma, _address);

    // 返却
    const res: ResponseType = {
      postalCode: result.postalCode,
      prefecture: result.prefecture,
      city: result.city,
      town: result.town,
      block: result.block,
    };
    return new Success(res);
  }
}
