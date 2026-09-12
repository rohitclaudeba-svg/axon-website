import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/AnimatedReveal";

export function CTASection({
  title = "Ready to take the next step?",
  description = "Book an appointment with AXON's care team and let's build a personalised plan together.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-primary-dark to-primary py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/85">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/book-appointment" variant="secondary">
              Book an Appointment
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
