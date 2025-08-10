"use client";

import { RsvpForm } from "@/features/rsvp-form/ui/RsvpForm";
import { ScrollTriggered } from "@/shared/ui/motion";
import { HeroSection, EventDetails, Countdown } from "@/widgets";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollTriggered />
      <EventDetails />
      <Countdown />
      <RsvpForm />
    </>
  );
}
