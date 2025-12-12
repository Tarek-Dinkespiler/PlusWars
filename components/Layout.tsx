// components/Layout.tsx
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Divider,
} from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, flexGrow: 1 }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/aln.avif"
                alt="Armor Loisirs Nautiques"
                width={60}
                height={60}
                priority
              />
            </Link>
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/"
              color="inherit"
              sx={{
                color: isActive("/") ? "primary.main" : "inherit",
                fontWeight: isActive("/") ? 600 : 400,
              }}
            >
              Accueil
            </Button>

            <Button
              component={Link}
              href="/ventes"
              color="inherit"
              sx={{
                color: isActive("/ventes") ? "primary.main" : "inherit",
                fontWeight: isActive("/ventes") ? 600 : 400,
              }}
            >
              Ventes
            </Button>

            <Button variant="contained" color="error">
              Réserver
            </Button>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>

      <Container
        component="main"
        maxWidth="md"
        sx={{ flex: 1, py: { xs: 3, sm: 5 } }}
      >
        {children}
      </Container>

      <Box
        component="footer"
        sx={{ py: 3, bgcolor: "secondary.main", color: "white" }}
      >
        <Container maxWidth="md">
          <Typography variant="body2">
            © {year} Armor Loisirs Nautiques
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
