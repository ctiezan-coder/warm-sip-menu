import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, CalendarDays } from "lucide-react";

const DAILY_SECTIONS = [
  {
    key: "yassa",
    label: "Yassa 🍋",
    items: [
      "Yassa Poisson Riz", "Yassa Poisson Fonio",
      "Yassa Poulet Riz", "Yassa Poulet Fonio",
      "Yassa Mouton Riz", "Yassa Mouton Fonio",
    ],
  },
  {
    key: "mafe",
    label: "Mafé (Sauce Arachide) 🥜",
    items: [
      "Pondeuse Fumée (riz ou Fonio)", "1/2 Pondeuse Fumée (riz ou Fonio)",
      "1 Pondeuse Entière (riz ou Fonio)", "Poisson Fumé (riz ou Fonio)",
    ],
  },
  {
    key: "sauce-legume",
    label: "Sauce Légume 🥬",
    items: [
      "Pondeuse Fumée (riz ou Fonio)", "1/2 Pondeuse Fumée (riz ou Fonio)",
      "1 Pondeuse (riz, Fonio)", "Viande de Bœuf Fumée (riz / Fonio)",
    ],
  },
  {
    key: "sauce-tomate",
    label: "Sauce Tomate 🍅",
    items: ["Boulette de Viande Riz"],
  },
  {
    key: "sauce-feuille",
    label: "Sauce Feuille 🍃",
    items: ["Viande de Bœuf Riz"],
  },
  {
    key: "soupe",
    label: "Soupe 🍲",
    items: [
      "1/2 Pondeuse (riz, attiéké)", "1 Pondeuse Entière (riz, attiéké)",
      "Soupe Poulet Chair 1/2 (attiéké, riz)", "Soupe Poulet Chair 1 Entier (attiéké, riz)",
      "Soupe Poisson (riz, attiéké)",
    ],
  },
];

const DailySelectionAdmin = () => {
  // selections[sectionKey] = Set of selected item names
  const [selections, setSelections] = useState<Record<string, Set<string>>>({});
  const [saving, setSaving] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchSelections();
  }, []);

  const fetchSelections = async () => {
    const { data } = await supabase
      .from("daily_selections")
      .select("section_key, item_name")
      .eq("selection_date", today);
    if (data) {
      const map: Record<string, Set<string>> = {};
      data.forEach((d: { section_key: string; item_name: string }) => {
        if (!map[d.section_key]) map[d.section_key] = new Set();
        map[d.section_key].add(d.item_name);
      });
      setSelections(map);
    }
  };

  const toggleSelection = (sectionKey: string, itemName: string) => {
    setSelections(prev => {
      const current = new Set(prev[sectionKey] || []);
      if (current.has(itemName)) {
        current.delete(itemName);
      } else {
        current.add(itemName);
      }
      return { ...prev, [sectionKey]: current };
    });
  };

  const saveSelections = async () => {
    setSaving(true);
    await supabase.from("daily_selections").delete().eq("selection_date", today);

    const inserts: { section_key: string; item_name: string; selection_date: string }[] = [];
    Object.entries(selections).forEach(([section_key, names]) => {
      names.forEach(item_name => {
        inserts.push({ section_key, item_name, selection_date: today });
      });
    });

    if (inserts.length > 0) {
      const { error } = await supabase.from("daily_selections").insert(inserts);
      if (error) { toast.error(error.message); setSaving(false); return; }
    }
    toast.success("Menu du jour enregistré !");
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <CalendarDays className="w-5 h-5 text-primary" />
        <h2 className="font-display text-lg font-bold text-primary">Menu du Jour — {today}</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Sélectionnez les plats à afficher aujourd'hui pour chaque section. Les sections sans sélection seront masquées.
      </p>

      {DAILY_SECTIONS.map(section => {
        const selected = selections[section.key] || new Set();
        return (
          <div key={section.key} className="border border-border rounded-lg overflow-hidden">
            <div className="bg-secondary/30 p-3 flex items-center justify-between">
              <span className="font-body font-semibold text-sm text-foreground">{section.label}</span>
              {selected.size === 0 && (
                <span className="text-xs text-muted-foreground italic">(masquée)</span>
              )}
              {selected.size > 0 && (
                <span className="text-xs text-primary font-medium">{selected.size} plat(s)</span>
              )}
            </div>
            <div className="p-3 space-y-1">
              {section.items.map(item => {
                const isSelected = selected.has(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleSelection(section.key, item)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-primary/15 text-primary font-semibold border border-primary/30"
                        : "hover:bg-secondary/40 text-foreground"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                    </div>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <Button onClick={saveSelections} disabled={saving} className="w-full bg-primary text-primary-foreground">
        {saving ? "Enregistrement..." : "Enregistrer le menu du jour"}
      </Button>
    </div>
  );
};

export default DailySelectionAdmin;
