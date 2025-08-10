"use client";

import { RsvpForm } from "@/features/rsvp-form/ui/RsvpForm";
import React from "react";
import ScrollTriggered from "@/components/motion/scroll-triggered";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Countdown from "@/components/Countdown";
import HeroWedding from "@/components/HeroWedding";

export default function Home() {
  return (
    <Box>
      <HeroWedding />
      {/* Our Story Section */}
      {/*<Box py={12} bg="white">*/}
      {/*  <Container maxW="container.xl">*/}
      {/*    <VStack gap={12}>*/}
      {/*      <Heading as="h2" size="xl" textAlign="center" color="gray.800">*/}
      {/*        Наша История*/}
      {/*      </Heading>*/}

      {/*      <Flex*/}
      {/*        direction={{ base: "column", md: "row" }}*/}
      {/*        gap={8}*/}
      {/*        align="center"*/}
      {/*      >*/}
      {/*        <Box flex={1}>*/}
      {/*          <Image*/}
      {/*            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"*/}
      {/*            alt="Couple"*/}
      {/*            borderRadius="lg"*/}
      {/*            shadow="xl"*/}
      {/*          />*/}
      {/*        </Box>*/}

      {/*        <VStack flex={1} gap={6} align="start">*/}
      {/*          <Text fontSize="lg" lineHeight="tall" color="gray.600">*/}
      {/*            Мы познакомились в прекрасный летний день в парке. С первого*/}
      {/*            взгляда мы поняли, что нашли друг друга. Наши сердца бились в*/}
      {/*            унисон, и с тех пор мы не расставались.*/}
      {/*          </Text>*/}

      {/*          <Text fontSize="lg" lineHeight="tall" color="gray.600">*/}
      {/*            После трех лет счастливых отношений, Михаил сделал мне*/}
      {/*            предложение на закате у моря. Это был самый романтичный момент*/}
      {/*            в моей жизни.*/}
      {/*          </Text>*/}

      {/*          <Text fontSize="lg" lineHeight="tall" color="gray.600">*/}
      {/*            Теперь мы хотим разделить нашу радость с вами и приглашаем*/}
      {/*            всех на нашу свадьбу!*/}
      {/*          </Text>*/}
      {/*        </VStack>*/}
      {/*      </Flex>*/}
      {/*    </VStack>*/}
      {/*  </Container>*/}
      {/*</Box>*/}
      <ScrollTriggered />
      {/* Event Details */}
      <Box py={12}>
        <Container maxW="container.xl">
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
                    13 сентября 2025 года
                    <br />
                    Начало в 17:00
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
      {/* Countdown Section */}
      <Countdown />
      {/* Gallery Section */}
      {/*<Gallery />*/}
      <RsvpForm />
    </Box>
  );
}
