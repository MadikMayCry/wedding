"use client";

import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { WeddingTable } from "../../../entities/wedding";
import { WeddingData } from "../../../entities/wedding/model/types";
import { supabase } from "../../../shared/lib/supabase";
import { useColorModeValue } from "@/shared";

export function DashboardWidget() {
  const [data, setData] = useState<WeddingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalGuests: 0,
    totalResponses: 0,
    averageGuests: 0,
  });

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: weddingData, error: fetchError } = await supabase
        .from("wedding")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setData(weddingData || []);

      // Вычисляем статистику
      const totalGuests =
        weddingData?.reduce(
          (sum: number, item: WeddingData) => sum + item.guests,
          0,
        ) || 0;
      const totalResponses = weddingData?.length || 0;
      const averageGuests =
        totalResponses > 0 ? Math.round(totalGuests / totalResponses) : 0;

      setStats({
        totalGuests,
        totalResponses,
        averageGuests,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Ошибка при загрузке данных");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Container maxW="full" px={4} py={4}>
        <Box
          bg="red.50"
          border="1px"
          borderColor="red.200"
          borderRadius="lg"
          p={4}
          color="red.800"
          fontSize="sm"
        >
          ⚠️ {error}
        </Box>
      </Container>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={4}>
      <Container maxW="full" px={4}>
        <VStack gap={6} align="stretch">
          {/* Заголовок */}
          <Box textAlign="center" py={4}>
            <Heading
              size={{ base: "xl", md: "2xl" }}
              color={useColorModeValue("gray.800", "white")}
              mb={2}
            >
              Dashboard
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "lg" }}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Управление ответами на приглашение
            </Text>
          </Box>

          {/* Статистика - в одну строку для мобильных */}
          <HStack
            gap={{ base: 2, md: 4 }}
            justify="space-between"
            flexWrap="nowrap"
            overflowX="auto"
            pb={2}
          >
            <Box
              bg={cardBg}
              p={{ base: 3, md: 4 }}
              borderRadius="lg"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              shadow="sm"
              textAlign="center"
              minW={{ base: "100px", md: "120px" }}
              flex="1"
            >
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" mb={1}>
                Ответы
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="blue.500"
              >
                {stats.totalResponses}
              </Text>
            </Box>

            <Box
              bg={cardBg}
              p={{ base: 3, md: 4 }}
              borderRadius="lg"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              shadow="sm"
              textAlign="center"
              minW={{ base: "100px", md: "120px" }}
              flex="1"
            >
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" mb={1}>
                Гости
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="green.500"
              >
                {stats.totalGuests}
              </Text>
            </Box>

            <Box
              bg={cardBg}
              p={{ base: 3, md: 4 }}
              borderRadius="lg"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              shadow="sm"
              textAlign="center"
              minW={{ base: "100px", md: "120px" }}
              flex="1"
            >
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600" mb={1}>
                Среднее
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                color="purple.500"
              >
                {stats.averageGuests}
              </Text>
            </Box>
          </HStack>

          {/* Таблица данных */}
          <Box>
            <Box mb={4}>
              <Heading size={{ base: "md", md: "lg" }} mb={2}>
                Детали ответов
              </Heading>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Полный список всех подтверждений присутствия
              </Text>
            </Box>

            {isLoading ? (
              <Box textAlign="center" py={16}>
                <Spinner size="xl" color="blue.500" />
                <Text mt={4} fontSize="sm">
                  Загрузка данных...
                </Text>
              </Box>
            ) : (
              <WeddingTable data={data} />
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
