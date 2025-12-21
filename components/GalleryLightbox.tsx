import * as React from "react";
import Image from "next/image";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { MediaItem } from "@/lib/media";

type Props = {
  items: MediaItem[];
  openIndex: number | null; // null = fermé
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  items,
  openIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const item = openIndex === null ? null : items[openIndex];

  // Navigation clavier
  React.useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, onClose, onPrev, onNext]);

  return (
    <Dialog open={openIndex !== null} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ position: "relative", p: { xs: 1.5, sm: 2 } }}>
        {/* Bouton fermer */}
        <IconButton
          onClick={onClose}
          aria-label="Fermer"
          sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>

        {item && (
          <Box sx={{ display: "grid", gap: 2 }}>
            {/* Média */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                backgroundColor: "black",
              }}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt ?? "Photo"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              )}
            </Box>

            {/* Navigation + légende */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton onClick={onPrev} aria-label="Précédent">
                <NavigateBeforeIcon />
              </IconButton>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {item.caption ?? ""}
              </Typography>

              <IconButton onClick={onNext} aria-label="Suivant">
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
