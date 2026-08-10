import { forwardRef } from 'react'
import { motion, useReducedMotion as useFMReducedMotion } from 'framer-motion'

const variants = {
  primary:
    'bg-blue-500/90 text-white shadow-[0_0_24px_rgba(59,130,246,0.25)] hover:bg-blue-400 hover:shadow-[0_0_32px_rgba(59,130,246,0.35)]',
  secondary:
    'bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10 hover:border-white/20',
  ghost:
    'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
}

/**
 * Accessible pill button with restrained motion.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    href,
    type = 'button',
    className = '',
    external = false,
    onClick,
    disabled = false,
    ...rest
  },
  ref,
) {
  const prefersReduced = useFMReducedMotion()
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5',
    'text-sm font-medium tracking-wide transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant] ?? variants.primary,
    className,
  ].join(' ')

  const motionProps = prefersReduced
    ? {}
    : {
        whileHover: { y: -1 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.18 },
      }

  if (href) {
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        onClick={onClick}
        {...externalProps}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

export default Button
