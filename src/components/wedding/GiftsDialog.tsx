import type { ReactNode } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PIX_KEY = "11 99770-2786";

export function GiftsDialog({ trigger }: { trigger: ReactNode }) {
  const copy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    toast.success("Chave PIX copiada!", { description: PIX_KEY });
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
            Sua presença já é o maior presente. Se desejar nos abençoar com algo mais, use nossa chave PIX:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="rounded-2xl border border-border bg-secondary/50 p-4">
            <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
              Chave PIX
            </p>
            <p className="mt-2 font-serif text-lg break-all text-foreground">{PIX_KEY}</p>
            <Button onClick={copy} variant="royal" className="mt-3 w-full">
              <Copy className="h-4 w-4" />
              Copiar chave PIX
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
