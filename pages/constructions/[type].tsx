import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllConstructionTypes, getConstructionType } from "@/lib/construction-types";
import { getConstructionsByType } from "@/lib/constructions";
import ConstructionCard from "@/components/ConstructionCard";
import nextI18NextConfig from "@/next-i18next.config";

type Props = {
  type: ReturnType<typeof getConstructionType>;
  constructions: ReturnType<typeof getConstructionsByType>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const types = getAllConstructionTypes();
  const locales = ['en', 'fr'];

  const paths = locales.flatMap((locale) =>
    types.map((type) => ({
      params: { type: type.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale = 'en' }) => {
  const typeSlug = params?.type as string;
  const type = getConstructionType(typeSlug, locale);

  if (!type) {
    return { notFound: true };
  }

  const constructions = getConstructionsByType(type.name, locale);

  return {
    props: {
      type,
      constructions,
      ...(await serverSideTranslations(locale, ['common', 'constructions'], nextI18NextConfig)),
    },
  };
};

export default function ConstructionTypePage({ type, constructions }: Props) {
  const { t } = useTranslation(['common', 'constructions']);

  if (!type) return null;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        {type.image && (
          <div className="neo-window overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src={type.image}
                alt={type.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold dark:text-[#f5f5f5]">{type.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{type.description}</p>
      </section>

      {/* Constructions Grid */}
      {constructions.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold dark:text-[#f5f5f5]">
            Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructions.map((construction) => (
              <ConstructionCard
                key={construction.slug}
                construction={construction}
                typeSlug={type.slug}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No constructions in this category yet.</p>
        </section>
      )}
    </div>
  );
}
