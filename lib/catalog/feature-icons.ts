import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Armchair,
  Bath,
  BellRing,
  Building2,
  Car,
  DoorOpen,
  Droplets,
  Eye,
  Flame,
  Footprints,
  Heater,
  Landmark,
  Layers,
  MapPin,
  Megaphone,
  Microwave,
  Package,
  PanelTop,
  Refrigerator,
  Settings2,
  ShieldCheck,
  Sparkles,
  Store,
  Sun,
  Thermometer,
  TrainFront,
  Trees,
  Users,
  WashingMachine,
  Waves,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";

interface FeatureIconRule {
  keywords: string[];
  icon: LucideIcon;
}

const FEATURE_ICON_RULES: FeatureIconRule[] = [
  { keywords: ["первая линия", "угловая", "углов"], icon: MapPin },
  { keywords: ["реклам", "фасад", "вывеск", "баннер", "возможност"], icon: Megaphone },
  { keywords: ["парков", "стоянк", "м/м"], icon: Car },
  { keywords: ["с/у", "сануз", "туалет", "ванн", "уборн"], icon: Bath },
  { keywords: ["водоснаб", "водопров", "вода"], icon: Droplets },
  { keywords: ["канализа", "сток"], icon: Waves },
  {
    keywords: ["инженер", "систем", "электр", "вентиля", "исправно", "работают"],
    icon: Settings2,
  },
  { keywords: ["кондицион", "климат"], icon: AirVent },
  { keywords: ["ремонт", "косметич", "отделк"], icon: Wrench },
  { keywords: ["тепл", "отопл", "атопл", "обогрев", "автономн"], icon: Thermometer },
  { keywords: ["газ"], icon: Flame },
  { keywords: ["отопител", "радиатор"], icon: Heater },
  { keywords: ["вход", "входная группа", "отдельн"], icon: DoorOpen },
  { keywords: ["проходим", "трафик", "поток"], icon: Footprints },
  { keywords: ["окн", "вид", "панорам"], icon: Eye },
  { keywords: ["свет", "естественн"], icon: Sun },
  { keywords: ["охран", "безопас", "видеонаблюд", "сигнализа"], icon: ShieldCheck },
  { keywords: ["метро", "транспорт", "остановк"], icon: TrainFront },
  { keywords: ["склад", "хранен"], icon: Package },
  { keywords: ["торгов", "магазин", "ритейл", "витрин"], icon: Store },
  { keywords: ["офис", "бизнес", "коворк"], icon: Building2 },
  { keywords: ["якор", "арендатор", "сосед"], icon: Users },
  { keywords: ["мебел"], icon: Armchair },
  { keywords: ["техник", "оборудован"], icon: Microwave },
  { keywords: ["стиральн"], icon: WashingMachine },
  { keywords: ["холодильн"], icon: Refrigerator },
  { keywords: ["интернет", "wi-fi", "wifi"], icon: Wifi },
  { keywords: ["лифт"], icon: Building2 },
  { keywords: ["парк", "сквер", "зелен"], icon: Trees },
  { keywords: ["центр города", "центр", "локац"], icon: Landmark },
  { keywords: ["пол", "керамогранит", "напольн"], icon: Layers },
  { keywords: ["стен", "гипсокартон", "перегород"], icon: PanelTop },
  { keywords: ["помещени", "комнат", "зал"], icon: Building2 },
  { keywords: ["звонок", "домофон"], icon: BellRing },
  { keywords: ["энерг", "электрич"], icon: Zap },
];

const FALLBACK_ICONS: LucideIcon[] = [
  Sparkles,
  MapPin,
  Eye,
  Sun,
  DoorOpen,
  Layers,
  Landmark,
  Package,
];

function normalizeFeatureText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFeatureIcon(feature: string, index = 0): LucideIcon {
  const text = normalizeFeatureText(feature);

  for (const rule of FEATURE_ICON_RULES) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      return rule.icon;
    }
  }

  return FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

export function getFeatureItems(features: string[]) {
  return features.map((feature, index) => ({
    text: feature,
    icon: getFeatureIcon(feature, index),
  }));
}
