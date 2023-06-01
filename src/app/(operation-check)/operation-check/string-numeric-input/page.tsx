import { AgeForm } from "./index";

export default async function Page() {
  return (
    <main className="space-y-8 p-24">
      <h1 className="text-4xl font-bold">string-numeric-input</h1>
      <AgeForm />
      <input type={"number"} />
    </main>
  );
}
