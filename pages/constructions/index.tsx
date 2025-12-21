import { GetStaticProps } from "next";
import { getAllConstructionTypes, type ConstructionType } from "@/lib/construction-types";
import ConstructionTypeCard from "@/components/ConstructionTypeCard";

type Props = {
  constructionTypes: ConstructionType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const constructionTypes = getAllConstructionTypes();
  return { props: { constructionTypes } };
};

export default function ConstructionsPage({ constructionTypes }: Props) {
  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h1 className="text-4xl font-bold">All Construction Types</h1>
        <p className="text-gray-600">Explore all categories of Plus-Plus® builds</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {constructionTypes.map((type) => (
          <ConstructionTypeCard key={type.slug} type={type} />
        ))}
      </div>
    </div>
  );
}
