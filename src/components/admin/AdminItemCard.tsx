import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;

interface Props {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const AdminItemCard = ({ item, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: Props) => (
  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
    {item.image_url ? (
      <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-primary/20" />
    ) : (
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-muted-foreground" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <span className="font-body font-semibold text-sm text-foreground">{item.emoji && `${item.emoji} `}{item.name}</span>
      {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
    </div>
    <span className="font-display font-bold text-primary text-sm whitespace-nowrap">{item.price}</span>
    <div className="flex gap-0.5">
      <Button variant="ghost" size="icon" onClick={onMoveUp} disabled={isFirst} className="h-7 w-7 text-muted-foreground hover:text-primary">
        <ArrowUp className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onMoveDown} disabled={isLast} className="h-7 w-7 text-muted-foreground hover:text-primary">
        <ArrowDown className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onEdit} className="h-7 w-7 text-muted-foreground hover:text-primary">
        <Pencil className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete} className="h-7 w-7 text-muted-foreground hover:text-destructive">
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  </div>
);

export default AdminItemCard;
