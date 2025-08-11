"use client";

import * as motion from "motion/react-client";
import { Box, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaHeart, FaStar, FaGem, FaCrown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import React from "react";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  icon: React.ReactElement;
  color: string;
}

const floatingElements: FloatingElement[] = [
  {
    id: 1,
    x: 20,
    y: 30,
    rotation: 45,
    scale: 0.8,
    delay: 0,
    icon: <FaHeart />,
    color: "#FF69B4",
  },
  {
    id: 2,
    x: 80,
    y: 20,
    rotation: -30,
    scale: 1.2,
    delay: 0.5,
    icon: <FaStar />,
    color: "#FFD700",
  },
  {
    id: 3,
    x: 15,
    y: 70,
    rotation: 60,
    scale: 0.6,
    delay: 1,
    icon: <FaGem />,
    color: "#00CED1",
  },
  {
    id: 4,
    x: 85,
    y: 80,
    rotation: -45,
    scale: 0.9,
    delay: 1.5,
    icon: <FaCrown />,
    color: "#FF1493",
  },
  {
    id: 5,
    x: 50,
    y: 15,
    rotation: 15,
    scale: 1.1,
    delay: 2,
    icon: <FaGem />,
    color: "#FFA500",
  },
  {
    id: 6,
    x: 70,
    y: 60,
    rotation: 90,
    scale: 0.7,
    delay: 2.5,
    icon: <FaHeart />,
    color: "#FFB6C1",
  },
  {
    id: 7,
    x: 25,
    y: 85,
    rotation: -60,
    scale: 0.9,
    delay: 3,
    icon: <FaStar />,
    color: "#FFA500",
  },
];

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={containerRef}
      position="relative"
      minH="120vh"
      w="full"
      overflow="hidden"
    >
      {/* Слой 1: Основное фоновое изображение (самый медленный параллакс) */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Слой 2: Затемнение для лучшей читаемости текста */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Слой 3: Дополнительное изображение для глубины (средний параллакс) */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          transform: `translateY(${scrollY * 0.25}px) scale(1.1)`,
        }}
      />

      {/* Слой 4: Текстура с паттерном (быстрый параллакс) */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="repeating-radial-gradient(circle at 20% 80%, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px), repeating-radial-gradient(circle at 80% 20%, transparent 0, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 30px)"
        opacity={0.3}
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Слой 5: Большие декоративные круги (средний параллакс) */}
      <Box position="absolute" top="0" left="0" w="full" h="full">
        <MotionBox
          position="absolute"
          top="10%"
          left="10%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(255, 182, 193, 0.2), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.15}px)`,
          }}
        />
        <MotionBox
          position="absolute"
          top="50%"
          right="15%"
          w="500px"
          h="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(135, 206, 250, 0.15), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.25}px) translateX(${scrollY * -0.2}px)`,
          }}
        />
        <MotionBox
          position="absolute"
          bottom="20%"
          left="20%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(221, 160, 221, 0.2), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.4}px) translateX(${scrollY * 0.25}px)`,
          }}
        />
      </Box>

      {/* Слой 6: Средние элементы (быстрый параллакс) */}
      <Box position="absolute" top="0" left="0" w="full" h="full">
        <MotionBox
          position="absolute"
          top="30%"
          left="60%"
          w="200px"
          h="200px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(255, 215, 0, 0.15), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.5}px) translateX(${scrollY * 0.3}px)`,
          }}
        />
        <MotionBox
          position="absolute"
          top="70%"
          right="25%"
          w="250px"
          h="250px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(255, 105, 180, 0.15), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.35}px) translateX(${scrollY * -0.25}px)`,
          }}
        />
      </Box>

      {/* Слой 7: Мелкие элементы (самый быстрый параллакс) */}
      <Box position="absolute" top="0" left="0" w="full" h="full">
        <MotionBox
          position="absolute"
          top="15%"
          right="40%"
          w="100px"
          h="100px"
          bg="linear-gradient(45deg, rgba(255, 182, 193, 0.3), rgba(221, 160, 221, 0.3))"
          borderRadius="20px"
          style={{
            transform: `translateY(${scrollY * 0.6}px) rotate(${scrollY * 0.02}deg)`,
          }}
        />
        <MotionBox
          position="absolute"
          top="80%"
          left="40%"
          w="80px"
          h="80px"
          bg="linear-gradient(-45deg, rgba(135, 206, 250, 0.3), rgba(255, 215, 0, 0.3))"
          borderRadius="50%"
          style={{
            transform: `translateY(${scrollY * 0.7}px) rotate(${scrollY * -0.01}deg)`,
          }}
        />
      </Box>

      {/* Плавающие элементы с параллаксом */}
      {floatingElements.map((element) => (
        <MotionBox
          key={element.id}
          position="absolute"
          left={`${element.x}%`}
          top={`${element.y}%`}
          fontSize={`${element.scale * 20}px`}
          color={element.color}
          filter="drop-shadow(0 0 10px rgba(255,255,255,0.3))"
          style={{
            transform: `translateY(${scrollY * (0.8 + element.id * 0.1)}px) rotate(${element.rotation}deg) scale(${element.scale})`,
          }}
          initial={{ opacity: 0, y: 50, scale: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: element.scale,
            rotate: [element.rotation, element.rotation + 360]
          }}
          transition={{ 
            delay: element.delay, 
            duration: 2,
            rotate: {
              duration: 8 + element.id,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {element.icon}
        </MotionBox>
      ))}

      {/* Основной контент с параллаксом */}
      <Box
        position="relative"
        zIndex={10}
        h="full"
        display="flex"
        alignItems="center"
      >
        <VStack gap={12} w="full" textAlign="center" px={8}>
          {/* Заголовок с параллаксом */}
          <MotionText
            fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
            fontWeight="black"
            color="white"
            textShadow="0 0 30px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.3)"
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            Магия Любви
          </MotionText>

          {/* Подзаголовок с параллаксом */}
          <MotionText
            fontSize={{ base: "xl", md: "2xl" }}
            color="white"
            maxW="3xl"
            textShadow="0 2px 10px rgba(0,0,0,0.5)"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            Каждый момент нашей истории - это новая страница в книге любви, где
            каждая глава наполнена счастьем, радостью и бесконечной нежностью
          </MotionText>

          {/* Карточки с параллаксом */}
          <HStack
            gap={8}
            flexWrap="wrap"
            justify="center"
            w="full"
            maxW="6xl"
          >
            {[
              { title: "Время", value: "13.09.2025", color: "#FF69B4", icon: <FaHeart /> },
              { title: "Место", value: "Сары Арка", color: "#8B5CF6", icon: <FaStar /> },
              { title: "Счастье", value: "Навсегда", color: "#3B82F6", icon: <FaCrown /> },
            ].map((card, index) => (
              <MotionBox
                key={card.title}
                bg="rgba(255, 255, 255, 0.15)"
                backdropFilter="blur(20px)"
                p={8}
                borderRadius="2xl"
                border="2px solid"
                borderColor="rgba(255, 255, 255, 0.3)"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.3)"
                initial={{ opacity: 0, y: 100, rotateY: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 35px 70px -12px rgba(0, 0, 0, 0.5)",
                  borderColor: "rgba(255, 255, 255, 0.6)",
                }}
                style={{
                  transform: `translateY(${scrollY * 0.2}px) rotateY(${scrollY * 0.01}deg)`,
                }}
              >
                <VStack gap={4}>
                  <Box
                    p={3}
                    borderRadius="full"
                    bg={`linear-gradient(135deg, ${card.color}, ${card.color}80)`}
                    boxShadow={`0 10px 30px ${card.color}40`}
                  >
                    <Icon as={card.icon.type} boxSize={6} color="white" />
                  </Box>
                  <VStack gap={2}>
                    <Text
                      fontSize="lg"
                      fontWeight="semibold"
                      color="white"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      {card.title}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="white">
                      {card.value}
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            ))}
          </HStack>

          {/* Декоративная линия с параллаксом */}
          <MotionBox
            w="300px"
            h="6px"
            bg="linear-gradient(to right, transparent, white, transparent)"
            borderRadius="full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
        </VStack>
      </Box>

      {/* Нижний переход с параллаксом */}
      <Box position="absolute" bottom="0" left="0" w="full" h="100px">
        <MotionBox
          position="absolute"
          bottom="0"
          left="0"
          w="full"
          h="100px"
          bg="linear-gradient(to top, rgba(255,255,255,0.1), transparent)"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
      </Box>
    </Box>
  );
}
