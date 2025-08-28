import {defineField, defineType} from 'sanity'

export const calloutType = defineType({
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      title: 'Content',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
          {title: 'Success', value: 'success'},
          {title: 'Error', value: 'error'},
        ],
      },
      initialValue: 'info',
    }),
  ],
  preview: {
    select: {
      title: 'type',
      content: 'content',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare(selection: any) {
      return {
        title: `${selection.title.charAt(0).toUpperCase() + selection.title.slice(1)} Callout`,
        subtitle: 'Click to edit content',
      }
    },
  },
})
