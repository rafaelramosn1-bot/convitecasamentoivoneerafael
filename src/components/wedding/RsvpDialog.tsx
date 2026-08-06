import { useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ReactNode } from "react";

export function RsvpDialog({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("sim");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return;
    }
    setOpen(false);
    toast.success(
      attending === "sim"
        ? `Obrigado, ${name.split(" ")[0]}! Sua presença está confirmada.`
        : `Recebemos sua resposta, ${name.split(" ")[0]}. Sentiremos sua falta!`,
      { description: "Mal podemos esperar para celebrar com você." },
    );
    setName("");
    setMessage("");
    setGuests("1");
    setAttending("sim");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-royal">
            Confirmar Presença
          </DialogTitle>
          <DialogDescription>
            Sua resposta nos ajuda a preparar cada detalhe com carinho.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="rsvp-name">Nome completo</Label>
            <Input
              id="rsvp-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>

          <div className="space-y-3">
            <Label>Você vai comparecer?</Label>
            <RadioGroup
              value={attending}
              onValueChange={setAttending}
              className="grid grid-cols-2 gap-3"
            >
              {(
                [
                  ["sim", "Sim, estarei lá"],
                  ["nao", "Não poderei ir"],
                ] as const
              ).map(([value, label]) => (

                <Label
                  key={value}
                  htmlFor={`att-${value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-secondary/40 px-3 py-3 text-xs font-medium has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-accent"
                >
                  <RadioGroupItem id={`att-${value}`} value={value} />
                  {label}
                </Label>
              ))}
            </RadioGroup>
          </div>

          {attending === "sim" && (
            <div className="space-y-2">
              <Label htmlFor="rsvp-guests">Número de convidados</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger id="rsvp-guests">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "pessoa" : "pessoas"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="rsvp-msg">Restrições alimentares ou recado (opcional)</Label>
            <Textarea
              id="rsvp-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Ex.: vegetariano, sem glúten, ou deixe um recado carinhoso"
            />
          </div>

          <Button type="submit" variant="royal" size="xl" className="w-full">
            <Heart className="h-4 w-4" />
            Enviar confirmação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
