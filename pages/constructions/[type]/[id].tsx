import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllConstructionTypes, getConstructionType } from "@/lib/construction-types";
import { getAllConstructions, getConstruction, getConstructionsByType } from "@/lib/constructions";
import nextI18NextConfig from "@/next-i18next.config";

type Props = {
  construction: any | null;
  constructionType: any | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const types = getAllConstructionTypes();
  const locales = ['en', 'fr'];

  const paths = locales.flatMap((locale) =>
    types.flatMap((type) => {
      const constructions = getAllConstructions(locale);
      const typeConstructions = constructions.filter((c) => c.type === type.name);
      return typeConstructions.map((construction) => ({
        params: { type: type.slug, id: construction.slug },
        locale,
      }));
    })
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale = 'en' }) => {
  const typeSlug = params?.type as string;
  const constructionSlug = params?.id as string;

  const type = getConstructionType(typeSlug, locale);
  if (!type) {
    return { notFound: true };
  }

  const construction = getConstruction(constructionSlug, locale);
  if (!construction || construction.type !== type.name) {
    return { notFound: true };
  }

  return {
    props: {
      construction,
      constructionType: type,
      ...(await serverSideTranslations(locale, ['common', 'constructions'], nextI18NextConfig)),
    },
  };
};

export default function ConstructionDetailPage({ construction, constructionType }: Props) {
  const { t } = useTranslation(['common', 'constructions']);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!construction || !constructionType) return null;

  const title = construction.title || construction.slug;
  const allImages = [construction.images[0], ...construction.images.slice(1)];

  const handlePrevImage = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-8">
      <nav className="text-sm text-gray-600 dark:text-gray-400">
        <Link href="/constructions" className="hover:underline">
          {t('constructions')}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/constructions/${constructionType.slug}`} className="hover:underline">
          {constructionType.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-black dark:text-[#f5f5f5]">{title}</span>
      </nav>

      <div className="space-y-4">
        {construction.video ? (
          <div className="neo-window overflow-hidden">
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-700">
              <video
                src={construction.video}
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload"
                poster={construction.images[0]}
              />
            </div>
          </div>
        ) : construction.images[0] ? (
          <div className="neo-window overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src={construction.images[0]}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}

        <div>
          <h1 className="text-4xl font-bold dark:text-[#f5f5f5]">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {t('constructions')}: {constructionType.name}
          </p>
        </div>
      </div>

      {construction.description && (
        <section className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {construction.description}
          </p>
        </section>
      )}

      {construction.images.length > 1 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold dark:text-[#f5f5f5]">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {construction.images.slice(1).map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setLightboxIndex(index + 1)}
                className="neo-window overflow-hidden cursor-pointer group transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={image}
                    alt={`${title} ${index + 2}`}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:bg-white/20 p-2 rounded transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={handlePrevImage}
            className="absolute left-4 text-white hover:bg-white/20 p-3 rounded-full transition-colors"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl aspect-square">
            <Image
              src={allImages[lightboxIndex]}
              alt={`${title} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={handleNextImage}
            className="absolute right-4 text-white hover:bg-white/20 p-3 rounded-full transition-colors"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      <div className="pt-8 border-t-4 border-black dark:border-[#666]">
        <Link
          href={`/constructions/${constructionType.slug}`}
          className="text-sm font-bold dark:text-[#f5f5f5] hover:underline inline-flex items-center gap-2"
        >
          ← Back to {constructionType.name}
        </Link>
      </div>
    </div>
  );
}
