import { Provider } from "@/shared/ui/provider";
import { Box } from "@chakra-ui/react";
import { Inter, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

// @ts-ignore
const saintAmour = localFont({
  src: "./fonts/FontsFree-Net-saint-amour-regular.ttf",
  variable: "--font-saint-amour",
  display: "swap",
});

// @ts-ignore
const miama = localFont({
  src: "./fonts/miama.otf",
  variable: "--font-miama",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${saintAmour.variable} ${miama.variable} ${cormorant.variable} ${cormorant.className}`}
      >
        <Provider>
          <Box as="main" minH="100vh" fontFamily={"cormorant"}>
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
