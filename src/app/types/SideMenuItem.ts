import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export default interface SideMenuItem {
  label: string
  href: string
  icon: IconDefinition
  subItems: SideMenuItem[]
}
