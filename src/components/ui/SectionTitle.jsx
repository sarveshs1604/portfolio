import { motion, useReducedMotion } from 'framer-motion'

/**
 * Consistent section heading block.
 */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}) {
  const prefersReduced = useReducedMotion()
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.header
      className={`mb-10 max-w-2xl ${alignClass}`}
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: prefersReduced ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.header>
  )
}
