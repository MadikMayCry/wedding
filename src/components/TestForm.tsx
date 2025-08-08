"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  Text,
  Input,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import ScrollTriggered from "@/components/motion/scroll-triggered";
import { addItem } from "@/components/lib/create-post";

const MotionBox = motion.create(Box);

interface RSVPData {
  fullname: string;
  count: string;
  phone_number: string;
}

export default function NewForm() {
  const [formData, setFormData] = useState<RSVPData>({
    fullname: "",
    count: "",
    phone_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки данных
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await addItem(formData);

    console.log("response-->", response);

    // Показываем уведомление через alert (временное решение)
    alert("Спасибо! Ваше подтверждение получено.");

    setIsSubmitting(false);
    setFormData({
      fullname: "",
      count: "",
      phone_number: "",
    });
  };

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <VStack gap={8}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Подтвердите Ваше Присутствие
          </Heading>

          <Text textAlign="center" color="gray.600" maxW="2xl">
            Пожалуйста, подтвердите ваше присутствие до 1 июня 2024 года. Мы
            будем рады видеть вас на нашем особом дне!
          </Text>

          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            w="full"
            maxW="md"
          >
            <Box bg="white" p={8} borderRadius="lg" shadow="md">
              <form onSubmit={handleSubmit}>
                <VStack gap={6}>
                  <Box w="full">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Имя *
                    </Text>
                    <Input
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      placeholder="Ваше имя"
                      required
                    />
                  </Box>

                  <Box w="full">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Телефон
                    </Text>
                    <Input
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="+7 (999) 123-45-67"
                    />
                  </Box>

                  <Box w="full">
                    <Text
                      as="label"
                      display="block"
                      mb={2}
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Количество гостей
                    </Text>
                    <Input
                      type="number"
                      min={0}
                      max={5}
                      value={formData.count}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          count: parseInt(e.target.value) || null,
                        })
                      }
                    />
                  </Box>

                  <HStack gap={4} w="full">
                    <Button
                      type="submit"
                      colorScheme="green"
                      flex={1}
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" mr={2} />
                          Отправка...
                        </>
                      ) : (
                        "Буду присутствовать"
                      )}
                    </Button>
                    <Button
                      colorScheme="red"
                      flex={1}
                      size="lg"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={() =>
                        setFormData({ ...formData, attending: false })
                      }
                    >
                      Не смогу прийти
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
