import { motion, useReducedMotion } from 'framer-motion'
import { achievements } from '../../data/achievements'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'

export default function Achievements() {
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="achievements" ariaLabelledBy="achievements-title">
      <SectionTitle
        id="achievements-title"
        eyebrow="Achievements"
        title="Milestones"
        description="Research, hackathons, volunteering, and campus leadership."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {achievements.map((item, index) => (
          <motion.li
            key={item.id}
            className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            initial={prefersReduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.5,
              delay: prefersReduced ? 0 : index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-white">
                {item.title}
              </h3>
              <span className="text-xs text-slate-500">{item.year}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {item.description}
            </p>
          </motion.li>
        ))}
      </ul>
    </SectionWrapper>
  )
}
