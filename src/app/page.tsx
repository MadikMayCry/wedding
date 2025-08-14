import { RsvpForm } from "@/features/rsvp-form/ui/RsvpForm";
import { HeroSection, EventDetails, Countdown } from "@/widgets";
import { PhoneChecker } from "@/features/phone-checker";
import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { ScrollTriggered } from "@/shared";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollTriggered />
      <EventDetails />
      <Countdown />
      <RsvpForm />

      {/* Добавляем компонент проверки телефона */}
      {/*<Box py={10}>*/}
      {/*  <Container maxW="container.xl">*/}
      {/*    <VStack gap={8}>*/}
      {/*      <Heading as="h2" size="xl" textAlign="center" color="gray.800">*/}
      {/*        Проверить регистрацию*/}
      {/*      </Heading>*/}
      {/*      <Text textAlign="center" color="gray.600" maxW="2xl">*/}
      {/*        Введите ваш номер телефона, чтобы проверить данные регистрации*/}
      {/*      </Text>*/}
      {/*      <PhoneChecker />*/}
      {/*    </VStack>*/}
      {/*  </Container>*/}
      {/*</Box>*/}
    </>
  );
}
