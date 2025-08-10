"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "../color-mode";
import { Toaster } from "../toaster";

export function Provider(props: ColorModeProviderProps) {
  const newTheme = createSystem(defaultConfig, {
    globalCss: {
      body: {
        display: "flex",
        flexDirection: "column",
      },

      ".ProseMirror": {
        "& h1, h2, h3, h4, h5, h6, em, i, code": {
          font: "revert",
          background: "revert",
        },
        "& blockquote": {
          borderLeft: "3px solid",
          borderColor: "border",
          paddingLeft: 4,
        },
        "& pre": {
          all: "revert",
          bg: "bg.inverted",
          color: "fg.inverted",
          padding: 2,
          borderRadius: "md",
        },
        "& ul, ol": {
          marginY: 2,
          padding: "revert",
          listStyle: "revert",
        },
        "& hr": { m: "revert" },
        "& li": {
          listStyle: "revert",
        },
        "&:focus": {
          outline: "none",
        },
      },
    },
  });

  return (
    // <EmotionCacheProvider>
    <ChakraProvider value={newTheme}>
      <ColorModeProvider {...props} />
      <Toaster />
    </ChakraProvider>
    // </EmotionCacheProvider>
  );
}
