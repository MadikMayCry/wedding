"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  VStack,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import ScrollTriggered from "@/components/motion/scroll-triggered";

const MotionBox = motion.create(Box);

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Свадебная фотография 6",
  },
];

export default function Gallery() {
  return (
    <Box py={20} bg="white">
      <Container maxW="container.xl">
        <ScrollTriggered />
        <VStack gap={12}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Галерея
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="full">
            {photos.map((photo, index) => (
              <MotionBox
                key={photo.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  borderRadius="lg"
                  shadow="md"
                  w="full"
                  h="300px"
                  objectFit="cover"
                  _hover={{ transform: "scale(1.05)", shadow: "xl" }}
                  transition="all 0.3s"
                />
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
