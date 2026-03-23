import { useState } from 'react'
import openedEye from '../../assets/eye-open-icon.svg'
import closedEye from '../../assets/eye-closed-icon.svg'

/**
 * Reusable text/password input with label and optional show-hide toggle.
 */
export function Input({
  id,
  label,
  type: initialType = 'text',
  placeholder,
  value,
  onChange,
  showPasswordToggle = false,
  className = '',
  inputClassName = '',
  error,
  ...props
}) {
  const [type, setType] = useState(initialType)
  const isPassword = initialType === 'password'

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 bg-white
            transition-all duration-150
            border-zinc-200 hover:border-zinc-300
            focus:border-[#c60000] focus:outline-none focus:ring-2 focus:ring-[#c60000]/15
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}
            ${showPasswordToggle && isPassword ? 'pr-11' : ''}
            ${inputClassName}`}
          {...props}
        />
        {showPasswordToggle && isPassword && (
          <button
            type="button"
            onClick={() => setType((t) => (t === 'password' ? 'text' : 'password'))}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded flex items-center justify-center opacity-60 hover:opacity-100 transition"
            aria-label={type === 'password' ? 'Show password' : 'Hide password'}
          >
            {type === 'password' ? (
              <img src={openedEye} alt="" className="w-5 h-5 brightness-0" />
            ) : (
              <img src={closedEye} alt="" className="w-5 h-5 brightness-0" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
