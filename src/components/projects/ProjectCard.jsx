import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '../ui/SocialIcons'
import Card from '../ui/Card'

/**
 * Reusable project card — all content comes from data/projects.js.
 */
export default function ProjectCard({ project }) {
  return (
    <Card className="group flex h-full flex-col p-5 sm:p-6" role="article">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-300/80">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold text-white">
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">
          {project.year}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
        {project.description}
      </p>

      {project.result ? (
        <p className="mt-4 text-sm font-medium text-slate-200">
          <span className="text-blue-300/90">Result · </span>
          {project.result}
        </p>
      ) : null}

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
          >
            <GitHubIcon size={14} />
            Code
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
          >
            <ExternalLink size={14} aria-hidden />
            Live
          </a>
        ) : null}
      </div>
    </Card>
  )
}
