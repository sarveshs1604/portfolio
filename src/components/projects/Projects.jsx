import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../../data/projects'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="projects" ariaLabelledBy="projects-title">
      <SectionTitle
        id="projects-title"
        eyebrow="Projects"
        title="Selected work"
        description="Selected full-stack, cloud security, and machine learning work."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={prefersReduced ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.55,
              delay: prefersReduced ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
