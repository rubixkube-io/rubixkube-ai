import {defineArrayMember} from 'sanity'

/**
 * Portable text for nested fields inside reference page custom blocks (highlight, split, FAQ, etc.).
 * Matches main column formatting (headings, lists, marks, links) without embedding images/code.
 */
export const inlineBodyBlocks = [
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
]

export const blockContent = {
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles - markdown shortcuts work automatically
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},      // Type # for H1
        {title: 'H2', value: 'h2'},      // Type ## for H2
        {title: 'H3', value: 'h3'},      // Type ### for H3
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'}, // Type > for quotes
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},    // Type - or * for bullets
        {title: 'Numbered', value: 'number'},  // Type 1. for numbered
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},      // Type **text** or Cmd+B
          {title: 'Emphasis', value: 'em'},        // Type *text* or Cmd+I
          {title: 'Code', value: 'code'},          // Type `code` or Cmd+Opt+C
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
            ],
          },
        ],
      },
    }),
    // Image support with full Sanity features
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    // Code blocks with syntax highlighting
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
          {title: 'Markdown', value: 'markdown'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
        ],
        withFilename: true,
      },
    }),
  ],
}
