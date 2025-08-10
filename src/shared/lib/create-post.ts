"use server";

import { supabase } from "./supabase";

export async function addItem(formData: any) {
  const { data, error } = await supabase
    .from("wedding") // имя твоей таблицы
    .insert([formData]);

  console.log("data-->", data);

  if (error) {
    console.error("Ошибка вставки:", error);
    return;
  }
  console.log("Вставлено:", data);
}
