import { UserId } from "@/backend/user";
import { address as PrismaAddress } from "@prisma/client";
import { Address, IAddress } from "../../domain";

export const convertToAddressDomain = (address: PrismaAddress): Address => {
  const props: IAddress = {
    postalCode: address.post_code,
    prefecture: address.prefecture,
    city: address.city,
    town: address.town,
    block: address.block || "",
  };
  const userId = UserId.reBuild(address.user_id);
  return Address.reBuild(props, userId);
};
