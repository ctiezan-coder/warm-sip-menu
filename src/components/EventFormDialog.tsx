import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, PartyPopper } from "lucide-react";
import { MessageCircle } from "lucide-react";

interface EventFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const EventFormDialog = ({ open, onClose }: EventFormDialogProps) => {
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

  const handleSubmit = () => {
    const msg = `📋 *Fiche de Réception - Réservation d'Événement*

🎉 *Informations sur l'Événement*
• Type d'événement : ${form.typeEvenement || "Non précisé"}
• Nombre de personnes : ${form.nombrePersonnes || "Non précisé"}
• Date : ${form.date || "Non précisé"}
• Heure : ${form.heure || "Non précisé"}

👤 *Informations de Contact*
• Nom : ${form.nom || "Non précisé"}
• Téléphone : ${form.telephone || "Non précisé"}

💰 *Détails de la Réservation*
• Acompte versé : 30 000 FCFA (pour valider la réservation)
• Solde à payer : à déterminer en fonction des services choisis

🍽️ *Services et Options*
• Menu choisi : ${form.menu || "Non précisé"}
• Boissons : ${form.boissons || "Non précisé"}
• Décoration : ${form.decoration || "Non précisé"}
• Musique : ${form.musique || "Non précisé"}
• Autres services : ${form.autresServices || "Non précisé"}

📌 *Conditions de Réservation*
• L'acompte est non remboursable en cas d'annulation.
• Le solde doit être payé au plus tard 48h avant l'événement.

Merci de confirmer ma réservation ! 😊`;

    const url = `https://wa.me/2250789288202?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-6 px-4"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-card shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.3)] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-b border-primary/20 p-5 sm:p-6 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              <PartyPopper className="mx-auto text-primary mb-2" size={32} />
              <h2 className="font-display text-lg sm:text-xl font-bold text-primary uppercase tracking-[0.1em]">
                Fiche de Réception
              </h2>
              <p className="font-body text-xs sm:text-sm text-foreground/60 mt-1">
                Réservation d'Événement
              </p>
            </div>

            {/* Form */}
            <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Infos Événement */}
              <div>
                <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>🎉</span> Informations sur l'Événement
                </h3>
                <div className="grid gap-3">
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Type d'événement</label>
                    <select
                      value={form.typeEvenement}
                      onChange={(e) => handleChange("typeEvenement", e.target.value)}
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
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
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Nombre de personnes</label>
                    <input
                      type="number"
                      value={form.nombrePersonnes}
                      onChange={(e) => handleChange("nombrePersonnes", e.target.value)}
                      placeholder="Ex: 50"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-body text-xs text-foreground/70 mb-1 block">Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-foreground/70 mb-1 block">Heure</label>
                      <input
                        type="time"
                        value={form.heure}
                        onChange={(e) => handleChange("heure", e.target.value)}
                        className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos Contact */}
              <div>
                <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>👤</span> Informations de Contact
                </h3>
                <div className="grid gap-3">
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Nom</label>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={(e) => handleChange("nom", e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Numéro de téléphone</label>
                    <input
                      type="tel"
                      value={form.telephone}
                      onChange={(e) => handleChange("telephone", e.target.value)}
                      placeholder="Ex: 07 89 28 82 02"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                </div>
              </div>

              {/* Détails Réservation */}
              <div className="rounded-xl bg-primary/5 border border-primary/15 p-4">
                <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>💰</span> Détails de la Réservation
                </h3>
                <p className="font-body text-sm text-foreground/80">
                  Acompte : <span className="font-bold text-primary">30 000 FCFA</span> (pour valider la réservation)
                </p>
                <p className="font-body text-xs text-foreground/60 mt-1">
                  Solde à payer : à déterminer en fonction des services choisis
                </p>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span>🍽️</span> Services et Options
                </h3>
                <div className="grid gap-3">
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Menu choisi</label>
                    <input
                      type="text"
                      value={form.menu}
                      onChange={(e) => handleChange("menu", e.target.value)}
                      placeholder="Décrivez le menu souhaité"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Boissons</label>
                    <input
                      type="text"
                      value={form.boissons}
                      onChange={(e) => handleChange("boissons", e.target.value)}
                      placeholder="Boissons souhaitées"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Décoration</label>
                    <input
                      type="text"
                      value={form.decoration}
                      onChange={(e) => handleChange("decoration", e.target.value)}
                      placeholder="Type de décoration"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Musique</label>
                    <input
                      type="text"
                      value={form.musique}
                      onChange={(e) => handleChange("musique", e.target.value)}
                      placeholder="DJ, groupe, playlist..."
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-foreground/70 mb-1 block">Autres services</label>
                    <input
                      type="text"
                      value={form.autresServices}
                      onChange={(e) => handleChange("autresServices", e.target.value)}
                      placeholder="Précisez vos besoins"
                      className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
                    />
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="rounded-xl bg-destructive/5 border border-destructive/15 p-4">
                <h3 className="font-display text-sm font-bold text-destructive uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>📌</span> Conditions de Réservation
                </h3>
                <ul className="font-body text-xs text-foreground/70 space-y-1.5">
                  <li>• L'acompte est <span className="font-semibold">non remboursable</span> en cas d'annulation.</li>
                  <li>• Le solde doit être payé au plus tard <span className="font-semibold">48 heures</span> avant l'événement.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-border">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-body font-bold text-sm sm:text-base py-3.5 rounded-full transition-colors shadow-lg"
              >
                <MessageCircle size={18} fill="white" strokeWidth={0} />
                Envoyer sur WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventFormDialog;
