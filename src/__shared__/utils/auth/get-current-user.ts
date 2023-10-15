import { authOptions } from "@/__shared__/utils/auth/auth-options";
import { getServerSession } from "next-auth";

/**
 * @public
 */
export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
