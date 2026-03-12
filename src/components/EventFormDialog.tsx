import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PartyPopper, MessageCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-colors";

const labelClass = "font-body text-sm font-semibold text-foreground/80 mb-1.5 block";

const EventFormDialog = ({ open, onClose }: EventFormDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    typeEvenement: "",
    nombrePersonnes: "",
    date: "",
    heure: "",
    nom: "",
    telephone: "",
    menu: "",
    boissons: "",
    decoration: "",
    musique: "",
    autresServices: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.nom.trim() && form.telephone.trim() && form.typeEvenement;

  const handleSubmit = async () => {
    if (!isValid) return;
    setSaving(true);

    // Save to database
    const { error } = await supabase.from("event_reservations" as any).insert({
      event_type: form.typeEvenement,
      guest_count: form.nombrePersonnes ? parseInt(form.nombrePersonnes) : null,
      event_date: form.date || null,
      event_time: form.heure || null,
      client_name: form.nom.trim(),
      client_phone: form.telephone.trim(),
      menu_choice: form.menu || null,
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

    // Send WhatsApp
    const msg = `📋 *Fiche de Réception - Réservation d'Événement*

🎉 *Informations sur l'Événement*
• Type : ${form.typeEvenement}
• Personnes : ${form.nombrePersonnes || "Non précisé"}
• Date : ${form.date || "Non précisé"}
• Heure : ${form.heure || "Non précisé"}

👤 *Contact*
• Nom : ${form.nom}
• Tél : ${form.telephone}

💰 *Acompte* : 30 000 FCFA

🍽️ *Services*
• Menu : ${form.menu || "Non précisé"}
• Boissons : ${form.boissons || "Non précisé"}
• Décoration : ${form.decoration || "Non précisé"}
• Musique : ${form.musique || "Non précisé"}
• Autres : ${form.autresServices || "Non précisé"}

Merci de confirmer ma réservation ! 😊`;

    window.open(`https://wa.me/2250789288202?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Réservation envoyée !");
    setSaving(false);
    setForm({ typeEvenement: "", nombrePersonnes: "", date: "", heure: "", nom: "", telephone: "", menu: "", boissons: "", decoration: "", musique: "", autresServices: "" });
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
              <PartyPopper className="mx-auto text-primary mb-3" size={40} />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary uppercase tracking-[0.12em]">
                Fiche de Réception
              </h2>
              <p className="font-body text-sm text-foreground/60 mt-1.5">
                Réservation d'Événement
              </p>
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
                    <label className={labelClass}>Type d'événement *</label>
                    <select
                      value={form.typeEvenement}
                      onChange={(e) => handleChange("typeEvenement", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="Mariage">Mariage</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Baptême">Baptême</option>
                      <option value="Anniversaire">Anniversaire</option>
                      <option value="Cocktail">Cocktail</option>
                      <option value="Buffet">Buffet</option>
                      <option value="Réception">Réception</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Nombre de personnes</label>
                    <input
                      type="number"
                      value={form.nombrePersonnes}
                      onChange={(e) => handleChange("nombrePersonnes", e.target.value)}
                      placeholder="Ex: 50"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Heure</label>
                      <input
                        type="time"
                        value={form.heure}
                        onChange={(e) => handleChange("heure", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos Contact */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">👤</span> Informations de Contact
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Nom *</label>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={(e) => handleChange("nom", e.target.value)}
                      placeholder="Votre nom complet"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Numéro de téléphone *</label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => handleChange("telephone", e.target.value)}
                      placeholder="Ex: 07 89 28 82 02"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Détails Réservation */}
              <div className="rounded-2xl bg-primary/8 border border-primary/15 p-5">
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">💰</span> Détails de la Réservation
                </h3>
                <p className="font-body text-base text-foreground/80">
                  Acompte : <span className="font-bold text-primary text-lg">30 000 FCFA</span>
                </p>
                <p className="font-body text-sm text-foreground/60 mt-1">
                  Solde à payer : à déterminer selon les services choisis
                </p>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🍽️</span> Services et Options
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Menu choisi</label>
                    <input type="text" value={form.menu} onChange={(e) => handleChange("menu", e.target.value)} placeholder="Décrivez le menu souhaité" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Boissons</label>
                    <input type="text" value={form.boissons} onChange={(e) => handleChange("boissons", e.target.value)} placeholder="Boissons souhaitées" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Décoration</label>
                    <input type="text" value={form.decoration} onChange={(e) => handleChange("decoration", e.target.value)} placeholder="Type de décoration" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Musique</label>
                    <input type="text" value={form.musique} onChange={(e) => handleChange("musique", e.target.value)} placeholder="DJ, groupe, playlist..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Autres services</label>
                    <input type="text" value={form.autresServices} onChange={(e) => handleChange("autresServices", e.target.value)} placeholder="Précisez vos besoins" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="rounded-2xl bg-destructive/5 border border-destructive/15 p-5">
                <h3 className="font-display text-base font-bold text-destructive uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">📌</span> Conditions de Réservation
                </h3>
                <ul className="font-body text-sm text-foreground/70 space-y-2">
                  <li>• L'acompte est <span className="font-bold">non remboursable</span> en cas d'annulation.</li>
                  <li>• Le solde doit être payé au plus tard <span className="font-bold">48 heures</span> avant l'événement.</li>
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

export default EventFormDialog;
