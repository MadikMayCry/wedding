"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import ScrollTriggered from "@/components/motion/scroll-triggered";

const MotionBox = motion.create(Box);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2024-06-15T16:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box py={20} bg="pink.50">
      <Container maxW="container.xl">
        <ScrollTriggered />
        <VStack gap={12}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Обратный Отсчет
          </Heading>

          <HStack gap={8} flexWrap="wrap" justify="center">
            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <VStack
                gap={2}
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="md"
                minW="120px"
              >
                <Text fontSize="4xl" fontWeight="bold" color="pink.500">
                  {timeLeft.days}
                </Text>
                <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                  Дней
                </Text>
              </VStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <VStack
                gap={2}
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="md"
                minW="120px"
              >
                <Text fontSize="4xl" fontWeight="bold" color="pink.500">
                  {timeLeft.hours}
                </Text>
                <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                  Часов
                </Text>
              </VStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <VStack
                gap={2}
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="md"
                minW="120px"
              >
                <Text fontSize="4xl" fontWeight="bold" color="pink.500">
                  {timeLeft.minutes}
                </Text>
                <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                  Минут
                </Text>
              </VStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <VStack
                gap={2}
                bg="white"
                p={6}
                borderRadius="lg"
                shadow="md"
                minW="120px"
              >
                <Text fontSize="4xl" fontWeight="bold" color="pink.500">
                  {timeLeft.seconds}
                </Text>
                <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                  Секунд
                </Text>
              </VStack>
            </MotionBox>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
