import { DashboardWidget } from "../../features/dashboard";
import { supabase } from "@/shared";
import { supabaseKey } from "@/shared/lib/supabase";

export default async function DashboardPage() {
  return <DashboardWidget />;
}
