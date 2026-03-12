import { useState, useMemo } from "react";
import { X, MessageCircle, MapPin, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface DeliveryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DELIVERY_ZONES = [
  { label: "Yopougon", fee: 1000, feeLabel: "1 000 FCFA" },
  { label: "Hors Yopougon (sauf Bingerville et Marcory)", fee: 1500, feeLabel: "1 500 FCFA" },
];

const parsePrice = (price: string): number => {
  const cleaned = price.replace(/[^0-9]/g, "");
  return parseInt(cleaned, 10) || 0;
};

const formatPrice = (amount: number): string => {
  return amount.toLocaleString("fr-FR") + " FCFA";
};

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
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[81] grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-primary/20 bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="flex flex-col space-y-1.5">
            <DialogPrimitive.Title className="font-display text-primary text-xl uppercase tracking-wider">
              🚚 Livraison
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="font-body text-muted-foreground text-sm">
              Remplissez vos informations pour la livraison
            </DialogPrimitive.Description>
          </div>

          <div className="space-y-4 mt-2">
            {/* Client Name */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-1.5">
                <User size={14} className="text-primary" /> Nom du client
              </label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Votre nom"
                className="bg-secondary/30 border-primary/15 focus:border-primary/40"
                maxLength={100}
              />
            </div>

            {/* Delivery Zone */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" /> Lieu de livraison
              </label>
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger className="bg-secondary/30 border-primary/15 focus:border-primary/40">
                  <SelectValue placeholder="Choisir un lieu" />
                </SelectTrigger>
                <SelectContent className="z-[90]">
                  {DELIVERY_ZONES.map((z) => (
                    <SelectItem key={z.label} value={z.label}>
                      {z.label} — {z.feeLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="font-body text-xs font-semibold text-foreground/80 uppercase tracking-wider flex items-center gap-1.5">
                <Phone size={14} className="text-primary" /> Numéro de téléphone
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07 XX XX XX XX"
                type="tel"
                className="bg-secondary/30 border-primary/15 focus:border-primary/40"
                maxLength={20}
              />
            </div>

            {/* Price Summary */}
            <div className="rounded-xl bg-secondary/20 border border-primary/10 p-4 space-y-2">
              <div className="flex justify-between font-body text-sm text-foreground/80">
                <span>Sous-total ({totalItems} article{totalItems > 1 ? "s" : ""})</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-foreground/80">
                <span>Frais de livraison</span>
                <span className="font-semibold">{zone ? formatPrice(deliveryFee) : "—"}</span>
              </div>
              <div className="h-px bg-primary/15" />
              <div className="flex justify-between font-body text-base font-bold text-primary">
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
