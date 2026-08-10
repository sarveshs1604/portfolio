import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons'
import { profile } from '../../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-medium text-white">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            © {year} S Sarvesh · Portfolio built with React & Vite
          </p>
        </div>

        <ul className="flex items-center gap-3" aria-label="Social links">
          <li>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
          </li>
          <li>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
