import { Container, Typography, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Armor Loisirs Nautiques
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          Balades, locations et services nautiques en baie de Saint-Brieuc
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Ceci est une première version de travail du site. Le contenu est
          encore statique et sera prochainement rendu éditable via un CMS.
        </Typography>
      </Box>
    </Container>
  );
}
