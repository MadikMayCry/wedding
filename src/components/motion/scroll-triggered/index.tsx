"use client";

import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { Box, Flex, BoxProps } from "@chakra-ui/react";
import Image from "next/image";

const gradients: string[] = [
  "linear-gradient(306deg, #fdf2f8, #fce7f3)",
  "linear-gradient(306deg, #fef7ee, #fdf4f1)",
  "linear-gradient(306deg, #fdf4ff, #f0f9ff)",
  "linear-gradient(306deg, #f0fdf4, #f0f9ff)",
  "linear-gradient(306deg, #fefce8, #fef3c7)",
  "linear-gradient(306deg, #fdf2f8, #f0f9ff)",
  "linear-gradient(306deg, #fef7ee, #fdf4ff)",
  "linear-gradient(306deg, #f0fdf4, #fdf2f8)",
];

const imageFilterStyle: React.CSSProperties = {
  filter: "saturate(0.9) brightness(1.08) contrast(0.92)",
};

const photos = [
  {
    src: "/11zon_compressed/455303D9-4AFE-47B9-A399-60C502215EB1_2_11zon.jpg",
    alt: "photo 2",
  },
  { src: "/11zon_compressed/IMG_3074_6_11zon.jpg", alt: "photo 5" },
  { src: "/11zon_compressed/IMG_3682_12_11zon.jpg", alt: "photo 10" },
];

export default function ScrollTriggered() {
  return (
    <Container overflow="hidden">
      {photos.map((photo, i) => (
        <Card i={i} photo={photo} key={photo.src} />
      ))}
    </Container>
  );
}

interface CardProps {
  photo: { src: string; alt: string };
  i: number;
}

function Card({ photo, i }: CardProps) {
  const background = gradients[i % gradients.length];

  const directions = [
    { x: -100, y: 0, rotate: -6 },
    { x: 100, y: 0, rotate: 6 },
    { x: -80, y: 120, rotate: -3 },
    { x: 80, y: -120, rotate: 3 },
  ];
  const dir = directions[i % directions.length];
  const settleRotate = dir.rotate * 0.6;

  return (
    <motion.div
      initial={{ ...dir, opacity: 0, filter: "blur(8px)" }}
      whileInView={{
        x: 0,
        y: 0,
        rotate: settleRotate,
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{ amount: 0 }}
      transition={{ type: "spring", bounce: 0.35, duration: 0.9 }}
    >
      <Flex
        overflow="hidden"
        justify="center"
        align="center"
        position="relative"
        pt={5}
        mb="-120px"
      >
        <Box
          inset={0}
          position="absolute"
          css={{
            background,
            clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
          }}
        />

        <motion.div
          whileHover={{ scale: 1.03, rotate: settleRotate * 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Box
            borderRadius="xl"
            shadow="xl"
            boxSize={"full"}
            height={"425px"}
            position={"relative"}
            overflow="hidden"
            border="2px solid"
            borderColor="pink.100"
            transition="all 0.3s"
            minW="70vw"
            _hover={{
              borderColor: "pink.200",
              shadow: "2xl",
            }}
          >
            <motion.div
              style={{ position: "absolute", inset: 0 }}
              animate={{ scale: [1, 1.05, 1], x: [0, -10, 0], y: [0, -6, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <Image
                quality={25}
                src={photo.src}
                alt={photo.alt}
                fill
                objectFit="cover"
                style={imageFilterStyle}
              />
            </motion.div>

            {/* Нежный оверлей */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-br, pink.50, transparent)"
              opacity={0.3}
              pointerEvents="none"
            />

            {/* Цветочный декоративный элемент */}
            <Box
              position="absolute"
              top="20px"
              right="20px"
              w="40px"
              h="40px"
              opacity={0.7}
              transform="rotate(15deg)"
            >
              <svg viewBox="0 0 100 100" fill="currentColor" color="pink.300">
                <path d="M50 20c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15zm0 25c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z" />
              </svg>
            </Box>

            <Box
              position="absolute"
              inset={0}
              borderRadius="xl"
              boxShadow="inset 0 0 0 1px rgba(236,72,153,0.1)"
              pointerEvents="none"
            />
          </Box>
        </motion.div>
      </Flex>
    </motion.div>
  );
}

export function Container({
  children,
  ...props
}: { children: React.ReactNode } & BoxProps) {
  return (
    <Box m="0 auto" w="full" mb={"80px"} {...props}>
      {children}
    </Box>
  );
}
