import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/neriya-logo.png";

const QRCodePage = () => {
  const menuUrl = "https://warm-sip-menu.lovable.app";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="bg-card rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col items-center gap-6 max-w-md w-full">
        <img src={logo} alt="Neriya Logo" className="w-24 h-24 rounded-full object-cover" />
        <h1 className="text-2xl font-bold text-foreground text-center">Menu Digital Neriya</h1>
        <p className="text-muted-foreground text-center text-sm">
          Scannez ce QR code pour accéder au menu
        </p>
        <div className="bg-white p-4 rounded-xl">
          <QRCodeSVG
            value={menuUrl}
            size={220}
            level="H"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
        <p className="text-xs text-muted-foreground break-all text-center">{menuUrl}</p>
      </div>
    </div>
  );
};

export default QRCodePage;
