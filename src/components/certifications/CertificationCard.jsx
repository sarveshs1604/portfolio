import { Award, BadgeCheck, ExternalLink, Shield } from 'lucide-react'
import Card from '../ui/Card'

const icons = {
  award: Award,
  badge: BadgeCheck,
  shield: Shield,
}

/**
 * Reusable certification card — content from data/certifications.js.
 */
export default function CertificationCard({ certification }) {
  const Icon = icons[certification.icon] ?? Award

  return (
    <Card className="flex h-full flex-col p-5 sm:p-6" role="article" hover>
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-blue-500/10 text-blue-300">
          <Icon size={18} aria-hidden strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-white">
              {certification.title}
            </h3>
            <span className="shrink-0 text-xs text-slate-500">{certification.year}</span>
          </div>
          <p className="mt-1 text-sm text-slate-400">{certification.issuer}</p>
        </div>
      </div>

      {certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        >
          View credential
          <ExternalLink size={13} aria-hidden />
        </a>
      ) : null}
    </Card>
  )
}
