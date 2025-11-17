import { ImageIcon, LayoutGrid, MessageSquare } from 'lucide-react'
import type { SubNavItem } from "./nav-dropdown"
import { iconColors } from "./color-utils"

// Ressourcen-Dropdown-Daten
export const resourcesDropdownData: SubNavItem[][] = [
  [
    {
      title: "Foundation Bubble Vorlage",
      description: "Starten Sie Ihr Bubble-Projekt mit unserer Grundvorlage",
      href: "https://bubble.io/template/foundation-by-automatic-1673596403969x408542417388568600",
      icon: LayoutGrid,
      color: iconColors.resources.blog,
      external: true,
    },
    {
      title: "Favicon Generator",
      description: "Konvertieren Sie Ihre Bilder in Favicons",
      href: "https://favicon.automatic.so/",
      icon: ImageIcon,
      color: iconColors.resources.tutorials,
      external: true,
    },
    {
      title: "Kontaktieren Sie uns",
      description: "Nehmen Sie Kontakt mit unserem Team auf",
      href: "https://x.com/David__Flynn",
      icon: MessageSquare,
      color: iconColors.resources.community,
      external: true,
    },
  ],
]
