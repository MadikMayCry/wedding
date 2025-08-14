"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Spinner,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { withMask } from "use-mask-input";
import { mergeRefs } from "@/shared/lib/react/merge-refs";
import { checkPhoneNumber } from "@/shared/lib";
import { WeddingData } from "@/entities/wedding/model/types";

const MotionBox = motion.create(Box);

export function PhoneChecker() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [existingData, setExistingData] = useState<WeddingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCheck = async () => {
    if (!phoneNumber || phoneNumber.length < 18) {
      setError("Введите корректный номер телефона");
      return;
    }

    setIsChecking(true);
    setError(null);
    setExistingData(null);

    try {
      const data = await checkPhoneNumber(phoneNumber);
      if (data) {
        setExistingData(data);
        setIsDialogOpen(true);
      } else {
        setError("Данные с таким номером телефона не найдены");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при проверке");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      w="full"
      maxW="md"
    >
      <Box bg="white" p={8} borderRadius="lg" shadow="md">
        <VStack gap={6}>
          <Text fontSize="lg" fontWeight="semibold" textAlign="center">
            Проверить номер телефона
          </Text>
          
          <Input
            placeholder="+7 (777) 777-77-77"
            value={phoneNumber}
            onChange={handlePhoneChange}
            inputMode="numeric"
            size="lg"
            ref={withMask("+7 (999) 999-99-99")}
          />

          <Button
            onClick={handleCheck}
            colorScheme="blue"
            w="full"
            size="lg"
            disabled={isChecking || !phoneNumber || phoneNumber.length < 18}
          >
            {isChecking ? (
              <>
                <Spinner size="sm" mr={2} />
                Проверяю...
              </>
            ) : (
              "Проверить номер"
            )}
          </Button>

          {error && (
            <Text color="red.500" textAlign="center" fontSize="sm">
              {error}
            </Text>
          )}
        </VStack>
      </Box>

      {/* Dialog для отображения найденных данных */}
      <Dialog.Root open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Найдены данные регистрации</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {existingData && (
                  <VStack gap={3} align="start">
                    <Text><strong>Имя:</strong> {existingData.fullname}</Text>
                    <Text><strong>Гостей:</strong> {existingData.guests}</Text>
                    <Text><strong>Сторона:</strong> {existingData.guest_side === 'groom' ? 'Жених' : 'Невеста'}</Text>
                    <Text><strong>Дата регистрации:</strong> {new Date(existingData.created_at).toLocaleDateString('ru-RU')}</Text>
                  </VStack>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline">Закрыть</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </MotionBox>
  );
}
