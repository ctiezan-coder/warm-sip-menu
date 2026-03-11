import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface LiveMenuItem {
  name: string;
  price: string;
  description?: string;
  emoji?: string;
}

export type LiveMenuData = Record<string, LiveMenuItem[]>;

/**
 * Fetches all menu items grouped by section name from the database.
 * Subscribes to realtime changes for instant updates.
 */
export const useMenuData = () => {
  const [liveData, setLiveData] = useState<LiveMenuData>({});

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select("name, price, description, emoji, sort_order, section_id")
        .order("sort_order", { ascending: true });

      if (!isMounted || !data) return;

      // We need section names to group items
      const { data: sections } = await supabase
        .from("menu_sections")
        .select("id, name");

      if (!sections) return;

      const sectionMap: Record<string, string> = {};
      sections.forEach((s) => {
        sectionMap[s.id] = s.name;
      });

      const grouped: LiveMenuData = {};
      data.forEach((item) => {
        const sectionName = sectionMap[item.section_id];
        if (!sectionName) return;
        if (!grouped[sectionName]) grouped[sectionName] = [];
        grouped[sectionName].push({
          name: item.name,
          price: item.price,
          description: item.description ?? undefined,
          emoji: item.emoji ?? undefined,
        });
      });

      setLiveData(grouped);
    };

    fetchAll();

    const channel = supabase
      .channel("menu-items-full-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_sections" }, fetchAll)
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return liveData;
};
