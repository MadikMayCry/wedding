import { Provider } from "@/components/ui/provider/provider";
import { Box } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// @ts-ignore
const saintAmour = localFont({
  src: "./fonts/FontsFree-Net-saint-amour-regular.ttf",
  variable: "--font-saint-amour",
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
        className={`${inter.variable} ${inter.className} ${saintAmour.variable}`}
      >
        <Provider>
          <Box as="main" minH="100vh">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
