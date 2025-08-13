import { z } from "zod";

export const rsvpSchema = z.object({
  fullname: z.string().trim().min(1, "Введите имя и фамилию"),
  phone_number: z
    .string()
    .regex(/^[+]7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/u, "Формат: +7 (777) 777-77-77"),
  guests: z
    .number({ message: "Укажите количество гостей" })
    .int("Только целые числа")
    .min(1, "Минимум 1")
    .max(9, "Максимум 9"),
  guest_side: z.string().refine((val) => val === "groom" || val === "bride", {
    message: "Выберите сторону (жених или невеста)",
  }),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export const rsvpDefaultValues: Partial<RsvpFormValues> = {
  fullname: "",
  phone_number: "",
  guests: undefined,
  guest_side: "",
};
