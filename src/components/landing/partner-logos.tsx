import Image from 'next/image'

export const PARTNER_LOGOS = [
  { src: '/logos/gcp.png', alt: 'GCP', w: 72, h: 24 },
  { src: '/logos/aws.svg', alt: 'AWS', w: 56, h: 20 },
  { src: '/logos/mongodb.svg', alt: 'MongoDB', w: 88, h: 24 },
  { src: '/logos/neo4j.svg', alt: 'Neo4j', w: 72, h: 20 },
  { src: '/logos/digitalocean.svg', alt: 'DigitalOcean', w: 96, h: 20 },
  { src: '/logos/auth0.svg', alt: 'Auth0', w: 64, h: 20 },
  { src: '/logos/yellow-ai.png', alt: 'Yellow.ai', w: 72, h: 22 },
  { src: '/logos/fleek.png', alt: 'Fleek', w: 64, h: 22 },
  { src: '/logos/anthropic.webp', alt: 'Anthropic', w: 88, h: 22 },
  { src: '/logos/nvidia-inception-program-badge-rgb-for-screen.png', alt: 'NVIDIA', w: 72, h: 22 },
  { src: '/logos/Sheshi-ai.svg', alt: 'Sheshi.ai', w: 80, h: 22 },
] as const

export function PartnerLogoRow() {
  const doubled = [...PARTNER_LOGOS, ...PARTNER_LOGOS]
  return (
    <>
      {doubled.map((logo, i) => (
        <div key={`${logo.src}-${i}`} className="logo-item flex shrink-0 items-center opacity-[0.35] grayscale">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            className="h-[18px] w-auto max-w-[88px] object-contain"
          />
        </div>
      ))}
    </>
  )
}
