"use client";

import {
  Box,
  Text,
  Badge,
  Input,
  VStack,
  useBreakpointValue,
  Button,
  HStack,
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

type SortField = 'fullname' | 'created_at' | 'guests' | 'guest_side';
type SortDirection = 'asc' | 'desc';

export function WeddingTable({ data, isLoading = false }: WeddingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
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

  // Функция для изменения сортировки
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Функция для получения иконки сортировки
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return "↕️";
    }
    return sortDirection === 'asc' ? "↑" : "↓";
  };

  // Функция для получения текста подсказки сортировки
  const getSortTooltip = (field: SortField) => {
    if (sortField !== field) {
      return `Сортировать по ${getFieldLabel(field)}`;
    }
    return sortDirection === 'asc' 
      ? `Сортировка по ${getFieldLabel(field)} (по возрастанию)`
      : `Сортировка по ${getFieldLabel(field)} (по убыванию)`;
  };

  // Функция для получения человекочитаемых названий полей
  const getFieldLabel = (field: SortField) => {
    switch (field) {
      case 'fullname': return 'имени';
      case 'created_at': return 'дате';
      case 'guests': return 'количеству гостей';
      case 'guest_side': return 'стороне гостя';
      default: return field;
    }
  };

  // Функция для сортировки данных
  const sortData = (data: WeddingData[]) => {
    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'fullname':
          aValue = a.fullname.toLowerCase();
          bValue = b.fullname.toLowerCase();
          break;
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'guests':
          aValue = a.guests;
          bValue = b.guests;
          break;
        case 'guest_side':
          aValue = a.guest_side || '';
          bValue = b.guest_side || '';
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Фильтрация и сортировка данных
  const processedData = useMemo(() => {
    let filtered = data;
    
    // Фильтрация по поиску
    if (searchTerm.trim()) {
      filtered = data.filter((item) =>
        item.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    
    // Сортировка
    return sortData(filtered);
  }, [data, searchTerm, sortField, sortDirection]);

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
        <HStack gap={4} mt={2} fontSize="xs" color="gray.500">
          {searchTerm && (
            <Text>
              Найдено: {processedData.length} из {data.length}
            </Text>
          )}
          <Text>
            Сортировка: {getFieldLabel(sortField)} {sortDirection === 'asc' ? '↑' : '↓'}
          </Text>
        </HStack>
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
                  <HStack gap={2} justify="space-between">
                    <Text>Имя</Text>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleSort('fullname')}
                      color={sortField === 'fullname' ? 'blue.500' : 'gray.400'}
                      _hover={{ bg: 'blue.50' }}
                      minW="auto"
                      px={1}
                      aria-label={getSortTooltip('fullname')}
                      transition="all 0.2s"
                      _active={{ transform: 'scale(0.95)' }}
                    >
                      {getSortIcon('fullname')}
                    </Button>
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  <HStack gap={2} justify="space-between">
                    <Text>Гости</Text>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleSort('guests')}
                      color={sortField === 'guests' ? 'blue.500' : 'gray.400'}
                      _hover={{ bg: 'blue.50' }}
                      minW="auto"
                      px={1}
                      aria-label={getSortTooltip('guests')}
                      transition="all 0.2s"
                      _active={{ transform: 'scale(0.95)' }}
                    >
                      {getSortIcon('guests')}
                    </Button>
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  <HStack gap={2} justify="space-between">
                    <Text>Сторона</Text>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleSort('guest_side')}
                      color={sortField === 'guest_side' ? 'blue.500' : 'gray.400'}
                      _hover={{ bg: 'blue.50' }}
                      minW="auto"
                      px={1}
                      aria-label={getSortTooltip('guest_side')}
                      transition="all 0.2s"
                      _active={{ transform: 'scale(0.95)' }}
                    >
                      {getSortIcon('guest_side')}
                    </Button>
                  </HStack>
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Телефон
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  Комментарий
                </Table.ColumnHeader>
                <Table.ColumnHeader fontSize={{ base: "xs", md: "sm" }}>
                  <HStack gap={2} justify="space-between">
                    <Text>Дата</Text>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleSort('created_at')}
                      color={sortField === 'created_at' ? 'blue.500' : 'gray.400'}
                      _hover={{ bg: 'blue.50' }}
                      minW="auto"
                      px={1}
                      aria-label={getSortTooltip('created_at')}
                      transition="all 0.2s"
                      _active={{ transform: 'scale(0.95)' }}
                    >
                      {getSortIcon('created_at')}
                    </Button>
                  </HStack>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {processedData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      {item.fullname}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>{item.guests}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        !item.guest_side
                          ? "gray"
                          : item.guest_side === "groom"
                            ? "blue"
                            : "pink"
                      }
                      variant="subtle"
                      size={isMobile ? "sm" : "md"}
                    >
                      {!item.guest_side
                        ? "Не выбрано"
                        : item.guest_side === "groom"
                          ? "Жених"
                          : "Невеста"}
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
                  <Table.Cell>{item.commentary}</Table.Cell>
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
            🔍 Поиск: "{searchTerm}" • Найдено {processedData.length} результатов
          </Text>
        </Box>
      )}
    </VStack>
  );
}
