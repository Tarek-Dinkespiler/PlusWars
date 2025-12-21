import Image from "next/image";
import type { Construction } from "@/lib/constructions";

type Props = {
  construction: Construction;
};

export default function ConstructionCard({ construction }: Props) {
  const firstImage = construction.images[0];

  return (
    <div className="neo-window">
      {firstImage && (
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={firstImage}
            alt={construction.title || "Construction"}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        {construction.title && (
          <h4 className="text-base font-bold">{construction.title}</h4>
        )}
        {construction.description && (
          <p className="text-sm text-gray-600 mt-2">{construction.description}</p>
        )}
      </div>
    </div>
  );
}
