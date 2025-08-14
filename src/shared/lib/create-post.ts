"use server";

import { supabase } from "./supabase";

export async function addItem(formData: any) {
  const { data, error } = await supabase
    .from("wedding") // имя твоей таблицы
    .insert([formData]);

  if (error) {
    console.error("Ошибка вставки:", error);

    // Проверяем, является ли это ошибкой уникальности
    if (error.code === "23505") {
      // Ошибка уникальности - номер телефона уже существует
      throw new Error(
        "Номер телефона уже зарегистрирован. Если вы хотите обновить данные, пожалуйста, свяжитесь с организатором.",
      );
    }

    // Другие ошибки
    throw new Error(error.message || "Произошла ошибка при отправке формы");
  }
  console.log("Вставлено:", data);
}

export async function checkPhoneNumber(phoneNumber: string) {
  const { data, error } = await supabase
    .from("wedding")
    .select("*")
    .eq("phone_number", phoneNumber)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Запись не найдена
      return null;
    }
    throw new Error("Ошибка при проверке номера телефона");
  }

  return data;
}

export async function updateItem(phoneNumber: string, formData: any) {
  const { data, error } = await supabase
    .from("wedding")
    .update(formData)
    .eq("phone_number", phoneNumber);

  if (error) {
    console.error("Ошибка обновления:", error);
    throw new Error(error.message || "Произошла ошибка при обновлении данных");
  }

  console.log("Обновлено:", data);
  return data;
}
