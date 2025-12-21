import { GetStaticProps } from "next";
import Link from "next/link";
import { loadHomePageContent, type HomePageContent } from "@/lib/homepage";
import { getAllConstructionTypes, type ConstructionType } from "@/lib/construction-types";
import ConstructionTypeCard from "@/components/ConstructionTypeCard";

type HomePageProps = {
  homepage: HomePageContent;
  constructionTypes: ConstructionType[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const homepage = loadHomePageContent();
  const constructionTypes = getAllConstructionTypes();

  return { props: { homepage, constructionTypes } };
};

export default function HomePage({ homepage, constructionTypes }: HomePageProps) {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold">{homepage.title}</h1>
        <p className="text-xl text-gray-600">{homepage.subtitle}</p>
        <p className="text-lg leading-relaxed max-w-2xl">{homepage.story}</p>
      </section>

      {/* Construction Types Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Construction Types</h2>
          <Link href="/constructions" className="neo-btn-secondary text-sm">
            View all →
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
