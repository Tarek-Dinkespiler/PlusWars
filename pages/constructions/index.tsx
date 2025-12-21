import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAllConstructionTypes, type ConstructionType } from "@/lib/construction-types";
import ConstructionTypeCard from "@/components/ConstructionTypeCard";
import nextI18NextConfig from "@/next-i18next.config";

type Props = {
  constructionTypes: ConstructionType[];
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale = 'en' }) => {
  const constructionTypes = getAllConstructionTypes(locale);
  return {
    props: {
      constructionTypes,
      ...(await serverSideTranslations(locale, ['common', 'constructions'], nextI18NextConfig)),
    },
  };
};

export default function ConstructionsPage({ constructionTypes }: Props) {
  const { t } = useTranslation(['common', 'constructions']);

  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-4xl font-bold dark:text-[#f5f5f5]">{t('constructions:allConstructions')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('constructions:browseCategories')}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {constructionTypes.map((type) => (
          <ConstructionTypeCard key={type.slug} type={type} />
        ))}
      </div>
    </div>
  );
}
