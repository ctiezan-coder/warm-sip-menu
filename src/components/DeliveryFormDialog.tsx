import { useState, useMemo } from "react";
import { X, MessageCircle, MapPin, User, Phone, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface DeliveryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DELIVERY_ZONES = [
  { label: "Yopougon", fee: 1000, feeLabel: "1 000 FCFA" },
  { label: "Hors Yopougon", fee: 1500, feeLabel: "1 500 FCFA" },
  { label: "Faya / Bingerville / Port-Bouët", fee: 2000, feeLabel: "2 000 FCFA" },
];

const parsePrice = (price: string): number => {
  const cleaned = price.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
};

const formatPrice = (amount: number): string => {
  return amount.toLocaleString("fr-FR") + " FCFA";
};

const inputClass =
  "w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-colors";

const labelClass =
  "font-body text-sm font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-2 mb-1.5";

const DeliveryFormDialog = ({ open, onOpenChange }: DeliveryFormDialogProps) => {
  const { items, totalItems } = useCart();
  const [clientName, setClientName] = useState("");
  const [zone, setZone] = useState("");
  const [phone, setPhone] = useState("");

  const selectedZone = DELIVERY_ZONES.find((z) => z.label === zone);
  const deliveryFee = selectedZone?.fee || 0;

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [items]
  );

  const total = subtotal + deliveryFee;
  const isValid = clientName.trim() && zone && phone.trim() && items.length > 0;

  const buildWhatsAppUrl = () => {
    const lines = items.map((i) => `• ${i.name} x${i.quantity} — ${i.price}`).join("\n");
    const message = [
      `Bonjour Neriya ! 🍽️ Commande Livraison`,
      ``,
      `👤 *Nom :* ${clientName.trim()}`,
      `📍 *Lieu :* ${zone}`,
      `📞 *Téléphone :* ${phone.trim()}`,
      ``,
      `🛒 *Commande :*`,
      lines,
      ``,
      `💰 *Sous-total :* ${formatPrice(subtotal)}`,
      `🚚 *Livraison :* ${formatPrice(deliveryFee)}`,
      `📦 *Total :* ${formatPrice(total)}`,
      ``,
      `Merci de confirmer ma commande ! 😊`,
    ].join("\n");
    return `https://wa.me/2250789288202?text=${encodeURIComponent(message)}`;
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[81] w-full max-w-md translate-x-[-50%] translate-y-[-50%] border border-primary/20 bg-card shadow-[0_25px_80px_-12px_hsl(var(--primary)/0.3)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-primary/15 via-primary/8 to-accent/8 border-b border-primary/15 px-6 py-5 sm:py-6 text-center">
            <DialogPrimitive.Close className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-card/50 border border-border text-foreground/50 hover:text-foreground hover:bg-card transition-all">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <Truck className="mx-auto text-primary mb-2" size={36} />
            <DialogPrimitive.Title className="font-display text-xl sm:text-2xl font-bold text-primary uppercase tracking-[0.12em]">
              Livraison
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="font-body text-sm text-foreground/60 mt-1">
              Remplissez vos informations
            </DialogPrimitive.Description>
          </div>

          <div className="px-5 sm:px-6 py-5 space-y-5">
            {/* Client Name */}
            <div>
              <label className={labelClass}>
                <User size={15} className="text-primary" /> Nom du client
              </label>
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Votre nom"
                className={inputClass}
                maxLength={100}
              />
            </div>

            {/* Delivery Zone */}
            <div>
              <label className={labelClass}>
                <MapPin size={15} className="text-primary" /> Lieu de livraison
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className={inputClass}
              >
                <option value="">Choisir un lieu</option>
                {DELIVERY_ZONES.map((z) => (
                  <option key={z.label} value={z.label}>
                    {z.label} — {z.feeLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                <Phone size={15} className="text-primary" /> Numéro de téléphone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07 XX XX XX XX"
                type="tel"
                className={inputClass}
                maxLength={20}
              />
            </div>

            {/* Price Summary */}
            <div className="rounded-2xl bg-secondary/20 border border-primary/10 p-5 space-y-2.5">
              <div className="flex justify-between font-body text-base text-foreground/80">
                <span>Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body text-base text-foreground/80">
                <span>Frais de livraison</span>
                <span className="font-semibold">{zone ? formatPrice(deliveryFee) : "—"}</span>
              </div>
              <div className="h-px bg-primary/15" />
              <div className="flex justify-between font-body text-lg font-bold text-primary">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={isValid ? buildWhatsAppUrl() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!isValid) e.preventDefault(); }}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-body font-bold text-base uppercase tracking-wider transition-all shadow-lg ${
                isValid
                  ? "bg-[#25D366] hover:bg-[#1ebe57] text-white hover:scale-[1.02] active:scale-[0.98] shadow-[#25D366]/30 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              <MessageCircle size={22} fill={isValid ? "white" : "currentColor"} strokeWidth={0} />
              Commander sur WhatsApp
            </a>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default DeliveryFormDialog;
