import { motion, useReducedMotion } from 'framer-motion'
import { certifications } from '../../data/certifications'
import SectionWrapper from '../layout/SectionWrapper'
import SectionTitle from '../ui/SectionTitle'
import CertificationCard from './CertificationCard'

export default function Certifications() {
  const prefersReduced = useReducedMotion()

  return (
    <SectionWrapper id="certifications" ariaLabelledBy="certifications-title">
      <SectionTitle
        id="certifications-title"
        eyebrow="Certifications"
        title="Credentials"
        description="Courses from NPTEL, Google, NVIDIA, IBM, and DeepLearning.AI."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={prefersReduced ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: prefersReduced ? 0.01 : 0.5,
              delay: prefersReduced ? 0 : index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CertificationCard certification={cert} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
