import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
}

const AdminSearchBar = ({ search, onSearchChange }: Props) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      value={search}
      onChange={e => onSearchChange(e.target.value)}
      placeholder="Rechercher un plat, une section..."
      className="pl-9 pr-9 bg-secondary border-border"
    />
    {search && (
      <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default AdminSearchBar;
