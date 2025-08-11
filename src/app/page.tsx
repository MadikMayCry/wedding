"use client";

import { RsvpForm } from "@/features/rsvp-form/ui/RsvpForm";
import { ScrollTriggered } from "@/shared/ui/motion";
import ParallaxSection from "@/shared/ui/motion/parallax-section";
import TestSection from "@/shared/ui/motion/test-section";
import { HeroSection, EventDetails, Countdown } from "@/widgets";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/*<TestSection />*/}
      {/* <ParallaxSection /> */}
      <ScrollTriggered />
      <EventDetails />
      <Countdown />
      <RsvpForm />
    </>
  );
}
