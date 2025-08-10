"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Container,
  Heading,
  VStack,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "motion/react";
import { addItem } from "@/components/lib/create-post";
import { toaster } from "@/components/ui/toaster";
import {
  RsvpFormValues,
  rsvpDefaultValues,
  rsvpSchema,
} from "@/entities/rsvp/model/schema";
import { RsvpFields } from "@/entities/rsvp/ui/RsvpFields";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(nameEQ)) return part.substring(nameEQ.length);
  }
  return null;
}

function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value}${expires}; path=/`;
}

const MotionBox = motion.create(Box);

export function RsvpForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: rsvpDefaultValues,
  });

  const onSubmit = async (values: RsvpFormValues) => {
    try {
      if (getCookie("formSubmitted") === "true") {
        toaster.warning({ title: "Вы уже отправляли форму" });
        return;
      }
      await addItem(values);
      toaster.success({ title: "Заявка успешно отправлена!" });
      setCookie("formSubmitted", "true", 365);
      reset();
    } catch (error) {
      console.error(error);
      toaster.error({
        title: "Не удалось отправить заявку",
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  return (
    <Box py={20} id="rsvp">
      <Container maxW="container.xl">
        <VStack gap={8}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Подтвердите Ваше Присутствие
          </Heading>

          <Text textAlign="center" color="gray.600" maxW="2xl">
            Пожалуйста, подтвердите ваше присутствие. Мы будем рады видеть вас
            на нашем особом дне!
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap={6}>
                  <RsvpFields control={control} errors={errors as any} />

                  <Button
                    type="submit"
                    colorScheme="green"
                    w="full"
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
                </VStack>
              </form>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
