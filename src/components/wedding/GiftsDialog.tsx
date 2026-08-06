import type { ReactNode } from "react";
import { toast } from "sonner";
import { Copy, Gift, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PIX_KEY = "casamento.isabela.rafael@email.com";

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
            Lista de Presentes
          </DialogTitle>
          <DialogDescription>
            Sua presença já é o maior presente. Se desejar nos abençoar com algo mais:
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

          <a
            href="https://www.amazon.com.br/wedding/registry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-3 text-sm font-medium">
              <Gift className="h-4 w-4 text-primary" />
              Lista externa de presentes
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
