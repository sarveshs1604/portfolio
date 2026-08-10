import { motion, useReducedMotion } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'

export default function Skills() {
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="skills" ariaLabelledBy="skills-title">
      <SectionTitle
        id="skills-title"
        eyebrow="Skills"
        title="Tools I work with"
        description="Languages, frameworks, tools, and domains I work across."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            initial={prefersReduced ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.5,
              delay: prefersReduced ? 0 : index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-blue-300/80">
              {category.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={category.label}>
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
