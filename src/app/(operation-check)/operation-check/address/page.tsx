// import { AddressForm } from "./_components";

import { AddressForm } from "@/app/(operation-check)/operation-check/address/_components/address-form";

export default async function Page() {
  return (
    <main className="space-y-8 p-24">
      <h1 className="text-4xl font-bold">address-form</h1>
      <AddressForm />
    </main>
  );
}
