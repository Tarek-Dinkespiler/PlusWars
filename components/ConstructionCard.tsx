import Image from "next/image";
import Link from "next/link";
import type { Construction } from "@/lib/constructions";

type Props = {
  construction: Construction;
  typeSlug?: string;
};

export default function ConstructionCard({ construction, typeSlug }: Props) {
  const firstImage = construction.images[0];
  const hasVideo = !!construction.video;

  const href = typeSlug ? `/constructions/${typeSlug}/${construction.slug}` : "#";

  return (
    <Link href={href}>
      <div className="neo-window cursor-pointer transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
        {/* Video or Image Display */}
        <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden group">
        {hasVideo ? (
          <>
            {/* Video */}
            <video
              src={construction.video}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload"
              poster={firstImage}
            />
            {/* Play overlay indicator */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none">
              <div className="bg-black/60 rounded-full p-3 group-hover:bg-black/80 transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </>
        ) : firstImage ? (
          /* Fallback to image */
          <Image
            src={firstImage}
            alt={construction.title || "Construction"}
            fill
            className="object-cover"
          />
        ) : (
          /* Empty state */
          <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-600">
            <span className="text-gray-400 dark:text-gray-500 text-sm">No media</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-28">
        {construction.title && (
          <h4 className="text-base font-bold dark:text-[#f5f5f5] line-clamp-2">{construction.title}</h4>
        )}
        {construction.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{construction.description}</p>
        )}
      </div>
      </div>
    </Link>
  );
}
