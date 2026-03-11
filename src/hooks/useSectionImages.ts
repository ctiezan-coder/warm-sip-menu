import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches section image_url from the database.
 * Returns a map of section name -> image_url for sections that have a custom image.
 */
export const useSectionImages = () => {
  const [sectionImages, setSectionImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("menu_sections")
        .select("name, image_url")
        .not("image_url", "is", null);

      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: any) => {
          if (s.image_url) map[s.name] = s.image_url;
        });
        setSectionImages(map);
      }
    };
    fetchImages();
  }, []);

  /** Get image for a section: DB image if available, otherwise fallback */
  const getSectionImage = (sectionName: string, fallback: string): string => {
    // Try exact match first, then try matching without emoji
    if (sectionImages[sectionName]) return sectionImages[sectionName];
    
    // Try matching by stripping emoji from both sides
    const stripEmoji = (s: string) => s.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "").trim();
    const cleanName = stripEmoji(sectionName);
    
    for (const [key, url] of Object.entries(sectionImages)) {
      if (stripEmoji(key) === cleanName) return url;
    }
    
    return fallback;
  };

  return { getSectionImage };
};
