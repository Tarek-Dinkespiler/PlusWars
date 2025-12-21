import { GetStaticProps } from "next";
import { Container, Typography, Box, Button } from "@mui/material";
import { loadHomePageContent, HomePageContent } from "../lib/homepage";
import { getAllMediaItems, type MediaItem } from "../lib/media";
import Image from "next/image";
import Link from "next/link";

type HomePageProps = {
  homepage: HomePageContent;
  mediaItems: MediaItem[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const homepage = loadHomePageContent();
  const mediaItems = getAllMediaItems();

  return { props: { homepage, mediaItems } };
};

export default function HomePage({ homepage, mediaItems }: HomePageProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {homepage.title}
        </Typography>

        {homepage.subtitle && (
          <Typography variant="h5" component="h2" gutterBottom>
            {homepage.subtitle}
          </Typography>
        )}

        {homepage.content && (
          <Typography variant="body1" sx={{ mt: 2, whiteSpace: "pre-line" }}>
            {homepage.content}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h5">Galerie</Typography>

          <Button component={Link} href="/galerie" color="primary">
            Voir plus
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {mediaItems.slice(0, 12).map((it) => (
            <Box
              key={it.slug}
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {it.type === "video" ? (
                <video
                  src={it.src}
                  muted
                  playsInline
                  autoPlay
                  loop
                  preload="metadata"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      </Box>
    </Container>
  );
}
