import Image from 'next/image'
import { rkMono13 } from '@/lib/landing-responsive-type'
import { cn } from '@/lib/utils'
import {
  SiApachekafka,
  SiApachekafkaHex,
  SiCloudflare,
  SiCloudflareHex,
  SiConfluence,
  SiConfluenceHex,
  SiDatadog,
  SiDatadogHex,
  SiDocker,
  SiDockerHex,
  SiGithub,
  SiGithubHex,
  SiGitlab,
  SiGitlabHex,
  SiGmail,
  SiGmailHex,
  SiGooglecloud,
  SiGooglecloudHex,
  SiGrafana,
  SiGrafanaHex,
  SiJira,
  SiJiraHex,
  SiKubernetes,
  SiKubernetesHex,
  SiLinear,
  SiLinearHex,
  SiMongodb,
  SiMongodbHex,
  SiNatsdotio,
  SiNatsdotioHex,
  SiOpentelemetry,
  SiOpentelemetryHex,
  SiPagerduty,
  SiPagerdutyHex,
  SiPostgresql,
  SiPostgresqlHex,
  SiRedis,
  SiRedisHex,
  SiSentry,
  SiSentryHex,
  SiSnowflake,
  SiSnowflakeHex,
  SiTerraform,
  SiTerraformHex,
  SiZendesk,
  SiZendeskHex,
} from '@icons-pack/react-simple-icons'
import { SectionLabel } from '@/components/ui/section-label'

type StackIcon = {
  type: 'icon'
  label: string
  Icon: typeof SiGithub
  color: string
}

type StackLogo = {
  type: 'logo'
  label: string
  src: string
  width: number
  height: number
  imgClassName?: string
}

type StackItem = StackIcon | StackLogo

/**
 * AWS, Slack, Teams, and Outlook are not in `@icons-pack/react-simple-icons`; we ship SVGs under `/logos/`.
 * Marks stay grayscale until hover (`filter` on the wrapper).
 */
const GROUPS: { title: string; items: StackItem[] }[] = [
  {
    title: 'Cloud & edge',
    items: [
      { type: 'icon', Icon: SiGooglecloud, color: SiGooglecloudHex, label: 'Google Cloud' },
      { type: 'logo', src: '/logos/aws.svg', label: 'AWS', width: 56, height: 32, imgClassName: 'max-w-[72px]' },
      { type: 'icon', Icon: SiCloudflare, color: SiCloudflareHex, label: 'Cloudflare' },
    ],
  },
  {
    title: 'Delivery & platform',
    items: [
      { type: 'icon', Icon: SiKubernetes, color: SiKubernetesHex, label: 'Kubernetes' },
      { type: 'icon', Icon: SiDocker, color: SiDockerHex, label: 'Docker' },
      { type: 'icon', Icon: SiTerraform, color: SiTerraformHex, label: 'Terraform' },
      { type: 'icon', Icon: SiGithub, color: SiGithubHex, label: 'GitHub' },
      { type: 'icon', Icon: SiGitlab, color: SiGitlabHex, label: 'GitLab' },
    ],
  },
  {
    title: 'Observability & incidents',
    items: [
      { type: 'icon', Icon: SiDatadog, color: SiDatadogHex, label: 'Datadog' },
      { type: 'icon', Icon: SiGrafana, color: SiGrafanaHex, label: 'Grafana' },
      { type: 'icon', Icon: SiOpentelemetry, color: SiOpentelemetryHex, label: 'OpenTelemetry' },
      { type: 'icon', Icon: SiSentry, color: SiSentryHex, label: 'Sentry' },
      { type: 'icon', Icon: SiPagerduty, color: SiPagerdutyHex, label: 'PagerDuty' },
    ],
  },
  {
    title: 'Chat, email & meetings',
    items: [
      { type: 'logo', src: '/logos/slack.svg', label: 'Slack', width: 22, height: 22 },
      { type: 'logo', src: '/logos/microsoft-teams.svg', label: 'Microsoft Teams', width: 22, height: 22 },
      { type: 'icon', Icon: SiGmail, color: SiGmailHex, label: 'Gmail' },
      { type: 'logo', src: '/logos/outlook.svg', label: 'Outlook', width: 22, height: 22 },
    ],
  },
  {
    title: 'Work & support',
    items: [
      { type: 'icon', Icon: SiJira, color: SiJiraHex, label: 'Jira' },
      { type: 'icon', Icon: SiConfluence, color: SiConfluenceHex, label: 'Confluence' },
      { type: 'icon', Icon: SiLinear, color: SiLinearHex, label: 'Linear' },
      { type: 'icon', Icon: SiZendesk, color: SiZendeskHex, label: 'Zendesk' },
    ],
  },
  {
    title: 'Data & events',
    items: [
      { type: 'icon', Icon: SiMongodb, color: SiMongodbHex, label: 'MongoDB' },
      { type: 'icon', Icon: SiPostgresql, color: SiPostgresqlHex, label: 'PostgreSQL' },
      { type: 'icon', Icon: SiRedis, color: SiRedisHex, label: 'Redis' },
      { type: 'icon', Icon: SiApachekafka, color: SiApachekafkaHex, label: 'Apache Kafka' },
      { type: 'icon', Icon: SiSnowflake, color: SiSnowflakeHex, label: 'Snowflake' },
      { type: 'icon', Icon: SiNatsdotio, color: SiNatsdotioHex, label: 'NATS' },
    ],
  },
]

function IntegrationMark({ item }: { item: StackItem }) {
  if (item.type === 'logo') {
    return (
      <Image
        src={item.src}
        alt=""
        width={item.width}
        height={item.height}
        className={`h-[22px] w-auto max-h-[24px] object-contain object-center sm:h-[24px] sm:max-h-[26px] lg:h-[26px] lg:max-h-[28px] ${item.imgClassName ?? ''}`}
        aria-hidden
      />
    )
  }
  return <item.Icon size={26} color={item.color} aria-hidden />
}

export function BrainIntegrationStrip({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  return (
    <div className={cn("w-full", !hideHeader && "border-t border-[var(--rule)] pt-12")}>
      {!hideHeader && (
        <header className="max-w-[42rem]">
          <p className="font-[family-name:var(--font-serif)] text-[clamp(1.35rem,2.8vw,1.75rem)] font-light leading-[1.08] tracking-[-0.01em] text-[var(--ink)] min-[1920px]:text-[clamp(1.45rem,2.2vw,2rem)] min-[2560px]:text-[clamp(1.55rem,1.9vw,2.35rem)]">
            Built for the tools your teams already use
          </p>
          <p
            className={cn(
              'mt-3 font-[family-name:var(--font-mono)] font-light leading-relaxed tracking-[-0.01em] text-[var(--mid)]',
              rkMono13,
            )}
          >
            Cloud, delivery, observability, collaboration, and data, wired in without rip-and-replace.
          </p>
        </header>
      )}

      <div className={cn("grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3", !hideHeader && "mt-12")}>
        {GROUPS.map((group) => (
          <div key={group.title} className="group cursor-default">
            <SectionLabel className="mb-4">{group.title}</SectionLabel>
            <ul className="flex list-none flex-wrap items-center gap-x-3.5 gap-y-3 p-0 sm:gap-x-4">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.label}`} className="m-0 flex shrink-0 p-0" aria-label={item.label}>
                  <span className="inline-flex min-h-[28px] min-w-[28px] items-center justify-center opacity-[0.55] grayscale transition-[filter,opacity] duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0">
                    <IntegrationMark item={item} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
