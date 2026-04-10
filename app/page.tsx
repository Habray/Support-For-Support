import Link from "next/link";
import {
  Building2,
  Code,
  Flame,
  Globe,
  LogIn,
  ScrollText,
  Smile,
  Trophy,
  User,
} from "lucide-react";

import { RageGraceDemo } from "@/components/rage-grace-demo";
import { SfsRewriterTool } from "@/components/sfs-rewriter-tool";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TAGLINE =
  "Turning 'did you even read the docs?' into 'here's a helpful link!'";

const TESTIMONIALS = [
  {
    icon: Trophy,
    quote:
      "I was one send away from HR. SFS turned my novel into something I could actually paste in Slack.",
    by: "Definitely a real person, probably",
  },
  {
    icon: User,
    quote:
      "My ticket queue used to look like a crime scene. Now it looks like I meditate between replies.",
    by: "Tier-2 legend (self-appointed)",
  },
  {
    icon: Smile,
    quote:
      "It’s like having a therapist who only cares about your tone and won’t judge your browser history.",
    by: "Anonymous, but cheerful",
  },
  {
    icon: ScrollText,
    quote:
      "We rolled it out team-wide. Escalations down 40%. Sarcasm up 0%, which was the whole point.",
    by: "Support lead, fictional but accurate",
  },
];

export default function Home() {
  return (
    <div className="noise-bg flex min-h-screen flex-col bg-background">
      <nav className="relative z-10 mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="size-6 text-primary" aria-hidden />
          <span className="font-display text-lg font-bold text-foreground">
            S<span className="text-gradient-fire">FS</span>
          </span>
        </Link>
        {/* <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2 font-display text-muted-foreground hover:text-foreground"
          )}
        >
          <LogIn className="size-4" />
          Sign in
        </Link> */}
      </nav>

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-16">
        <section className="mb-10 text-center">
          <p className="mb-4 text-5xl" aria-hidden>
            🔥
          </p>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-foreground md:text-6xl">
            You typed it{" "}
            <span className="text-gradient-fire">angry</span>.
            <br />
            We&apos;ll ship it{" "}
            <span className="text-gradient-calm">classy</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
            {TAGLINE}
          </p>
        </section>

        <SfsRewriterTool />

        <div className="relative z-10 mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-3 text-sm">
          <Badge
            variant="outline"
            className="rounded-full border-orange-500/40 bg-muted/40 px-3 py-1.5 font-mono text-orange-300/90"
          >
            <span className="text-primary">01</span>
            <span className="ml-1.5">Paste your rage</span>
          </Badge>
          <span className="text-muted-foreground/30">→</span>
          <Badge
            variant="outline"
            className="rounded-full border-violet-500/35 bg-muted/40 px-3 py-1.5 font-mono text-violet-200/90"
          >
            <span className="text-secondary">02</span>
            <span className="ml-1.5">Hit the button</span>
          </Badge>
          <span className="text-muted-foreground/30">→</span>
          <Badge
            variant="outline"
            className="rounded-full border-cyan-500/35 bg-muted/40 px-3 py-1.5 font-mono text-cyan-200/85"
          >
            <span className="text-accent">03</span>
            <span className="ml-1.5">Copy &amp; send guilt-free</span>
          </Badge>
        </div>

        <section className="relative z-10 mt-24 w-full max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            The <span className="text-gradient-fire">Rage</span>
            {" → "}
            <span className="text-gradient-calm">Grace</span> Machine
          </h2>
          <p className="mt-2 text-muted-foreground">
            Watch the magic happen in real time
          </p>

          <div className="mt-10 flex w-full flex-col items-stretch gap-8 md:flex-row md:items-start md:justify-center md:gap-6 lg:gap-10">
            <RageGraceDemo />
          </div>
        </section>

        <section className="relative z-10 mt-24 w-full max-w-4xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Wall of <span className="text-gradient-calm">Saved Careers</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Totally real reviews from definitely real people
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.by}
                className="border-border/80 bg-card/80 py-5 ring-foreground/5"
              >
                <CardContent className="space-y-3 px-5">
                  <t.icon className="size-6 text-primary" aria-hidden />
                  <p className="font-mono text-sm leading-relaxed text-foreground">
                    “{t.quote}”
                  </p>
                  <p className="text-xs text-muted-foreground">— {t.by}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative z-10 mt-24 w-full max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold">
            Stalk Me (professionally)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            I promise I won&apos;t reply rudely. I use my own product too.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/parbat-limbu/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2 rounded-xl border-border bg-card/60 no-underline"
              )}
            >
              <Building2 className="size-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/habray"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2 rounded-xl border-border bg-card/60 no-underline"
              )}
            >
              <Code className="size-4" />
              GitHub
            </a>
            <Link
              href="https://parbatlimbu.dev"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2 rounded-xl border-border bg-card/60"
              )}
            >
              <Globe className="size-4" />
              Website
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Flame className="size-4 text-primary" aria-hidden />
            <span className="font-display text-sm text-muted-foreground">
              S<span className="text-gradient-fire font-semibold">FS</span>{" "}
              — Support For Support.
            </span>
          </div>
          <p className="text-center font-mono text-xs text-muted-foreground/50">
            No support agents were harmed. Their dignity? That&apos;s on you…
          </p>
        </div>
      </footer>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 size-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 size-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>
    </div>
  );
}
