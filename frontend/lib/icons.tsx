import {
  MessageCircle,
  Hand,
  Activity,
  BookOpen,
  Baby,
  Brain,
  Bone,
  HeartPulse,
  ClipboardList,
  ListChecks,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

export const iconMap: Record<IconName, LucideIcon> = {
  speech: MessageCircle,
  occupational: Hand,
  physiotherapy: Activity,
  "special-education": BookOpen,
  pediatric: Baby,
  neurological: Brain,
  orthopedic: Bone,
  geriatric: HeartPulse,
  assessment: ClipboardList,
  plan: ListChecks,
  therapy: Stethoscope,
  progress: TrendingUp,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = iconMap[name];
  return <Cmp className={className} aria-hidden="true" />;
}
