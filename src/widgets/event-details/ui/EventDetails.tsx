import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export const EventDetails = () => {
  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <VStack gap={12}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Детали События
          </Heading>

          <Flex direction={{ base: "column", md: "row" }} gap={8} w="full">
            <Box flex={1} bg="white" p={8} borderRadius="lg" shadow="md">
              <VStack gap={4} align="center">
                <Box asChild color={"red.300"}>
                  <FaCalendarAlt size={40} />
                </Box>
                <Heading as="h3" size="md" color="gray.800">
                  Дата и Время
                </Heading>
                <Text textAlign="center" color="gray.600">
                  13 сентября 2025 года
                  <br />
                  Начало в 17:00
                </Text>
              </VStack>
            </Box>

            <Box flex={1} bg="white" p={8} borderRadius="lg" shadow="md">
              <VStack gap={4} align="center">
                <Box asChild color={"red.300"}>
                  <FaMapMarkerAlt size={40} />
                </Box>
                <Heading as="h3" size="md" color="gray.800">
                  Место Проведения
                </Heading>
                <Text textAlign="center" color="gray.600">
                  Ресторан "Сары Арка"
                  <br />
                  Ул. Академика Павлова, 144, Семей
                </Text>
              </VStack>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};
