import { twMerge } from 'tailwind-merge'

export type IconsIdType = "bell" | "calendar" | "ellipsis-horizontal" | "heart" | "magnifying-glass" | "mail" | "star"

export type IconType = {
  id: IconsIdType,
  className?: string,
}

export default function Icon({ id, className, ...props }: IconType) {
  return (
    <svg className={twMerge("w-6 h-6 stroke-bluey-grey stroke-2 fill-none", className)} {...props}
    >
      <use href={`../../icons/sprite.svg#${id}`} />
    </svg>
  )
} 