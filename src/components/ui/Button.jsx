/**
 * Reusable button with variants, sizes, and optional icon.
 */
export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#c60000] active:scale-[0.97] select-none'
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }
  const variants = {
    primary:   'bg-[#c60000] text-white hover:bg-[#a00000] shadow-sm shadow-[#c60000]/20',
    secondary: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200',
    outline:   'border border-[#c60000] text-[#c60000] hover:bg-[#fff0f0]',
    ghost:     'text-[#c60000] hover:bg-[#fff0f0]',
    danger:    'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200',
  }
  const cls = `${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`
  return (
    <button type={type} className={cls} {...props}>
      {Icon && iconPosition === 'left'  && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  )
}
