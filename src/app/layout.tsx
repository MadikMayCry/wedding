import { Provider } from "@/components/ui/provider/provider";
import { Box } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className}`}>
        <Provider>
          <Box as="main" minH="100vh">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
