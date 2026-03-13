import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UtensilsCrossed, MessageCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReservationFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-colors";

const labelClass = "font-body text-sm font-semibold text-foreground/80 mb-1.5 block";

const ReservationFormDialog = ({ open, onClose }: ReservationFormDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    eventType: "",
    guestCount: "",
    date: "",
    heure: "",
    nom: "",
    phone: "",
    menuChoisi: "",
    boissons: "",
    decoration: "",
    musique: "",
    autresServices: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.nom.trim() && form.phone.trim();

  const handleSubmit = async () => {
    if (!isValid) return;
    setSaving(true);

    const { error } = await supabase.from("event_reservations").insert({
      event_type: form.eventType || "Réservation Restauration",
      client_name: form.nom.trim(),
      client_phone: form.phone.trim(),
      guest_count: form.guestCount ? parseInt(form.guestCount) : null,
      event_date: form.date || null,
      event_time: form.heure || null,
      menu_choice: form.menuChoisi || null,
      drinks: form.boissons || null,
      decoration: form.decoration || null,
      music: form.musique || null,
      other_services: form.autresServices || null,
    });

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      setSaving(false);
      return;
    }

    const msg = `📋 *FICHE DE RÉSERVATION RESTAURATION*

🎉 *Informations sur l'Événement*
• Type d'événement : ${form.eventType || "Non précisé"}
• Nombre de personnes : ${form.guestCount || "Non précisé"}
• Date : ${form.date || "Non précisé"}
• Heure : ${form.heure || "Non précisé"}

👤 *Informations de Contact*
• Nom : ${form.nom}
• Téléphone : ${form.phone}

💰 *Détails de la Réservation*
• Acompte versé : 30 000 FCFA
• Solde à payer : À déterminer

🍽️ *Services et Options*
• Menu choisi : ${form.menuChoisi || "Non précisé"}
• Boissons : ${form.boissons || "Non précisé"}
• Décoration : ${form.decoration || "Non précisé"}
• Musique : ${form.musique || "Non précisé"}
• Autres services : ${form.autresServices || "Non précisé"}

Merci de confirmer ma réservation ! 😊`;

    window.open(`https://wa.me/2250789288202?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Réservation envoyée !");
    setSaving(false);
    setForm({
      eventType: "", guestCount: "", date: "", heure: "",
      nom: "", phone: "", menuChoisi: "", boissons: "",
      decoration: "", musique: "", autresServices: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-4 sm:py-8 px-3 sm:px-4"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-3xl border border-primary/25 bg-card shadow-[0_25px_80px_-12px_hsl(var(--primary)/0.35)] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border-b border-primary/15 px-6 py-6 sm:py-7 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-card/50 border border-border text-foreground/50 hover:text-foreground hover:bg-card transition-all"
              >
                <X size={18} />
              </button>
              <UtensilsCrossed className="mx-auto text-primary mb-3" size={40} />
              <h2 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em]">
                Réservation Restauration
              </h2>
            </div>

            {/* Form */}
            <div className="px-5 sm:px-6 py-6 space-y-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
              {/* Infos Événement */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🎉</span> Informations sur l'Événement
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Type d'événement</label>
                    <input type="text" value={form.eventType} onChange={(e) => handleChange("eventType", e.target.value)} placeholder="Ex: Anniversaire, Mariage..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Nombre de personnes</label>
                    <input type="number" value={form.guestCount} onChange={(e) => handleChange("guestCount", e.target.value)} placeholder="Ex: 50" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Date</label>
                      <input type="date" value={form.date} onChange={(e) => handleChange("date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Heure</label>
                      <input type="time" value={form.heure} onChange={(e) => handleChange("heure", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">👤</span> Informations de Contact
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Nom *</label>
                    <input type="text" value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} placeholder="Votre nom complet" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Numéro de téléphone *</label>
                    <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="Ex: 07 89 28 82 02" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Détails Réservation */}
              <div className="rounded-2xl bg-primary/8 border border-primary/15 p-5">
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">💰</span> Détails de la Réservation
                </h3>
                <ul className="font-body text-sm text-foreground/70 space-y-2">
                  <li>• Acompte versé : <span className="font-bold text-primary">30 000 FCFA</span> (pour valider la réservation)</li>
                  <li>• Solde à payer : à déterminer en fonction des services choisis</li>
                </ul>
              </div>

              {/* Services et Options */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🍽️</span> Services et Options
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Menu choisi</label>
                    <input type="text" value={form.menuChoisi} onChange={(e) => handleChange("menuChoisi", e.target.value)} placeholder="Décrivez le menu souhaité" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Boissons</label>
                    <input type="text" value={form.boissons} onChange={(e) => handleChange("boissons", e.target.value)} placeholder="Ex: Jus, Eau, Sodas..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Décoration</label>
                    <input type="text" value={form.decoration} onChange={(e) => handleChange("decoration", e.target.value)} placeholder="Décrivez la décoration souhaitée" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Musique</label>
                    <input type="text" value={form.musique} onChange={(e) => handleChange("musique", e.target.value)} placeholder="DJ, Playlist, Orchestre..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Autres services</label>
                    <input type="text" value={form.autresServices} onChange={(e) => handleChange("autresServices", e.target.value)} placeholder="Photographe, Animateur..." className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="rounded-2xl bg-primary/8 border border-primary/15 p-5">
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">📜</span> Conditions de Réservation
                </h3>
                <ul className="font-body text-sm text-foreground/70 space-y-2">
                  <li>• L'acompte est <span className="font-bold text-primary">non remboursable</span> en cas d'annulation.</li>
                  <li>• Le solde doit être payé au plus tard <span className="font-bold text-primary">48 heures</span> avant l'événement.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-5 border-t border-border bg-card">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!isValid || saving}
                className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-body font-bold text-base uppercase tracking-wider transition-all shadow-lg ${
                  isValid && !saving
                    ? "bg-[#25D366] hover:bg-[#1ebe57] text-white shadow-[#25D366]/30 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {saving ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <MessageCircle size={20} fill={isValid ? "white" : "currentColor"} strokeWidth={0} />
                )}
                {saving ? "Envoi en cours..." : "Envoyer sur WhatsApp"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationFormDialog;
