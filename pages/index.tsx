import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loadHomePageContent, type HomePageContent } from "@/lib/homepage";
import { getAllConstructionTypes, type ConstructionType } from "@/lib/construction-types";
import ConstructionTypeCard from "@/components/ConstructionTypeCard";
import nextI18NextConfig from "@/next-i18next.config";

type HomePageProps = {
  homepage: HomePageContent;
  constructionTypes: ConstructionType[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale = 'en' }) => {
  const homepage = loadHomePageContent(locale);
  const constructionTypes = getAllConstructionTypes(locale);

  return {
    props: {
      homepage,
      constructionTypes,
      ...(await serverSideTranslations(locale, ['common', 'home'], nextI18NextConfig)),
    },
  };
};

export default function HomePage({ homepage, constructionTypes }: HomePageProps) {
  const { t } = useTranslation(['common', 'home']);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold">{homepage.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{homepage.subtitle}</p>
        <p className="text-lg leading-relaxed max-w-2xl dark:text-gray-300">{homepage.story}</p>
      </section>

      {/* Construction Types Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold dark:text-[#f5f5f5]">{t('home:constructionTypes')}</h2>
          <Link href="/constructions" className="neo-btn-secondary text-sm dark:text-[#f5f5f5]">
            {t('common:viewMore')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {constructionTypes.map((type) => (
            <ConstructionTypeCard key={type.slug} type={type} />
          ))}
        </div>
      </section>
    </div>
  );
}
