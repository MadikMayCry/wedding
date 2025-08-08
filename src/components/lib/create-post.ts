"use server";

import { supabase } from "@/components/lib/supabase";

export async function addItem(formData) {
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
