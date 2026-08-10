import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../../data/profile'
import { education } from '../../data/education'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'

export default function About() {
  const { about, location, site, languages } = profile
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="about" ariaLabelledBy="about-title">
      <SectionTitle
        id="about-title"
        eyebrow="About"
        title="A bit about me"
        description="Full-stack builder, AI enthusiast, and CSE student at SRM IST Vadapalani."
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg leading-relaxed text-slate-300">{about.summary}</p>
          <ul className="mt-8 space-y-3">
            {about.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-slate-400 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-blue-400/70 before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="glass-card h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
            Snapshot
          </h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="mt-1 text-slate-200">{location}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Program</dt>
              <dd className="mt-1 text-slate-200">{profile.title}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Graduation</dt>
              <dd className="mt-1 text-slate-200">{profile.graduationYear}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-blue-300 transition-colors hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Phone</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="text-slate-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
                >
                  {profile.phone}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-16">
        <h3 className="font-display text-xl font-semibold text-white">Education</h3>
        <ul className="mt-6 space-y-4">
          {education.map((item, index) => (
            <motion.li
              key={item.id}
              className="glass-card rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.45,
                delay: prefersReduced ? 0 : index * 0.08,
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-base font-semibold text-white">
                  {item.school}
                </h4>
                <span className="text-xs text-slate-500">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{item.degree}</p>
              <p className="mt-2 text-sm text-blue-300/90">
                {item.result}
                <span className="text-slate-600"> · </span>
                <span className="text-slate-500">{item.location}</span>
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      {languages?.length ? (
        <div className="mt-10">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
            Languages
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {languages.map((lang) => (
              <li
                key={lang.name}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-slate-300"
              >
                {lang.name}
                <span className="text-slate-500"> · {lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <aside
        id="about-site"
        className="mt-16 glass-card rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-transparent p-6 sm:p-8"
        aria-labelledby="about-site-title"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          Meta
        </p>
        <h3
          id="about-site-title"
          className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl"
        >
          {site.title}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {site.summary}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Site tech stack">
          {site.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200"
            >
              {tech}
            </li>
          ))}
        </ul>
      </aside>
    </SectionWrapper>
  )
}
