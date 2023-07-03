import { AddressRepository } from "@/backend/address/repository";
import { UserId } from "@/backend/user";
import { PrismaClient } from "@prisma/client";
import { IFindOneAddressResponse } from "./response-interface";

/**
 * @public
 */
export class FindOneAddress {
  private repository: AddressRepository = new AddressRepository();
  constructor(private readonly prisma: PrismaClient) {}
  async execute(userId: string): Promise<IFindOneAddressResponse> {
    const _userId = UserId.reBuild(userId);
    const address = await this.repository.findOne(this.prisma, _userId);

    if (address) {
      return {
        postalCode: address.postalCode,
        prefecture: address.prefecture,
        city: address.city,
        town: address.town,
        block: address.block ?? "",
      };
    } else {
      return {
        postalCode: "",
        prefecture: "",
        city: "",
        town: "",
        block: "",
      };
    }
  }
}
