import Link from "next/link";
import { Icon } from "@/lib/icons";
import { services } from "@/content/services";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { Container } from "@/components/ui/Container";

export function QuickServiceNav() {
  return (
    <div className="border-b border-navy/8 bg-white">
      <Container className="py-6">
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-xl px-3 py-4 text-center transition-colors duration-200 hover:bg-light-blue"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-light-blue text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span className="font-heading text-xs font-semibold text-navy sm:text-sm">
                  {service.name}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </div>
  );
}
