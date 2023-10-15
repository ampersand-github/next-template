import { Button } from "@/__shared__/components/ui/button";
import {
  PartsA1,
  PartsA2,
} from "@/app/(operation-check)/operation-check/import-access/_components";

export default async function Page() {
  return (
    <div>
      <h1>operation-check-Co-location</h1>
      <PartsA1 />
      <PartsA2 />
      {/* <PartsA3 /> */}
      <Button />
    </div>
  );
}
