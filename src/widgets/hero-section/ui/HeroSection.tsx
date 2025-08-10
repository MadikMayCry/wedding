"use client";

import { Box, Button, Container, Text, VStack } from "@chakra-ui/react";

export default function HeroWedding() {
  const scrollToRsvp = () => {
    document?.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgGradient="linear(to-b, pink.50, white)"
      overflow="hidden"
    >
      <Box
        id={"cveto4nyi-fon"}
        position={"absolute"}
        inset={0}
        bgSize="auto"
        bgPos="center"
        bgRepeat="no-repeat"
      />

      {/* Основной контент */}
      <Container maxW="full" zIndex={1}>
        <VStack gap={12} py={20}>
          {/* Заголовок с именами */}
          <VStack gap={6}>
            <Box
              fontFamily={"saintAmour"}
              color="gray.800"
              fontSize={"114px"}
              lineHeight={"100%"}
            >
              <Text>Мадияр</Text>
              <Text>Мафтуна</Text>
            </Box>
          </VStack>

          {/* Дата и место */}
          <VStack gap={2} maxW="2xl" fontFamily={"fantasy"}>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              color="gray.700"
              fontWeight="medium"
            >
              13.09.2025 17:00
            </Text>

            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600">
              Ресторан "Сары Арка", Семей
            </Text>
          </VStack>

          {/* CTA кнопки */}
          <VStack gap={6} pt={8}>
            <Button
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
              Подтвердить присутствие
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
