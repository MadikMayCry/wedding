"use client";

import {
  Box,
  Text,
  Badge,
  Input,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useColorModeValue } from "@/shared";
import { WeddingData } from "../model/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useState, useMemo } from "react";

interface WeddingTableProps {
  data: WeddingData[];
  isLoading?: boolean;
}

export function WeddingTable({ data, isLoading = false }: WeddingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Адаптивные размеры для мобильных
  const isMobile = useBreakpointValue({ base: true, md: false });
  const tableSize = useBreakpointValue({ base: "sm", md: "md" }) as "sm" | "md";

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: ru });
    } catch {
      return dateString;
    }
  };

  // Фильтрация данных по поиску - ВСЕГДА вызывается
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((item) =>
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  // Ранний возврат для загрузки и пустых данных
  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="sm">Загрузка данных...</Text>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="sm">Нет данных для отображения</Text>
      </Box>
    );
  }

  return (
    <VStack gap={4} align="stretch">
      {/* Поиск - компактный для мобильных */}
      <Box>
        <Input
          placeholder="🔍 Поиск по имени..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={bgColor}
          borderColor={borderColor}
          size={isMobile ? "sm" : "md"}
          fontSize={isMobile ? "sm" : "md"}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
        />
        {searchTerm && (
          <Text fontSize="xs" color="gray.500" mt={2}>
            Найдено: {filteredData.length} из {data.length}
          </Text>
        )}
      </Box>

      {/* Таблица - адаптивная для мобильных */}
      <Box
        bg={bgColor}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        shadow="sm"
        overflowX="auto"
        p={{ base: 2, md: 4 }}
      >
        <Table.ScrollArea borderWidth="1px" maxW="xl">
          <Table.Root size={tableSize} variant="outline" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Имя
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Гости
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Сторона
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Телефон
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Дата
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      {item.fullname}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      
                      size={isMobile ? "sm" : "md"}
                    >
                      {item.guests}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        !item.guest_side ? 'gray' : 
                        item.guest_side === 'groom' ? 'blue' : 'pink'
                      }
                      variant="subtle"
                      size={isMobile ? "sm" : "md"}
                    >
                      {!item.guest_side ? 'Не выбрано' : 
                       item.guest_side === 'groom' ? 'Жених' : 'Невеста'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {item.phone_number ? (
                      <Text fontSize={{ base: "xs", md: "sm" }}>
                        {item.phone_number}
                      </Text>
                    ) : (
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.400"
                      >
                        -
                      </Text>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize={{ base: "xs", md: "xs" }} color="gray.600">
                      {formatDate(item.created_at)}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>

      {/* Мобильная статистика поиска */}
      {isMobile && searchTerm && (
        <Box
          bg={bgColor === "white" ? "blue.50" : "blue.900"}
          p={3}
          borderRadius="md"
          textAlign="center"
        >
          <Text fontSize="sm" color="blue.600">
            🔍 Поиск: "{searchTerm}" • Найдено {filteredData.length} результатов
          </Text>
        </Box>
      )}
    </VStack>
  );
}
