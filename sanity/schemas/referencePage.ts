import {defineField, defineType, defineArrayMember} from 'sanity'
import {
  HighlighterIcon, BarChartIcon, ScaleIcon,
  ColumnsIcon, LayoutGridIcon, QuoteIcon, CircleHelpIcon,
  MegaphoneIcon, ImageIcon,
} from 'lucide-react'

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
      description: 'Words from the title to highlight in blue italic — must match exactly.',
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
      description: 'Write your content and insert special sections (stats, comparisons, cards, etc.) anywhere in the flow.',
      type: 'array',
      group: 'content',
      of: [
        // Rich text
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
        // Inline image
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text', description: 'Important for SEO and accessibility'},
            {name: 'caption', type: 'string', title: 'Caption'},
          ],
        }),
        // Code block
        defineArrayMember({
          type: 'code',
          title: 'Code Block',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'Go', value: 'go'},
              {title: 'Bash', value: 'bash'},
              {title: 'JSON', value: 'json'},
              {title: 'YAML', value: 'yaml'},
            ],
            withFilename: true,
          },
        }),
        // ── Special sections ──
        defineArrayMember({
          name: 'highlight',
          title: 'Highlight Box',
          type: 'object',
          icon: HighlighterIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string', description: 'e.g. "TL;DR" or "Key Takeaway"'},
            {name: 'body', title: 'Body', type: 'text', rows: 3},
          ],
          preview: {
            select: {title: 'heading', subtitle: 'body'},
            prepare({title, subtitle}) {
              return {title: title || 'Highlight', subtitle: subtitle?.slice(0, 80)}
            },
          },
        }),
        defineArrayMember({
          name: 'stats',
          title: 'Stats Row',
          type: 'object',
          icon: BarChartIcon,
          fields: [
            {
              name: 'items', title: 'Stats', type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {name: 'value', title: 'Value', type: 'string', description: 'e.g. "80%" or "< 30s"'},
                  {name: 'label', title: 'Label', type: 'string', description: 'e.g. "Faster Resolution"'},
                ],
                preview: {select: {title: 'value', subtitle: 'label'}},
              }],
            },
          ],
          preview: {
            select: {items: 'items'},
            prepare({items}) {
              return {title: 'Stats Row', subtitle: `${items?.length || 0} metrics`}
            },
          },
        }),
        defineArrayMember({
          name: 'comparison',
          title: 'Comparison Table',
          type: 'object',
          icon: ScaleIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'usLabel', title: 'Our Label', type: 'string', description: 'e.g. "SRI"'},
            {name: 'themLabel', title: 'Their Label', type: 'string', description: 'e.g. "AIOps"'},
            {
              name: 'rows', title: 'Rows', type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {name: 'feature', title: 'Feature', type: 'string'},
                  {name: 'us', title: 'Us', type: 'string', description: '"true", "false", "partial", or text'},
                  {name: 'them', title: 'Them', type: 'string', description: '"true", "false", "partial", or text'},
                ],
                preview: {select: {title: 'feature'}},
              }],
            },
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {return {title: title || 'Comparison Table'}},
          },
        }),
        defineArrayMember({
          name: 'split',
          title: 'Text + Image',
          type: 'object',
          icon: ColumnsIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'body', title: 'Body', type: 'text'},
            {
              name: 'image', title: 'Image', type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
            },
            {
              name: 'layout', title: 'Layout', type: 'string',
              options: {list: [{title: 'Image Left', value: 'imageLeft'}, {title: 'Image Right', value: 'imageRight'}]},
              initialValue: 'imageRight',
            },
            {name: 'bullets', title: 'Bullet Points', type: 'array', of: [{type: 'string'}]},
          ],
          preview: {
            select: {title: 'heading', media: 'image'},
            prepare({title, media}) {return {title: title || 'Text + Image', media}},
          },
        }),
        defineArrayMember({
          name: 'cards',
          title: 'Card Grid',
          type: 'object',
          icon: LayoutGridIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {
              name: 'items', title: 'Cards', type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {name: 'title', title: 'Title', type: 'string'},
                  {name: 'body', title: 'Body', type: 'text'},
                ],
                preview: {select: {title: 'title', subtitle: 'body'}},
              }],
            },
          ],
          preview: {
            select: {title: 'heading', items: 'items'},
            prepare({title, items}) {
              return {title: title || 'Card Grid', subtitle: `${items?.length || 0} cards`}
            },
          },
        }),
        defineArrayMember({
          name: 'quote',
          title: 'Quote',
          type: 'object',
          icon: QuoteIcon,
          fields: [
            {name: 'text', title: 'Quote', type: 'text'},
            {name: 'attribution', title: 'Attribution', type: 'string'},
            {name: 'role', title: 'Role', type: 'string'},
          ],
          preview: {
            select: {title: 'text', subtitle: 'attribution'},
            prepare({title, subtitle}) {
              return {title: title ? `"${title.slice(0, 60)}…"` : 'Quote', subtitle}
            },
          },
        }),
        defineArrayMember({
          name: 'faq',
          title: 'FAQ',
          type: 'object',
          icon: CircleHelpIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Common questions'},
            {
              name: 'items', title: 'Questions', type: 'array',
              of: [{
                type: 'object',
                fields: [
                  {name: 'question', title: 'Question', type: 'string'},
                  {name: 'answer', title: 'Answer', type: 'text'},
                ],
                preview: {select: {title: 'question'}},
              }],
            },
          ],
          preview: {
            select: {title: 'heading', items: 'items'},
            prepare({title, items}) {
              return {title: title || 'FAQ', subtitle: `${items?.length || 0} questions`}
            },
          },
        }),
        defineArrayMember({
          name: 'inlineCta',
          title: 'Call to Action',
          type: 'object',
          icon: MegaphoneIcon,
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'body', title: 'Body', type: 'text'},
            {
              name: 'cta', title: 'Button', type: 'object',
              fields: [
                {name: 'label', title: 'Label', type: 'string'},
                {name: 'href', title: 'Link', type: 'string'},
              ],
            },
          ],
          preview: {
            select: {title: 'heading'},
            prepare({title}) {return {title: title || 'Call to Action'}},
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related Pages',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', title: 'Label', type: 'string'},
          {name: 'href', title: 'Link', type: 'string'},
          {name: 'category', title: 'Category', type: 'string'},
        ],
        preview: {select: {title: 'label', subtitle: 'category'}},
      }],
    }),

    // ── Meta tab ──
    defineField({
      name: 'lastUpdated', title: 'Last Updated', type: 'string',
      description: 'e.g. "April 2026"', group: 'meta',
    }),
    defineField({
      name: 'readingTime', title: 'Reading Time', type: 'string',
      description: 'e.g. "8 min read"', group: 'meta',
    }),

    // ── SEO tab ──
    defineField({
      name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo',
    }),
    defineField({
      name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', category: 'category', media: 'heroImage'},
    prepare({title, category, media}) {
      const labels: Record<string, string> = {
        learn: 'Learn', compare: 'Compare', tools: 'Tools',
        guide: 'Guide', 'case-study': 'Case Study', glossary: 'Glossary',
      }
      return {title, subtitle: category ? labels[category] || category : '', media}
    },
  },
})
