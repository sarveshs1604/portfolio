import { motion, useReducedMotion } from 'framer-motion'

/**
 * Section shell with consistent spacing and reveal animation.
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  ariaLabelledBy,
}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={[
        'relative scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-8',
        className,
      ].join(' ')}
      initial={prefersReduced ? false : { opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: prefersReduced ? 0.01 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </motion.section>
  )
}
