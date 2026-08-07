import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Copy, QrCode } from "lucide-react";
import QRCode from "qrcode";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { buildPixPayload } from "@/lib/pix";

const PIX_KEY = "11 99770-2786";
const PIX_KEY_RAW = "+5511997702786";

export function GiftsDialog({ trigger }: { trigger: ReactNode }) {
  const [qr, setQr] = useState<string | null>(null);

  const payload = useMemo(
    () =>
      buildPixPayload({
        key: PIX_KEY_RAW,
        name: "IVONE E RAFAEL",
        city: "SAO PAULO",
      }),
    [],
  );

  useEffect(() => {
    QRCode.toDataURL(payload, {
      margin: 1,
      width: 512,
      color: { dark: "#1e2a5a", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(null));
  }, [payload]);

  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    toast.success(label);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-royal">
            Presente Pix
          </DialogTitle>
          <DialogDescription>
            Sua presença já é o maior presente. Se desejar nos abençoar com algo mais, use o QR Code ou nossa chave PIX:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-4">
            {qr ? (
              <img
                src={qr}
                alt="QR Code da chave PIX de Ivone e Rafael"
                width={512}
                height={512}
                className="h-44 w-44 rounded-xl"
              />
            ) : (
              <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-secondary/50">
                <QrCode className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <p className="text-center text-xs text-muted-foreground">
              Escaneie com o app do seu banco
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/50 p-4">
            <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              Chave PIX
            </p>
            <p className="mt-2 font-serif text-lg break-all text-foreground">{PIX_KEY}</p>
            <Button
              onClick={() => copy(PIX_KEY, "Chave PIX copiada!")}
              variant="royal"
              className="mt-3 w-full"
            >
              <Copy className="h-4 w-4" />
              Copiar chave PIX
            </Button>
            <Button
              onClick={() => copy(payload, "Código Pix copia e cola copiado!")}
              variant="elegant"
              className="mt-2 w-full"
            >
              <QrCode className="h-4 w-4" />
              Copiar código Pix
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
