import { ImageIcon } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

const placeholderCount = 8;

export function GalleryGrid() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <StaggerItem key={index}>
          <div className="flex aspect-square items-center justify-center rounded-2xl border border-navy/8 bg-light-blue text-primary/40">
            <ImageIcon className="h-8 w-8" aria-hidden="true" />
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
