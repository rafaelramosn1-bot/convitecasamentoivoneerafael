import { createFileRoute } from "@tanstack/react-router";
import { CalendarPlus, MapPin, Gift, Heart, Clock, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/wedding/Reveal";
import { Countdown } from "@/components/wedding/Countdown";
import { GiftsDialog } from "@/components/wedding/GiftsDialog";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import monogram from "@/assets/monogram.png";
import coupleAsset from "@/assets/couple.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ivone & Rafael — 26.09.2026 | Convite de Casamento" },
      {
        name: "description",
        content:
          "Com a bênção de Deus e de nossos pais, convidamos você para celebrar o nosso casamento em 26 de setembro de 2026.",
      },
      { property: "og:title", content: "Ivone & Rafael — 26.09.2026" },
      {
        property: "og:description",
        content:
          "Convite digital: veja a localização e adicione a data ao seu calendário.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const MAPS_URL = "https://maps.app.goo.gl/8fGcMvLjXubdZ1Dh8";
const GCAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
  encodeURIComponent("Casamento de Ivone & Rafael") +
  "&dates=20260926T140000Z/20260926T190000Z&details=" +
  encodeURIComponent("Celebre conosco este dia especial. Local: " + MAPS_URL);

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ivone e Rafael//Casamento//PT",
    "BEGIN:VEVENT",
    "UID:casamento-ivone-rafael-2026@convite",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20260926T140000Z",
    "DTEND:20260926T190000Z",
    "SUMMARY:Casamento de Ivone & Rafael",
    `DESCRIPTION:Celebre conosco este dia especial. Local: ${MAPS_URL}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "casamento-ivone-rafael.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-border" />
      <Heart className="h-3.5 w-3.5 animate-heart text-primary" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}

function Invitation() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-lg px-5 pt-10 pb-24">
      <MusicToggle />

      {/* Hero */}
      <header className="text-center">
        <img
          src={monogram}
          alt="Monograma de Ivone e Rafael"
          width={816}
          height={816}
          className="mx-auto h-44 w-44 animate-float object-contain"
        />
        <h1 className="font-serif text-4xl font-light tracking-wide text-royal">
          Ivone <span className="font-script">&</span> Rafael
        </h1>
        <p className="mt-4 text-[0.7rem] tracking-[0.42em] text-muted-foreground uppercase">
          26 / 09 / 2026
        </p>
        <Divider />
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
          Com a bênção de Deus e de nossos pais, convidamos você para celebrar o nosso
          casamento!
        </p>
      </header>

      {/* Photo */}
      <Reveal className="mt-10">
        <div className="rounded-[2rem] bg-card p-2 shadow-glow">
          <img
            src={coupleAsset.url}
            alt="Retrato de Ivone e Rafael"
            width={912}
            height={1104}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
          />
        </div>
      </Reveal>

      {/* Countdown */}
      <Reveal className="mt-12" delay={80}>
        <section className="text-center">
          <h2 className="font-serif text-2xl text-foreground">Contagem regressiva</h2>
          <p className="mt-1 mb-5 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Para o nosso grande dia
          </p>
          <Countdown />
        </section>
      </Reveal>

      {/* Details */}
      <Reveal className="mt-12" delay={80}>
        <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft">
          <h2 className="text-center font-serif text-2xl text-royal">Detalhes do evento</h2>
          <Divider />
          <ul className="space-y-5">
            <li className="flex gap-4">
              <Church className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="font-serif text-lg">Cerimônia & Recepção</p>
                <p className="text-sm text-muted-foreground">
                  Toque no botão abaixo para ver o endereço completo no mapa.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="font-serif text-lg">Sábado, 26 de Setembro de 2026</p>
                <p className="text-sm text-muted-foreground">Às 11h — chegue com 20 min de antecedência.</p>
              </div>
            </li>
          </ul>
        </section>
      </Reveal>

      {/* Actions */}
      <Reveal className="mt-8 space-y-3" delay={80}>
        <Button variant="royal" size="xl" className="w-full" asChild>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-4 w-4" />
            Ver Localização no Mapa
          </a>
        </Button>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="elegant" size="xl" className="w-full" asChild>
            <a href={GCAL_URL} target="_blank" rel="noopener noreferrer">
              <CalendarPlus className="h-4 w-4" />
              Agende para lembrar
            </a>
          </Button>
          <Button variant="elegant" size="xl" className="w-full" onClick={downloadIcs}>
            <CalendarPlus className="h-4 w-4" />
            Apple / iCal
          </Button>
        </div>

        <GiftsDialog
          trigger={
            <Button variant="elegant" size="xl" className="w-full">
              <Gift className="h-4 w-4" />
              Ajude com Pix
            </Button>
          }
        />
      </Reveal>

      <Reveal className="mt-14 text-center" delay={60}>
        <Divider />
        <p className="font-script text-2xl text-royal">Esperamos por você</p>
        <p className="mt-2 text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          Ivone &amp; Rafael · 26.09.2026
        </p>
      </Reveal>
    </main>
  );
}
