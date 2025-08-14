import { Box, Container, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { CTA } from "@/widgets/hero-section/ui/CTA";

export default function HeroWedding() {
  return (
    <Box
      position="relative"
      minH="100vh"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      overflow="hidden"
      fontFamily={"miama"}
      transition={"all ease-in"}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        asChild
      >
        <Image
          src="https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Затемнение для лучшей читаемости текста */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg={"rgb(27 20 13 / 30%)"}
      />

      {/* Основной контент */}
      <Container maxW="full" zIndex={10} position="relative">
        <VStack gap={12} py={20}>
          {/* Заголовок с именами */}
          <VStack gap={6}>
            <Box
              color="white"
              fontSize={"114px"}
              lineHeight={"100%"}
              textShadow="0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(255,255,255,0.3)"
              fontFamily={"saintAmour"}
            >
              <Text>Мадияр</Text>
              <Text>Мафтуна</Text>
            </Box>
          </VStack>

          {/* Дата и место */}
          <VStack gap={2} maxW="2xl">
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              color="white"
              fontWeight="medium"
              textShadow="0 2px 10px rgba(0,0,0,0.8)"
            >
              13.09.2025 17:00
            </Text>

            <Text
              fontSize={{ base: "xl", md: "xl" }}
              color="white"
              textShadow="0 2px 10px rgba(0,0,0,0.8)"
            >
              Ресторан "Сары Арка", Семей
            </Text>
          </VStack>
          <CTA />
        </VStack>
      </Container>
    </Box>
  );
}
