import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/experience'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'

export default function Experience() {
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="experience" ariaLabelledBy="experience-title">
      <SectionTitle
        id="experience-title"
        eyebrow="Experience"
        title="Where I’ve grown"
        description="Roles at Accsys Consulting building enterprise workflows and automation systems."
      />

      <ol className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
        {experience.map((item, index) => (
          <motion.li
            key={item.id}
            className="relative"
            initial={prefersReduced ? false : { opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.55,
              delay: prefersReduced ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span
              className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full border border-blue-400/50 bg-blue-500/40 sm:-left-[2.4rem]"
              aria-hidden
            />
            <article className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-500">{item.period}</p>
              </div>
              <p className="mt-1 text-sm text-blue-300/90">
                {item.company}
                <span className="text-slate-600"> · </span>
                <span className="text-slate-400">{item.location}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
              {item.highlights?.length ? (
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="text-sm text-slate-400">
                      — {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
