import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface LiveMenuItem {
  name: string;
  price: string;
  description?: string;
  emoji?: string;
  image_url?: string;
}

export interface LiveSection {
  id: string;
  name: string;
  image_url?: string;
  sort_order: number;
  items: LiveMenuItem[];
}

export interface LiveCategory {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  sections: LiveSection[];
}

/**
 * Fetches the full menu hierarchy from DB: categories → sections → items.
 * Subscribes to realtime changes for instant updates.
 */
export const useMenuData = () => {
  const [categories, setCategories] = useState<LiveCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      const [catRes, secRes, itemRes] = await Promise.all([
        supabase.from("menu_categories").select("id, name, emoji, description, image_url, sort_order").order("sort_order"),
        supabase.from("menu_sections").select("id, name, image_url, sort_order, category_id").order("sort_order"),
        supabase.from("menu_items").select("name, price, description, emoji, image_url, sort_order, section_id").order("sort_order"),
      ]);

      if (!isMounted) return;
      if (!catRes.data || !secRes.data || !itemRes.data) return;

      // Group items by section_id
      const itemsBySection: Record<string, LiveMenuItem[]> = {};
      itemRes.data.forEach((item) => {
        if (!itemsBySection[item.section_id]) itemsBySection[item.section_id] = [];
        itemsBySection[item.section_id].push({
          name: item.name,
          price: item.price,
          description: item.description ?? undefined,
          emoji: item.emoji ?? undefined,
          image_url: item.image_url ?? undefined,
        });
      });

      // Group sections by category_id
      const sectionsByCat: Record<string, LiveSection[]> = {};
      secRes.data.forEach((sec) => {
        if (!sectionsByCat[sec.category_id]) sectionsByCat[sec.category_id] = [];
        sectionsByCat[sec.category_id].push({
          id: sec.id,
          name: sec.name,
          image_url: sec.image_url ?? undefined,
          sort_order: sec.sort_order,
          items: itemsBySection[sec.id] || [],
        });
      });

      const result: LiveCategory[] = catRes.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
        emoji: cat.emoji ?? undefined,
        description: cat.description ?? undefined,
        image_url: cat.image_url ?? undefined,
        sort_order: cat.sort_order,
        sections: sectionsByCat[cat.id] || [],
      }));

      setCategories(result);
      setLoading(false);
    };

    fetchAll();

    const channel = supabase
      .channel("menu-full-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_categories" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_sections" }, fetchAll)
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, fetchAll)
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { categories, loading };
};
