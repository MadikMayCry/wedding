"use client";

import * as motion from "motion/react-client";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

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
    <Box m="0 auto" w="full" pb={"180px"} overflow={"hidden"}>
      {photos.map((photo, i) => (
        <Card i={i} photo={photo} key={photo.src} />
      ))}
    </Box>
  );
}

interface CardProps {
  photo: { src: string; alt: string };
  i: number;
}

function Card({ photo, i }: CardProps) {
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
      initial={{ ...dir, opacity: 0, filter: "blur(80px)" }}
      whileInView={{
        x: 0,
        y: 0,
        rotate: settleRotate,
        opacity: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true }}
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
            <Image
              quality={25}
              src={photo.src}
              alt={photo.alt}
              fill
              objectFit="cover"
              style={imageFilterStyle}
            />

            {/* Нежный оверлей */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-br, pink.50, transparent)"
              opacity={0.3}
              pointerEvents="none"
            />

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
