"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { , saintAmour } from "@/app/layout";

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
        bgImage={"url(/upl1425.png)"}
        inset={0}
        bgSize="auto"
        bgPos="center"
        bgRepeat="no-repeat"
      />

      {/* Основной контент */}
      <Container maxW="container.xl" zIndex={1}>
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
          <VStack gap={2} maxW="2xl">
            <Box px={4} py={2}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color="gray.700"
                fontWeight="medium"
              >
                13 сентября 2025 года
              </Text>
            </Box>

            <Box px={4} py={2}>
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600">
                Ресторан "Сары Арка", Семей
              </Text>
            </Box>
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

      {/* Нижний декоративный элемент */}
      <Box
        position="absolute"
        bottom="5%"
        right="15%"
        w="150px"
        h="150px"
        opacity={0.05}
        transform="rotate(15deg)"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" color="rose.200">
          <path d="M50 5c-15 0-27 12-27 27s12 27 27 27 27-12 27-27-12-27-27-27zm0 45c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18z" />
        </svg>
      </Box>
    </Box>
  );
}
