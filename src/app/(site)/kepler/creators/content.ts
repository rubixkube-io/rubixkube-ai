export const EMAIL = 'creators@rubixkube.ai'

export const CREATOR_SECTIONS = [
  { id: 'how', name: 'How it works' },
  { id: 'rules', name: 'The rules' },
  { id: 'who', name: 'Who' },
  { id: 'apply', name: 'Apply' },
] as const

export const HERO = {
  label: 'Creator program',
  title: 'Two months of Pro, free.',
  titleEm: 'Six if you post.',
  lead: 'Use Kepler on your own systems for two months, properly, on something that actually breaks. If you think it is worth telling people about, write what you really think. Then it is yours for six months.',
  note: 'Takes about a minute. A person reads every application and replies within a week.',
}

export const STEPS = [
  {
    title: 'Apply',
    copy: 'One short form. We look at where you publish and whether your readers run infrastructure. No call, no screenshots, no follower minimum.',
  },
  {
    title: 'Use it for two months',
    copy: 'We switch Pro on for the account you tell us. No card, no invoice. If you never post, that is fine, and the two months is still yours.',
  },
  {
    title: 'Post, and get six months',
    copy: 'Publish one honest take, in whatever form you already publish in. Send us the link and we switch on six months of Pro.',
  },
]

export const RULES = {
  heading: 'We are not buying',
  headingEm: 'a good review.',
  items: [
    {
      title: 'Say what you think',
      copy: 'If Kepler annoys you, write that. A post that takes Kepler apart earns the six months exactly like a glowing one does. We are not going to pretend otherwise and we are not going to quietly drop you.',
    },
    {
      title: 'Say it was free',
      copy: 'Your post has to make clear you were given Kepler for nothing. Near the start, not buried at the end, and in the post itself rather than only in a description. On a stream, leave it on screen. Where your platform or your country expects an ad label, use one. That rule protects your audience, and the law puts it on us as much as on you.',
    },
    {
      title: 'No script, no approval',
      copy: 'We will not send you talking points and we will not ask to see it first. If we ever do, you have our permission to tell everyone we did.',
    },
    {
      title: 'One post is enough',
      copy: 'No quota, no second ask, no follow-up chasing you for it.',
    },
  ],
}

export const WHO = {
  label: 'Who',
  heading: 'People who run things',
  headingEm: 'in production.',
  paragraphs: [
    'SREs, platform and infrastructure engineers, DevOps, on-call developers, and the people who write for them.',
    'There is no follower minimum. An audience of eight hundred people who carry a pager is worth more to us than eighty thousand who scroll past. What we look at is whether you publish regularly and whether your readers do this work.',
  ],
}

export const FORM = {
  label: 'Apply',
  heading: 'Apply for',
  headingEm: 'two months.',
  lead: 'A person reads every one and replies within a week.',
  where: ['YouTube', 'X', 'LinkedIn', 'Newsletter', 'Blog', 'Podcast', 'Other'],
  success: 'Thanks. A person reads every application and replies within a week.',
  error: 'Something went wrong. Try again.',
  privacy: 'We use your details to read your application. Nothing else, and we do not share them.',
}
