import {defineField, defineType} from 'sanity'
import {blockContent} from './blocks'

export const podcastEpisodeType = defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description: 'A short summary for the episode list view.',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Direct Video URL',
      type: 'url',
      description: 'Link to a direct .mp4 file (e.g. from Zencastr) for vertical shorts.',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Link to the YouTube video (e.g. https://www.youtube.com/watch?v=...). This will take precedence over the Direct Video URL.',
    }),
    defineField({
      name: 'applePodcastUrl',
      title: 'Apple Podcasts URL',
      type: 'url',
      description: 'Link to the specific episode on Apple Podcasts (for embedding).',
    }),
    defineField({
      name: 'body',
      title: 'Show Notes & Transcript',
      description: 'The full show notes and transcript. Use markdown shortcuts: # for headings, **bold**, *italic*, `code`, - for lists',
      ...blockContent,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
