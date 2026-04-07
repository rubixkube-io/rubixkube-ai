import {defineField, defineType, defineArrayMember} from 'sanity'
import {inlineBodyBlocks} from './blocks'
import {
  HighlightIcon,
  BarChartIcon,
  SplitHorizontalIcon,
  MasterDetailIcon,
  ThLargeIcon,
  BlockquoteIcon,
  HelpCircleIcon,
  RocketIcon,
  UlistIcon,
  BlockContentIcon,
} from '@sanity/icons'

const CELL_OPTIONS = [
  {title: '✓  Yes', value: 'true'},
  {title: '✗  No', value: 'false'},
  {title: '~  Partial', value: 'partial'},
]

export const referencePageType = defineType({
  name: 'referencePage',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Meta'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Full page title, e.g. "What is Site Reliability Intelligence?"',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'titleAccent',
      title: 'Accent Words',
      type: 'string',
      description: 'Words from the title to render in blue italic — must match exactly.',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Learn', value: 'learn'},
          {title: 'Compare', value: 'compare'},
          {title: 'Tools', value: 'tools'},
          {title: 'Guide', value: 'guide'},
          {title: 'Case Study', value: 'case-study'},
          {title: 'Glossary', value: 'glossary'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'One or two sentences shown under the title. Used for SEO description if no override is set.',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'caption', type: 'string', title: 'Caption'},
      ],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Rich text, images, code, Markdown (tables via GFM), and special sections.',
      type: 'array',
      group: 'content',
      of: [
        // ── Rich text ──
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        }),
        // ── Inline image ──
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text', description: 'Important for SEO and accessibility'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        }),
        // ── Code block ──
        defineArrayMember({
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'bash',
            languageAlternatives: [
              {title: 'Bash / Shell', value: 'bash'},
              {title: 'YAML', value: 'yaml'},
              {title: 'JSON', value: 'json'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'JavaScript', value: 'javascript'},
              {title: 'Go', value: 'go'},
              {title: 'Python', value: 'python'},
              {title: 'SQL', value: 'sql'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'Dockerfile', value: 'dockerfile'},
              {title: 'Rust', value: 'rust'},
              {title: 'Java', value: 'java'},
              {title: 'Ruby', value: 'ruby'},
            ],
            withFilename: true,
          },
        }),
        // ── Markdown (GFM: tables, task lists, strikethrough, …) ──
        defineArrayMember({
          name: 'markdownSection',
          title: 'Markdown',
          type: 'object',
          icon: BlockContentIcon,
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional label shown above the block.',
            },
            {
              name: 'content',
              title: 'Markdown source',
              type: 'text',
              rows: 14,
              description:
                'GitHub Flavored Markdown — tables use | pipes | with a header separator row (|---|---|). Also supports **bold**, lists, links, ~~strike~~.',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {title: 'caption', content: 'content'},
            prepare({title, content}: {title?: string; content?: string}) {
              const line = typeof content === 'string' ? content.replace(/\s+/g, ' ').trim() : ''
              return {title: title || 'Markdown', subtitle: line.slice(0, 72) + (line.length > 72 ? '…' : '')}
            },
          },
        }),
        // ── Highlight Box ──
        defineArrayMember({
          name: 'highlight',
          title: 'Highlight Box',
          type: 'object',
          icon: HighlightIcon,
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'e.g. "TL;DR" or "Key Takeaway"',
              initialValue: 'Key Takeaway',
            },
            {name: 'body', title: 'Body', type: 'array', of: inlineBodyBlocks},
          ],
          preview: {
            select: {title: 'heading', subtitle: 'body'},
            prepare({title, subtitle}) {
              const sub = typeof subtitle === 'string' ? subtitle?.slice(0, 80) : 'Rich text'
              return {title: title || 'Highlight Box', subtitle: sub}
            },
          },
        }),
        // ── Stats Row ──
        defineArrayMember({
          name: 'stats',
          title: 'Stats Row',
          type: 'object',
          icon: BarChartIcon,
          fields: [
            {
              name: 'items',
              title: 'Stats',
              type: 'array',
              description: 'Add 2–4 metrics. Each shows as a big number with a label.',
              of: [{
                type: 'object',
                fieldsets: [{name: 'cols', title: ' ', options: {columns: 2}}],
                fields: [
                  {
                    name: 'value',
                    title: 'Value',
                    type: 'string',
                    description: 'e.g. "80%" or "< 30s"',
                    fieldset: 'cols',
                  },
                  {
                    name: 'label',
                    title: 'Label',
                    type: 'string',
                    description: 'e.g. "Faster Resolution"',
                    fieldset: 'cols',
                  },
                ],
                preview: {
                  select: {title: 'value', subtitle: 'label'},
                  prepare({title, subtitle}) {
                    return {title: title || '—', subtitle: subtitle || ''}
                  },
                },
              }],
            },
          ],
          preview: {
            select: {items: 'items'},
            prepare({items}) {
              const preview = (items || []).map((i: {value?: string}) => i.value).filter(Boolean).join('  ·  ')
              return {title: 'Stats Row', subtitle: preview || `${items?.length || 0} metrics`}
            },
          },
        }),
        // ── Comparison Table ──
        defineArrayMember({
          name: 'comparison',
          title: 'Comparison Table',
          type: 'object',
          icon: SplitHorizontalIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string', description: 'e.g. "RubixKube vs. Legacy AIOps"'},
            {
              name: 'usLabel',
              title: 'Our column label',
              type: 'string',
              initialValue: 'RubixKube',
              description: 'e.g. "SRI" or "RubixKube"',
            },
            {
              name: 'themLabel',
              title: 'Their column label',
              type: 'string',
              description: 'e.g. "AIOps" or "Manual SRE"',
            },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [{
                type: 'object',
                fieldsets: [{name: 'cols', title: ' ', options: {columns: 3}}],
                fields: [
                  {
                    name: 'feature',
                    title: 'Feature',
                    type: 'string',
                    fieldset: 'cols',
                  },
                  {
                    name: 'us',
                    title: 'Us',
                    type: 'string',
                    fieldset: 'cols',
                    options: {
                      list: [...CELL_OPTIONS],
                      layout: 'dropdown',
                    },
                  },
                  {
                    name: 'them',
                    title: 'Them',
                    type: 'string',
                    fieldset: 'cols',
                    options: {
                      list: [...CELL_OPTIONS],
                      layout: 'dropdown',
                    },
                  },
                ],
                preview: {
                  select: {title: 'feature', subtitle: 'us'},
                  prepare({title, subtitle}: {title?: string; subtitle?: string}) {
                    const cell = subtitle === 'true' ? '✓' : subtitle === 'false' ? '✗' : subtitle === 'partial' ? '~' : subtitle || ''
                    return {title: title || 'Row', subtitle: cell ? `Us: ${cell}` : ''}
                  },
                },
              }],
            },
          ],
          preview: {
            select: {title: 'heading', usLabel: 'usLabel', themLabel: 'themLabel', rows: 'rows'},
            prepare({title, usLabel, themLabel, rows}: {title?: string; usLabel?: string; themLabel?: string; rows?: unknown[]}) {
              return {
                title: title || 'Comparison Table',
                subtitle: [usLabel, 'vs.', themLabel].filter(Boolean).join(' ') + (rows?.length ? ` — ${rows.length} rows` : ''),
              }
            },
          },
        }),
        // ── Text + Image (Split) ──
        defineArrayMember({
          name: 'split',
          title: 'Text + Image',
          type: 'object',
          icon: MasterDetailIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'body', title: 'Body', type: 'array', of: inlineBodyBlocks},
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
            },
            {
              name: 'layout',
              title: 'Image position',
              type: 'string',
              options: {
                list: [
                  {title: '← Image Left', value: 'imageLeft'},
                  {title: 'Image Right →', value: 'imageRight'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'imageRight',
            },
            {
              name: 'bullets',
              title: 'Bullet points',
              type: 'array',
              description: 'Optional checklist shown below the body text.',
              of: [{type: 'string'}],
            },
          ],
          preview: {
            select: {title: 'heading', media: 'image'},
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prepare({title, media}: {title?: string; media?: any}) {
              return {title: title || 'Text + Image', media}
            },
          },
        }),
        // ── Checklist ──
        defineArrayMember({
          name: 'checklist',
          title: 'Checklist',
          type: 'object',
          icon: UlistIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'body', title: 'Body', type: 'array', of: inlineBodyBlocks, description: 'Optional supporting copy.'},
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              description: 'Each item renders with a checkmark.',
              of: [{type: 'string'}],
            },
          ],
          preview: {
            select: {title: 'heading', items: 'items'},
            prepare({title, items}: {title?: string; items?: string[]}) {
              const preview = (items || []).slice(0, 3).join('  ·  ')
              return {title: title || 'Checklist', subtitle: preview || `${items?.length || 0} items`}
            },
          },
        }),
        // ── Card Grid ──
        defineArrayMember({
          name: 'cards',
          title: 'Card Grid',
          type: 'object',
          icon: ThLargeIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {
              name: 'items',
              title: 'Cards',
              type: 'array',
              description: 'Renders in a 2-column grid.',
              of: [{
                type: 'object',
                fields: [
                  {name: 'title', title: 'Title', type: 'string'},
                  {name: 'body', title: 'Body', type: 'array', of: inlineBodyBlocks},
                ],
                preview: {
                  select: {title: 'title', subtitle: 'body'},
                  prepare({title, subtitle}: {title?: string; subtitle?: unknown}) {
                    const sub =
                      typeof subtitle === 'string' ? subtitle?.slice(0, 60) || '' : subtitle ? 'Rich text' : ''
                    return {title: title || 'Card', subtitle: sub}
                  },
                },
              }],
            },
          ],
          preview: {
            select: {title: 'heading', items: 'items'},
            prepare({title, items}: {title?: string; items?: unknown[]}) {
              return {title: title || 'Card Grid', subtitle: `${items?.length || 0} cards`}
            },
          },
        }),
        // ── Quote ──
        defineArrayMember({
          name: 'quote',
          title: 'Pull Quote',
          type: 'object',
          icon: BlockquoteIcon,
          fields: [
            {name: 'text', title: 'Quote', type: 'array', of: inlineBodyBlocks},
            {name: 'attribution', title: 'Name', type: 'string', description: 'e.g. "Jane Smith"'},
            {name: 'role', title: 'Title / Role', type: 'string', description: 'e.g. "Head of Platform, Acme"'},
          ],
          preview: {
            select: {title: 'text', subtitle: 'attribution'},
            prepare({title, subtitle}: {title?: unknown; subtitle?: string}) {
              return {
                title: typeof title === 'string' && title ? `"${title.slice(0, 55)}…"` : 'Pull Quote',
                subtitle,
              }
            },
          },
        }),
        // ── FAQ ──
        defineArrayMember({
          name: 'faq',
          title: 'FAQ',
          type: 'object',
          icon: HelpCircleIcon,
          fields: [
            {
              name: 'heading',
              title: 'Section heading',
              type: 'string',
              initialValue: 'Common questions',
            },
            {
              name: 'items',
              title: 'Questions',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {name: 'question', title: 'Question', type: 'string'},
                  {name: 'answer', title: 'Answer', type: 'array', of: inlineBodyBlocks},
                ],
                preview: {
                  select: {title: 'question'},
                  prepare({title}: {title?: string}) {
                    return {title: title || 'Question'}
                  },
                },
              }],
            },
          ],
          preview: {
            select: {title: 'heading', items: 'items'},
            prepare({title, items}: {title?: string; items?: unknown[]}) {
              return {title: title || 'FAQ', subtitle: `${items?.length || 0} questions`}
            },
          },
        }),
        // ── Inline CTA ──
        defineArrayMember({
          name: 'inlineCta',
          title: 'Call to Action',
          type: 'object',
          icon: RocketIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'body', title: 'Supporting text', type: 'array', of: inlineBodyBlocks},
            {
              name: 'cta',
              title: 'Button',
              type: 'object',
              fields: [
                {name: 'label', title: 'Label', type: 'string', description: 'e.g. "Start for Free"'},
                {name: 'href', title: 'Link', type: 'string', description: 'e.g. "https://console.rubixkube.ai"'},
              ],
            },
          ],
          preview: {
            select: {title: 'heading', label: 'cta.label'},
            prepare({title, label}: {title?: string; label?: string}) {
              return {title: title || 'Call to Action', subtitle: label ? `→ ${label}` : ''}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related Pages',
      description: 'Shown at the bottom as "Continue reading" links.',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fieldsets: [{name: 'cols', title: ' ', options: {columns: 2}}],
        fields: [
          {name: 'label', title: 'Title', type: 'string', fieldset: 'cols'},
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            fieldset: 'cols',
            options: {
              list: [
                {title: 'Learn', value: 'learn'},
                {title: 'Compare', value: 'compare'},
                {title: 'Tools', value: 'tools'},
                {title: 'Guide', value: 'guide'},
                {title: 'Case Study', value: 'case-study'},
                {title: 'Glossary', value: 'glossary'},
              ],
              layout: 'dropdown',
            },
          },
          {
            name: 'href',
            title: 'Link',
            type: 'string',
            description: 'e.g. /learn/what-is-sri',
          },
        ],
        preview: {
          select: {title: 'label', subtitle: 'category'},
          prepare({title, subtitle}: {title?: string; subtitle?: string}) {
            return {title: title || 'Related page', subtitle: subtitle || ''}
          },
        },
      }],
    }),

    // ── Meta tab ──
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      description: 'Displayed on the page, e.g. "April 2026"',
      group: 'meta',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g. "8 min read"',
      group: 'meta',
    }),

    // ── SEO tab ──
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results. Leave blank to use the page title.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Overrides the subtitle in search results. 120–160 characters ideal.',
      group: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', category: 'category', media: 'heroImage'},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({title, category, media}: {title?: string; category?: string; media?: any}) {
      const labels: Record<string, string> = {
        learn: 'Learn', compare: 'Compare', tools: 'Tools',
        guide: 'Guide', 'case-study': 'Case Study', glossary: 'Glossary',
      }
      return {title, subtitle: category ? labels[category] || category : '', media}
    },
  },
})
