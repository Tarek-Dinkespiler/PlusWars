// pages/index.tsx
import { GetStaticProps } from "next";
import { Container, Typography, Box } from "@mui/material";
import { loadHomePageContent, HomePageContent } from "../lib/homepage";

type HomePageProps = {
  homepage: HomePageContent;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const homepage = loadHomePageContent();

  return {
    props: {
      homepage,
    },
  };
};

export default function HomePage({ homepage }: HomePageProps) {
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
    </Container>
  );
}
