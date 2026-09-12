import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-light-blue">
      <Container className="flex flex-col items-center py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-navy">Page not found</h1>
        <p className="mt-4 max-w-md text-navy/70">
          The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you
          back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="ghost">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
