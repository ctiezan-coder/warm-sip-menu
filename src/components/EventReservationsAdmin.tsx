import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, User, Phone, Trash2, Eye, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EventReservation {
  id: string;
  event_type: string;
  guest_count: number | null;
  event_date: string | null;
  event_time: string | null;
  client_name: string;
  client_phone: string;
  menu_choice: string | null;
  drinks: string | null;
  decoration: string | null;
  music: string | null;
  other_services: string | null;
  deposit_amount: number;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  confirmed: { label: "Confirmé", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  cancelled: { label: "Annulé", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const EventReservationsAdmin = () => {
  const [reservations, setReservations] = useState<EventReservation[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("event_reservations" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReservations(data as unknown as EventReservation[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchReservations();

    const channel = supabase
      .channel("event-reservations-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "event_reservations" }, () => fetchReservations())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("event_reservations" as any)
      .update({ status })
      .eq("id", id);
    if (error) { toast.error("Erreur"); return; }
    toast.success(`Statut mis à jour : ${statusLabels[status]?.label}`);
    fetchReservations();
  };

  const deleteReservation = async (id: string) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    const { error } = await supabase
      .from("event_reservations" as any)
      .delete()
      .eq("id", id);
    if (error) { toast.error("Erreur"); return; }
    toast.success("Réservation supprimée");
    fetchReservations();
  };

  const pendingCount = reservations.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-card/50 hover:bg-card/70 transition-colors"
      >
        <div className="flex items-center gap-3">
          {expanded ? <ChevronDown className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
          <CalendarDays size={20} className="text-primary" />
          <span className="font-display font-bold text-foreground text-base">Réservations Événements</span>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-bold">
              {pendingCount} en attente
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">{reservations.length} total</span>
      </button>

      {expanded && (
        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-muted-foreground text-sm py-4">Chargement...</p>
          ) : reservations.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-4">Aucune réservation</p>
          ) : (
            reservations.map((r) => {
              const st = statusLabels[r.status] || statusLabels.pending;
              const isExpanded = expandedId === r.id;

              return (
                <div key={r.id} className="rounded-xl border border-border bg-card/30 overflow-hidden">
                  {/* Summary row */}
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-primary shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body font-bold text-base text-foreground">{r.event_type}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${st.color}`}>{st.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><User size={12} /> {r.client_name}</span>
                        {r.event_date && <span>{r.event_date}</span>}
                        {r.guest_count && <span>{r.guest_count} pers.</span>}
                      </div>
                    </div>
                    <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteReservation(r.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Téléphone</span>
                          <a href={`tel:${r.client_phone}`} className="text-primary font-semibold flex items-center gap-1">
                            <Phone size={13} /> {r.client_phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Heure</span>
                          <span className="text-foreground font-semibold">{r.event_time || "—"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Acompte</span>
                          <span className="text-primary font-bold">{r.deposit_amount.toLocaleString()} FCFA</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-0.5">Reçu le</span>
                          <span className="text-foreground text-xs">{new Date(r.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Services</span>
                        <div className="grid gap-1.5 text-sm">
                          {r.menu_choice && <p><span className="text-muted-foreground">Menu :</span> <span className="text-foreground">{r.menu_choice}</span></p>}
                          {r.drinks && <p><span className="text-muted-foreground">Boissons :</span> <span className="text-foreground">{r.drinks}</span></p>}
                          {r.decoration && <p><span className="text-muted-foreground">Décoration :</span> <span className="text-foreground">{r.decoration}</span></p>}
                          {r.music && <p><span className="text-muted-foreground">Musique :</span> <span className="text-foreground">{r.music}</span></p>}
                          {r.other_services && <p><span className="text-muted-foreground">Autres :</span> <span className="text-foreground">{r.other_services}</span></p>}
                          {!r.menu_choice && !r.drinks && !r.decoration && !r.music && !r.other_services && (
                            <p className="text-muted-foreground italic">Aucun service spécifié</p>
                          )}
                        </div>
                      </div>

                      {/* Status actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant={r.status === "confirmed" ? "default" : "outline"}
                          onClick={() => updateStatus(r.id, "confirmed")}
                          className={r.status === "confirmed" ? "bg-green-600 hover:bg-green-700 text-white" : "text-foreground border-border hover:border-green-500 hover:text-green-400"}
                        >
                          ✅ Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant={r.status === "pending" ? "default" : "outline"}
                          onClick={() => updateStatus(r.id, "pending")}
                          className={r.status === "pending" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "text-foreground border-border hover:border-yellow-500 hover:text-yellow-400"}
                        >
                          ⏳ En attente
                        </Button>
                        <Button
                          size="sm"
                          variant={r.status === "cancelled" ? "default" : "outline"}
                          onClick={() => updateStatus(r.id, "cancelled")}
                          className={r.status === "cancelled" ? "bg-red-600 hover:bg-red-700 text-white" : "text-foreground border-border hover:border-red-500 hover:text-red-400"}
                        >
                          ❌ Annuler
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default EventReservationsAdmin;
