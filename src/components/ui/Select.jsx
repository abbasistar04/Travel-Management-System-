/**
 * Reusable select dropdown matching Input styling.
 */
export function Select({
  id,
  label,
  value,
  onChange,
  children,
  className = '',
  selectClassName = '',
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-3 pr-9 text-sm text-zinc-800
            hover:border-zinc-300
            focus:border-[#c60000] focus:outline-none focus:ring-2 focus:ring-[#c60000]/15
            transition-all duration-150 cursor-pointer
            ${selectClassName}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c60000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1rem 1rem',
          }}
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  )
}
