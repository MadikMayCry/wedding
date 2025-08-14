"use client";
import { Button } from "@chakra-ui/react";

// CTA кнопки
export const CTA = () => {
  const scrollToRsvp = () => {
    document?.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      px={12}
      py={6}
      fontSize="lg"
      fontWeight="semibold"
      bgGradient="linear(to-r, pink.400, rose.400)"
      color="white"
      _hover={{
        bgGradient: "linear(to-r, pink.500, rose.500)",
        transform: "translateY(-2px)",
        shadow: "xl",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.3s"
      onClick={scrollToRsvp}
    >
      Заполнить форму
    </Button>
  );
};
