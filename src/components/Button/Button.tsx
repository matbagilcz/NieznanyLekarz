import { twMerge } from 'tailwind-merge'

export function BaseButton({ text = 'hello', classNames = '', onClick = () => true }) {
  return <button
    className={twMerge("transition w-full h-12 text-bluey-grey", classNames)}
    onClick={onClick}
  >
    {text}
  </button>
}