"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";

export default function TestSection() {
  return (
    <Box
      position="relative"
      minH="50vh"
      w="full"
      bg="linear-gradient(to bottom, #FDF2F8, #FAF5FF, #EFF6FF)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap={8} textAlign="center" px={8}>
        <Text
          fontSize="6xl"
          fontWeight="bold"
          bg="linear-gradient(to right, #EC4899, #8B5CF6, #3B82F6)"
          bgClip="text"
        >
          Тест Градиентов
        </Text>
        
        <HStack gap={6}>
          <Box
            w="200px"
            h="100px"
            bg="linear-gradient(to right, #EC4899, #8B5CF6)"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
          >
            Градиент 1
          </Box>
          
          <Box
            w="200px"
            h="100px"
            bg="radial-gradient(circle, #8B5CF6, #3B82F6)"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
          >
            Градиент 2
          </Box>
          
          <Box
            w="200px"
            h="100px"
            bg="linear-gradient(135deg, #3B82F6, #EC4899)"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontWeight="bold"
          >
            Градиент 3
          </Box>
        </HStack>
        
        <Text fontSize="xl" color="gray.600">
          Если вы видите эту секцию с градиентами, значит все работает правильно!
        </Text>
      </VStack>
    </Box>
  );
}
