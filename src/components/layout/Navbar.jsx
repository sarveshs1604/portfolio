import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../../data/profile'
import { navLinks } from '../../config/themeConfig'

/**
 * Transparent → glass navbar with accessible mobile menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <motion.header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-white/10 bg-[#050810]/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
      initial={false}
      animate={{
        boxShadow: scrolled
          ? '0 8px 30px rgba(0,0,0,0.25)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: prefersReduced ? 0.01 : 0.3 }}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810] rounded-md"
          onClick={closeMenu}
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="rounded-full px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="border-t border-white/10 bg-[#050810]/95 backdrop-blur-xl md:hidden"
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.25 }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="block rounded-xl px-4 py-3 text-base text-slate-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
