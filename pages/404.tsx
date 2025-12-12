// pages/404.tsx
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Page introuvable
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        La page que vous cherchez n’existe pas ou plus.
      </Typography>

      <Button component={Link} href="/" variant="contained" color="primary">
        Retour à l’accueil
      </Button>
    </Box>
  );
}
