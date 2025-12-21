import type { GetStaticProps } from "next";
import * as React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import GalleryLightbox from "@/components/GalleryLightbox";
import { getAllMediaItems, type MediaItem } from "@/lib/media";

type Props = {
  items: MediaItem[];
};

export default function GaleriePage({ items }: Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const onPrev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + items.length - 1) % items.length);
  };

  const onNext = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % items.length);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Galerie
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        {items.map((it, idx) => (
          <Box
            key={it.slug}
            role="button"
            tabIndex={0}
            onClick={() => setOpenIndex(idx)}
            onKeyDown={(e) => e.key === "Enter" && setOpenIndex(idx)}
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              cursor: "pointer",
            }}
          >
            {it.type === "video" ? (
              <video
                src={it.src}
                muted
                playsInline
                preload="metadata"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Image
                src={it.src}
                alt={it.alt ?? "Photo"}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>
        ))}
      </Box>

      <GalleryLightbox
        items={items}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={onPrev}
        onNext={onNext}
      />
    </Box>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      items: getAllMediaItems(),
    },
  };
};
