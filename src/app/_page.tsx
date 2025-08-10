"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import {
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { EnterAnimation } from "@/components/motion/enter";
import ScrollTriggered from "@/components/motion/scroll-triggered";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";

const MotionBox = motion.create(Box);

export default function Home() {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-b, pink.100, purple.100)"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.xl" textAlign="center">
          <EnterAnimation />
          <VStack gap={8}>
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <FaHeart size={60} color="#E53E3E" />
            </MotionBox>

            <VStack gap={4}>
              <Heading
                as="h1"
                size="2xl"
                color="gray.800"
                fontWeight="light"
                letterSpacing="wider"
              >
                Анна & Михаил
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Приглашаем вас на нашу свадьбу
              </Text>
              <Text fontSize="lg" color="gray.500">
                15 июня 2024 года
              </Text>
            </VStack>

            <Button
              colorScheme="pink"
              size="lg"
              rounded="full"
              px={8}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.3s"
            >
              Подтвердить присутствие
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <ScrollTriggered />
          <VStack gap={12}>
            <Heading as="h2" size="xl" textAlign="center" color="gray.800">
              Наша История
            </Heading>

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={8}
              align="center"
            >
              <Box flex={1}>
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Couple"
                  borderRadius="lg"
                  shadow="xl"
                />
              </Box>

              <VStack flex={1} gap={6} align="start">
                <Text fontSize="lg" lineHeight="tall" color="gray.600">
                  Мы познакомились в прекрасный летний день в парке. С первого
                  взгляда мы поняли, что нашли друг друга. Наши сердца бились в
                  унисон, и с тех пор мы не расставались.
                </Text>

                <Text fontSize="lg" lineHeight="tall" color="gray.600">
                  После трех лет счастливых отношений, Михаил сделал мне
                  предложение на закате у моря. Это был самый романтичный момент
                  в моей жизни.
                </Text>

                <Text fontSize="lg" lineHeight="tall" color="gray.600">
                  Теперь мы хотим разделить нашу радость с вами и приглашаем
                  всех на нашу свадьбу!
                </Text>
              </VStack>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Event Details */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <ScrollTriggered />
          <VStack gap={12}>
            <Heading as="h2" size="xl" textAlign="center" color="gray.800">
              Детали События
            </Heading>

            <Flex direction={{ base: "column", md: "row" }} gap={8} w="full">
              <Box flex={1} bg="white" p={8} borderRadius="lg" shadow="md">
                <VStack gap={4} align="center">
                  <FaCalendarAlt size={40} color="#E53E3E" />
                  <Heading as="h3" size="md" color="gray.800">
                    Дата и Время
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    15 июня 2024 года
                    <br />
                    Начало в 16:00
                  </Text>
                </VStack>
              </Box>

              <Box flex={1} bg="white" p={8} borderRadius="lg" shadow="md">
                <VStack gap={4} align="center">
                  <FaMapMarkerAlt size={40} color="#E53E3E" />
                  <Heading as="h3" size="md" color="gray.800">
                    Место Проведения
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Ресторан "Времена года"
                    <br />
                    ул. Пушкина, 10, Москва
                  </Text>
                </VStack>
              </Box>

              <Box flex={1} bg="white" p={8} borderRadius="lg" shadow="md">
                <VStack gap={4} align="center">
                  <FaHeart size={40} color="#E53E3E" />
                  <Heading as="h3" size="md" color="gray.800">
                    Дресс-код
                  </Heading>
                  <Text textAlign="center" color="gray.600">
                    Вечерний наряд
                    <br />
                    Цвета: розовый, белый, золотой
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </VStack>
        </Container>
      </Box>

      {/* Countdown Section */}
      <Countdown />

      {/* Gallery Section */}
      <Gallery />

      {/* RSVP Section */}
      {/*<RSVPForm />*/}

      {/* Contact Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <ScrollTriggered />
          <VStack gap={8}>
            <Heading as="h2" size="xl" textAlign="center" color="gray.800">
              Контакты
            </Heading>

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={8}
              w="full"
              justify="center"
            >
              <VStack gap={4} align="center">
                <FaPhone size={24} color="#E53E3E" />
                <Text fontWeight="bold" color="gray.800">
                  Анна
                </Text>
                <Text color="gray.600">+7 (999) 123-45-67</Text>
              </VStack>

              <VStack gap={4} align="center">
                <FaEnvelope size={24} color="#E53E3E" />
                <Text fontWeight="bold" color="gray.800">
                  Email
                </Text>
                <Text color="gray.600">anna.mikhail@wedding.ru</Text>
              </VStack>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
