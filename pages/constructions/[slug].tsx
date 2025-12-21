import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getAllConstructionTypes, getConstructionType } from "@/lib/construction-types";
import { getConstructionsByType } from "@/lib/constructions";
import ConstructionCard from "@/components/ConstructionCard";

type Props = {
  type: ReturnType<typeof getConstructionType>;
  constructions: ReturnType<typeof getConstructionsByType>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const types = getAllConstructionTypes();
  return {
    paths: types.map((type) => ({
      params: { slug: type.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const type = getConstructionType(slug);

  if (!type) {
    return { notFound: true };
  }

  const constructions = getConstructionsByType(type.name);

  return {
    props: { type, constructions },
  };
};

export default function ConstructionTypePage({ type, constructions }: Props) {
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
        <h1 className="text-4xl font-bold">{type.name}</h1>
        <p className="text-xl text-gray-600">{type.description}</p>
      </section>

      {/* Constructions Grid */}
      {constructions.length > 0 ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">
            {constructions.length} {constructions.length === 1 ? "Construction" : "Constructions"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constructions.map((construction) => (
              <ConstructionCard
                key={construction.slug}
                construction={construction}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-12">
          <p className="text-gray-600">No constructions in this category yet.</p>
        </section>
      )}
    </div>
  );
}
