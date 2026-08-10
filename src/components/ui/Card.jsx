import { motion, useReducedMotion } from 'framer-motion'

/**
 * Glass card surface — used for interactive / content containers.
 */
export default function Card({
  children,
  className = '',
  hover = true,
  ...rest
}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={[
        'glass-card rounded-2xl border border-white/10 bg-white/[0.04]',
        'shadow-[0_8px_32px_rgba(0,0,0,0.28)]',
        className,
      ].join(' ')}
      whileHover={
        hover && !prefersReduced
          ? { y: -4, borderColor: 'rgba(147, 197, 253, 0.28)' }
          : undefined
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
