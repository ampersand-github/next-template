import { Badge } from "@/__shared__/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/__shared__/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Props = {
  imageSrc: string;
  companyName: string;
  salesArea: string[];
  description: string;
  awards: string[];
};

export const CardPresenter = ({
  imageSrc,
  companyName,
  salesArea,
  description,
  awards,
}: Props) => {
  return (
    <Card className={"space-y-4 rounded-md"}>
      <Image
        className={"rounded-t-md"}
        src={imageSrc}
        alt={"image"}
        width={1600}
        height={900}
      ></Image>
      <CardContent className={"space-y-2"}>
        {/* 事業会社名 */}
        <h2 className="font-bold">{companyName}</h2>

        {/* 営業地域 */}
        <div className={"flex flex-row items-center space-x-1"}>
          <MapPin className={"w-4"} />
          <div className="line-clamp-1  flex flex-row space-x-2">
            {salesArea.map((area) => (
              <Link key={area} href={"/"}>
                <p className={"whitespace-nowrap text-xs text-gray-500"}>
                  {area}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 事業者概要説明 */}
        <CardDescription className={"line-clamp-5"}>
          {description}
        </CardDescription>

        {/* 取得資格 */}
        <div className={"flex flex-row items-center"}>
          <div className={" line-clamp-3"}>
            {awards.map((award) => (
              <Badge key={award} className={"my-1 mr-1"}>
                {award}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
