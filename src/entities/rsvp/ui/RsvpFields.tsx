"use client";
import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input, Text, Field } from "@chakra-ui/react";
import { RsvpFormValues } from "@/entities/rsvp/model/schema";
import { withMask } from "use-mask-input";
import { mergeRefs } from "@/shared/lib/react/merge-refs";

type Props = {
  control: Control<RsvpFormValues>;
  errors: Record<string, any>;
};

export function RsvpFields({ control, errors }: Props) {
  return (
    <>
      <Field.Root invalid={!!errors.fullname}>
        <Text
          as="label"
          display="block"
          mb={2}
          fontWeight="medium"
          color="gray.700"
        >
          Имя фамилия
        </Text>
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Введите имя и фамилию" />
          )}
        />
        <Field.ErrorText>{errors?.fullname?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.phone_number}>
        <Text
          as="label"
          display="block"
          mb={2}
          fontWeight="medium"
          color="gray.700"
        >
          Телефон
        </Text>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              inputMode="numeric"
              placeholder="+7 (777) 777-77-77"
              ref={mergeRefs(field.ref, withMask("+7 (999) 999-99-99"))}
            />
          )}
        />
        <Field.ErrorText>{errors?.phone_number?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.guests}>
        <Text
          as="label"
          display="block"
          mb={2}
          fontWeight="medium"
          color="gray.700"
        >
          Количество гостей
        </Text>
        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              inputMode="numeric"
              placeholder="от 1 до 9"
              value={field.value === undefined ? "" : String(field.value)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                const last = digits.slice(-1);
                field.onChange(last ? Number(last) : undefined);
              }}
            />
          )}
        />
        <Field.ErrorText>{errors?.guests?.message}</Field.ErrorText>
      </Field.Root>
    </>
  );
}
