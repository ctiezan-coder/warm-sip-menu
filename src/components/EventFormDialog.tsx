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

const checkboxLabelClass = "flex items-center gap-2.5 font-body text-sm text-foreground/80 cursor-pointer";

const EventFormDialog = ({ open, onClose }: EventFormDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    typeEvenement: "",
    nombrePersonnes: "",
    nom: "",
    lieu: "",
    date: "",
    heure: "",
    menu1: "",
    menu2: "",
    menu3: "",
    boissonJus: false,
    boissonEau: false,
    boissonAutre: false,
    boissonAutrePrecision: "",
    nombreInvites: "",
    serviceBuffet: false,
    serviceTable: false,
    remarques: "",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = form.nom.trim() && form.lieu.trim();

  const handleSubmit = async () => {
    if (!isValid) return;
    setSaving(true);

    const boissons = [
      form.boissonJus && "Jus",
      form.boissonEau && "Eau",
      form.boissonAutre && `Autre: ${form.boissonAutrePrecision || "Non précisé"}`,
    ].filter(Boolean).join(", ") || "Non précisé";

    const typeService = [
      form.serviceBuffet && "Buffet",
      form.serviceTable && "Service à table",
    ].filter(Boolean).join(", ") || "Non précisé";

    const menus = [form.menu1, form.menu2, form.menu3].filter(Boolean).join(" | ") || "Non précisé";

    // Save to database
    const { error } = await supabase.from("event_reservations").insert({
      event_type: "Réception",
      client_name: form.nom.trim(),
      client_phone: "-",
      guest_count: form.nombreInvites ? parseInt(form.nombreInvites) : null,
      event_date: form.date || null,
      event_time: form.heure || null,
      menu_choice: menus,
      drinks: boissons,
      decoration: typeService,
      other_services: form.remarques || null,
      music: form.lieu.trim(),
    });

    if (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
      setSaving(false);
      return;
    }

    // Send WhatsApp
    const msg = `📋 *FORMULAIRE DE COMMANDE DE SERVICE DE RÉCEPTION*

🎉 *Informations sur la Cérémonie*
• Nom du client : ${form.nom}
• Lieu : ${form.lieu}
• Date : ${form.date || "Non précisé"}
• Heure : ${form.heure || "Non précisé"}

🍽️ *Choix du Menu*
• ${menus}

🥤 *Boissons*
• ${boissons}

👥 *Options de Service*
• Nombre d'invités : ${form.nombreInvites || "Non précisé"}
• Type de service : ${typeService}

💰 *Conditions de Paiement*
• Acompte : 80% du montant total à la signature
• Solde : le jour de la cérémonie

📝 *Remarques / Demandes Spéciales*
${form.remarques || "Aucune"}

Merci de confirmer ma commande ! 😊`;

    window.open(`https://wa.me/2250789288202?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Commande envoyée !");
    setSaving(false);
    setForm({
      nom: "", lieu: "", date: "", heure: "", typeEvenement: "", nombrePersonnes: "",
      menu1: "", menu2: "", menu3: "",
      boissonJus: false, boissonEau: false, boissonAutre: false, boissonAutrePrecision: "",
      nombreInvites: "", serviceBuffet: false, serviceTable: false, remarques: "",
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
              <PartyPopper className="mx-auto text-primary mb-3" size={40} />
              <h2 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em]">
                Commande de Service de Réception
              </h2>
            </div>

            {/* Form */}
            <div className="px-5 sm:px-6 py-6 space-y-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
              {/* Infos Cérémonie */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🎉</span> Informations sur la Cérémonie
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Type d'événement</label>
                    <input type="text" value={form.typeEvenement} onChange={(e) => handleChange("typeEvenement", e.target.value)} placeholder="Ex: Anniversaire, Mariage..." className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Nombre de personnes</label>
                    <input type="number" value={form.nombrePersonnes} onChange={(e) => handleChange("nombrePersonnes", e.target.value)} placeholder="Ex: 50" className={inputClass} />
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
                  <div>
                    <label className={labelClass}>Nom du client *</label>
                    <input type="text" value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} placeholder="Votre nom complet" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Lieu de la cérémonie *</label>
                    <input type="text" value={form.lieu} onChange={(e) => handleChange("lieu", e.target.value)} placeholder="Adresse ou lieu" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Choix du Menu */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🍽️</span> Choix du Menu
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Menu 1</label>
                    <input type="text" value={form.menu1} onChange={(e) => handleChange("menu1", e.target.value)} placeholder="Décrivez le menu 1" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Menu 2</label>
                    <input type="text" value={form.menu2} onChange={(e) => handleChange("menu2", e.target.value)} placeholder="Décrivez le menu 2" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Menu 3</label>
                    <input type="text" value={form.menu3} onChange={(e) => handleChange("menu3", e.target.value)} placeholder="Décrivez le menu 3" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Boissons */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">🥤</span> Boissons
                </h3>
                <div className="grid gap-3">
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" checked={form.boissonJus} onChange={(e) => handleChange("boissonJus", e.target.checked)} className="w-4 h-4 accent-primary rounded" />
                    Jus
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" checked={form.boissonEau} onChange={(e) => handleChange("boissonEau", e.target.checked)} className="w-4 h-4 accent-primary rounded" />
                    Eau
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" checked={form.boissonAutre} onChange={(e) => handleChange("boissonAutre", e.target.checked)} className="w-4 h-4 accent-primary rounded" />
                    Autre
                  </label>
                  {form.boissonAutre && (
                    <input type="text" value={form.boissonAutrePrecision} onChange={(e) => handleChange("boissonAutrePrecision", e.target.value)} placeholder="Précisez..." className={inputClass} />
                  )}
                </div>
              </div>

              {/* Options de Service */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">👥</span> Options de Service
                </h3>
                <div className="grid gap-4">
                  <div>
                    <label className={labelClass}>Nombre d'invités</label>
                    <input type="number" value={form.nombreInvites} onChange={(e) => handleChange("nombreInvites", e.target.value)} placeholder="Ex: 100" className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Conditions de Paiement */}
              <div className="rounded-2xl bg-primary/8 border border-primary/15 p-5">
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-lg">💰</span> Conditions de Paiement
                </h3>
                <ul className="font-body text-sm text-foreground/70 space-y-2">
                  <li>• Un acompte de <span className="font-bold text-primary">80%</span> du montant total sera versé à la signature du contrat.</li>
                  <li>• Le solde sera payé le jour de la cérémonie.</li>
                </ul>
              </div>

              {/* Remarques */}
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-lg">📝</span> Remarques & Demandes Spéciales
                </h3>
                <textarea
                  value={form.remarques}
                  onChange={(e) => handleChange("remarques", e.target.value)}
                  placeholder="Précisez tout détail important pour votre événement..."
                  rows={4}
                  className={`${inputClass} min-h-[100px] resize-none`}
                />
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
