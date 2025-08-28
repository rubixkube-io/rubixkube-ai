import {defineField, defineType} from 'sanity'

export const codeType = defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      type: 'text',
      title: 'Code',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'Python', value: 'python'},
          {title: 'Go', value: 'go'},
          {title: 'YAML', value: 'yaml'},
          {title: 'JSON', value: 'json'},
          {title: 'Shell', value: 'shell'},
          {title: 'Docker', value: 'docker'},
          {title: 'Kubernetes', value: 'kubernetes'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SQL', value: 'sql'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'Plain Text', value: 'text'},
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'filename',
      type: 'string',
      title: 'Filename',
    }),
  ],
  preview: {
    select: {
      title: 'language',
      subtitle: 'filename',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      return {
        title: `${selection.title.charAt(0).toUpperCase() + selection.title.slice(1)} Code`,
        subtitle: selection.subtitle || 'No filename',
      }
    },
  },
})
