import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DAILY_SECTION_KEYS = ["yassa", "mafe", "sauce-legume", "sauce-tomate", "sauce-feuille", "soupe"];

export function useDailySelections() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    supabase
      .from("daily_selections")
      .select("section_key, item_name")
      .eq("selection_date", today)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((d: { section_key: string; item_name: string }) => {
            map[d.section_key] = d.item_name;
          });
          setSelections(map);
        }
        setLoaded(true);
      });
  }, []);

  return { selections, loaded };
}
