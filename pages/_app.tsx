import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import theme from "../theme/theme";
import Script from "next/script";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="afterInteractive"
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
