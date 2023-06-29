import { TransactionClient } from "@/__shared__/utils/db";
import { convertToAddressDomain } from "@/backend/address";
import { PrismaClient } from "@prisma/client";
import { UserId } from "../../user";
import { Address } from "../domain";

export class AddressRepository {
  public async isExist(p: PrismaClient, id: UserId): Promise<boolean> {
    const where = { user_id: id.toString() };
    const count = await p.address.count({ where });
    return count > 0;
  }
  public async findOne(
    p: PrismaClient,
    userId: UserId
  ): Promise<Address | undefined> {
    const where = { user_id: userId.toString() };
    const result = await p.address.findUnique({ where });
    return result ? convertToAddressDomain(result) : undefined;
  }

  public async save(
    p: PrismaClient | TransactionClient,
    address: Address
  ): Promise<Address> {
    const property = {
      user_id: address.id.toString(),
      post_code: address.postalCode,
      prefecture: address.prefecture,
      city: address.city,
      town: address.town,
      block: address.block,
    };

    const result = await p.address.upsert({
      where: { user_id: address.id.toString() },
      create: { ...property },
      update: property,
    });

    return convertToAddressDomain(result);
  }
}
