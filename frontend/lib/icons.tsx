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
  Puzzle,
  Users,
  GraduationCap,
  Blocks,
  Image,
  Quote,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

export const iconMap: Record<IconName, LucideIcon> = {
  speech: MessageCircle,
  occupational: Hand,
  physiotherapy: Activity,
  "special-education": BookOpen,
  "behavioral-therapy": Puzzle,
  "social-groups": Users,
  "school-readiness": GraduationCap,
  "play-groups": Blocks,
  pediatric: Baby,
  neurological: Brain,
  orthopedic: Bone,
  geriatric: HeartPulse,
  assessment: ClipboardList,
  plan: ListChecks,
  therapy: Stethoscope,
  progress: TrendingUp,
  gallery: Image,
  testimonials: Quote,
  briefcase: Briefcase,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = iconMap[name];
  return <Cmp className={className} aria-hidden="true" />;
}
