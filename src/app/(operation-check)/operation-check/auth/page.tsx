import { getCurrentUser } from "@/__shared__/utils/auth/get-current-user";
import { GitHubButton, LogoutButton } from "./_components";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-between space-y-8 p-24">
      <h1>auth</h1>
      {user ? (
        <>
          <p>ログイン中</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <LogoutButton />
        </>
      ) : (
        <>
          <p>未ログイン</p>
          <GitHubButton />
        </>
      )}
    </main>
  );
}
