import { LayoutGrid, Layers, UtensilsCrossed, TrendingUp } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MenuCategory = Tables<"menu_categories">;
type MenuSection = Tables<"menu_sections">;
type MenuItem = Tables<"menu_items">;

interface Props {
  categories: MenuCategory[];
  sections: MenuSection[];
  items: MenuItem[];
}

const AdminDashboard = ({ categories, sections, items }: Props) => {
  const stats = [
    { label: "Catégories", value: categories.length, icon: LayoutGrid, color: "text-primary" },
    { label: "Sections", value: sections.length, icon: Layers, color: "text-accent-foreground" },
    { label: "Plats", value: items.length, icon: UtensilsCrossed, color: "text-primary" },
    { label: "Avec image", value: items.filter(i => i.image_url).length, icon: TrendingUp, color: "text-accent-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-secondary ${s.color}`}>
            <s.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
