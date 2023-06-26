import { AddressRepository } from "@/backend/address/repository";
import { UserId } from "@/backend/user";
import { db } from "@/lib/db";
import { Result, Success } from "@/lib/result";

type RequestType = {
  userId: string;
};

type ResponseType = {
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  block: string;
};

export class AddressFindOneUseCase {
  private repository: AddressRepository = new AddressRepository();
  constructor() {}
  async execute({ userId }: RequestType): Promise<Result<ResponseType, Error>> {
    const _userId = UserId.reBuild(userId);
    const address = await this.repository.findOne(db, _userId);
    const res: ResponseType = {
      postalCode: address ? address.postalCode : "",
      prefecture: address ? address.prefecture : "",
      city: address ? address.city : "",
      town: address ? address.town : "",
      block: address ? address.block : "",
    };
    return new Success(res);
  }
}
