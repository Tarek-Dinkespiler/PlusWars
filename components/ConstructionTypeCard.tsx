import Image from "next/image";
import Link from "next/link";
import type { ConstructionType } from "@/lib/construction-types";

type Props = {
  type: ConstructionType;
};

export default function ConstructionTypeCard({ type }: Props) {
  return (
    <Link href={`/constructions/${type.slug}`}>
      <div className="neo-window cursor-pointer transition-all dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {type.image && (
            <Image
              src={type.image}
              alt={type.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold dark:text-[#f5f5f5]">{type.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-1">{type.description}</p>
        </div>
      </div>
    </Link>
  );
}
