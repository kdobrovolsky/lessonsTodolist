type Props = {
  title: string
  onClick?: () => void
  className?: string
  disabled?: ()=>void
}

export const Button = ({ title, onClick, className,disabled }: Props) => {
  return <button className={className} onClick={onClick} >{title}</button>
}
