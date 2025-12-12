import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";

type LayoutProps = { children: React.ReactNode };

const BOOKING_URL =
  "https://booking.myrezapp.com/fr/online/booking/minisite/18653/armor-loisirs-nautiques";

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  const year = new Date().getFullYear();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            minHeight: 72,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{ justifySelf: "start", display: "flex", alignItems: "center" }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
              aria-label="Aller à l’accueil"
            >
              <Image
                src="/aln.avif"
                alt="Armor Loisirs Nautiques"
                width={60}
                height={60}
                priority
              />
            </Link>
          </Box>

          <Box
            sx={{
              justifySelf: "center",
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
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
              href="/services"
              color="inherit"
              sx={{
                color: isActive("/services") ? "primary.main" : "inherit",
                fontWeight: isActive("/services") ? 600 : 400,
              }}
            >
              Services
            </Button>

            <Button
              component={Link}
              href="/occasions-bateau"
              color="inherit"
              sx={{
                color: isActive("/occasions-bateau")
                  ? "primary.main"
                  : "inherit",
                fontWeight: isActive("/occasions-bateau") ? 600 : 400,
              }}
            >
              Occasions bateau
            </Button>

            <Button
              component={Link}
              href="/contact"
              color="inherit"
              sx={{
                color: isActive("/contact") ? "primary.main" : "inherit",
                fontWeight: isActive("/contact") ? 600 : 400,
              }}
            >
              Contact
            </Button>
          </Box>

          <Box
            sx={{ justifySelf: "end", display: "flex", alignItems: "center" }}
          >
            <Button
              component="a"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="error"
            >
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

      <Box component="footer" sx={{ py: 3 }}>
        <Divider />
        <Container maxWidth="md" sx={{ pt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {year} Armor Loisirs Nautiques
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
