"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { motion } from "motion/react";

const MotionBox = motion.create(Box);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

const digits = Array.from({ length: 10 }, (_, i) => i);

function DigitColumn({ digit }: { digit: number }) {
  const ITEM_H = 56; // px per digit (smaller)
  return (
    <Box
      overflow="hidden"
      h={`${ITEM_H}px`}
      w="auto"
      pos="relative"
      bgGradient="linear(to-b, #whiteAlpha.200, #151922)"
    >
      <MotionBox
        initial={{ y: (-digit - 1) * ITEM_H }}
        animate={{ y: -digit * ITEM_H }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {digits.map((d) => (
          <Flex key={d} h={`${ITEM_H}px`} align="center" justify="center">
            <Text fontSize="4xl" color="red.300">
              {d}
            </Text>
          </Flex>
        ))}
      </MotionBox>
    </Box>
  );
}

function RollingNumber({ value }: { value: number }) {
  const str = pad2(value);
  return (
    <HStack gap={2}>
      {Array.from(str).map((ch, idx) => (
        <Box key={`${idx}-${ch}`}>
          {/[0-9]/.test(ch) ? (
            <DigitColumn digit={Number(ch)} />
          ) : (
            <Text fontSize="4xl" color="white">
              {ch}
            </Text>
          )}
        </Box>
      ))}
    </HStack>
  );
}

function CounterCard({ value, label }: { value: number; label: string }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <VStack gap={1} p={3} minW="56px" borderRadius="lg" bg="gray.50">
        <RollingNumber value={value} />
        <Text fontSize="xs" textTransform="uppercase" letterSpacing="wide">
          {label}
        </Text>
      </VStack>
    </MotionBox>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date("2025-09-13T17:00:00").getTime();

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
    <Box py={12}>
      <Container maxW="container.xl">
        <VStack gap={12}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Обратный Отсчет
          </Heading>

          <HStack gap={3} flexWrap="nowrap" justify="center" w="full">
            <CounterCard value={timeLeft.days} label="Дней" />
            <CounterCard value={timeLeft.hours} label="Часов" />
            <CounterCard value={timeLeft.minutes} label="Минут" />
            <CounterCard value={timeLeft.seconds} label="Секунд" />
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
