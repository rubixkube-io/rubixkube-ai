import { llmFaqItems } from '@/data/llm-faq'
import { llmFullPageBlocks } from '@/data/llm-full-pages'

function formatFaqs(): string {
  return llmFaqItems.map(({ q, a }) => `Q: ${q}\nA: ${a}`).join('\n\n')
}

function formatPageBlocks(): string {
  return llmFullPageBlocks
    .map(
      (b) =>
        `[${b.heading}]\nURL: ${b.url}\n\n${b.body.trim()}`
    )
    .join('\n\n---\n\n')
}

export async function GET() {
  const faqBlock = formatFaqs()
  const pagesBlock = formatPageBlocks()

  const content = `# llms-full.txt - RubixKube (plain-text corpus for LLMs and answer engines)

# Single-fetch companion to https://rubixkube.ai/llms.txt (shorter index, citation hints, and the same FAQs).
# This file adds long-form narrative per major route so crawlers do not need to render React to capture core positioning.

site: https://rubixkube.ai

[core_pages_plain_text]

${pagesBlock}

---

[supplementary_faqs_same_as_llms_txt]

${faqBlock}

[contact]
connect@rubixkube.ai
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
