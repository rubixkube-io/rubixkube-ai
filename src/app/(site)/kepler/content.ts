// The words, numbers and people on the /kepler launch page, in page order. Components only lay them out.

export const DISCORD_URL = 'https://discord.gg/HTHkEU7YTj'
export const DOCS_URL = 'https://docs.rubixkube.ai/kepler/overview'
export const ASSETS = '/kepler/launch'

export const TAGLINE =
  'Developers got their AI IDE the day their repos held still. The people keeping production alive never did. Kepler is the IDE for the ones on call.'

export const NAV = [
  { href: '#why', label: 'Why' },
  { href: '#days', label: 'Story' },
  { href: '#people', label: 'Beta' },
  { href: '#founder', label: 'Founder' },
  { href: '#pricing', label: 'Pricing' },
] as const

/** Beta members shown next to "Join the operators already inside" */
export const FACES = ['randy', 'sarthak', 'vaishnav', 'jaideep', 'pramod'].map((n) => `${ASSETS}/av-${n}.webp`)

export const WHY = {
  statement:
    'A coding agent works because the repo holds still. An operator acts on a living world that forgets the moment you look away.',
  answer: 'Kepler builds the two things ops never got for free.',
  pillars: [
    { title: 'A world model', copy: 'That deepens with every incident.' },
    { title: 'A standing presence', copy: 'That watches, and wakes itself when something moves.' },
  ],
}

export const CARDS = [
  { tag: 'Privacy', title: 'Your data stays with you', copy: 'Kepler runs on your machine. Bring your own model keys, free on every plan.', image: 'eclipse.webp', position: '62% 70%' },
  { tag: 'Evidence', title: 'Every finding shows its proof', copy: 'The commands it ran, what it saw, and what it is only guessing.', image: 'ch-night.webp' },
  { tag: 'Control', title: 'It suggests. You decide.', copy: 'It asks before it changes anything, and can never loosen its own limits.', image: 'ch-ring.webp' },
  { tag: 'Memory', title: 'It remembers, for you', copy: 'What you teach it stays with you and makes the next incident shorter.', image: 'ch-lights.webp', position: '60% 50%' },
]

export type Milestone = { date: string; title: string; note?: string; left: number; top: number }

/** Milestones on the ring. left and top are the ring's measured path in ch-ring.webp, in percent. */
export const MILESTONES: Milestone[] = [
  { date: '7 July', title: 'First commit', left: 9, top: 69.6 },
  { date: '25 July', title: 'First alpha', note: 'v0.0.3 for a few operators.', left: 29, top: 62.6 },
  { date: 'September', title: 'Beta cohort', note: '76 operators on real systems.', left: 50, top: 54.4 },
  { date: '25 October', title: 'Hack Day Pune', note: '146 people in one room.', left: 71, top: 43.6 },
]

export const STORY_STATS = [
  { value: '600+', label: 'downloads' },
  { value: '220+', label: 'daily active users' },
  { value: '118', label: 'Discord cohort members' },
]

export const BETA_STATS = [
  { value: '7,567', label: 'requests in 12 days' },
  { value: '3,095', label: 'on the busiest day' },
  { value: '86%', label: 'asked for the fast model' },
  { value: '168', label: 'public posts about what they built' },
]

/** What beta members said, and what changed because of it */
export const CHANGES = [
  { said: "It says it's reconnecting when nothing is wrong.", outcome: 'Fixed the next day.', change: 'We rebuilt how the app talks to the agent, so a busy session no longer looks like a lost one.' },
  { said: "Too many approval walls. I can't work like this.", outcome: 'Approve once, keep the rule.', change: 'Kepler remembers what you allowed, and still asks for anything new.' },
  { said: 'My model keys are sitting in a readable file.', outcome: 'Fixed the next day.', change: 'You were right, and we said so.' },
  { said: 'When something breaks I want an answer now, not an essay.', outcome: 'Fast by default.', change: '86% of requests went to the fast model, so it became the default and depth is one step away.' },
]

/** Beta members' words, edited for the page with their approval. Quote photos are cut from LinkedIn. Card photos are the whole original, 600 px square. */
export const VOICES = {
  main: {
    quote:
      'Most AI tools for operations want your production data in someone else’s cloud. Kepler runs on my machine, works with the model I pick, and drives a real browser through my dashboards. It does the legwork and I never leave my flow.',
    name: 'Mridul Gain',
    role: 'SMTS, Platform9',
    photo: 'q-mridul.webp', link: 'https://www.linkedin.com/in/mridulgain/',
  },
  more: [
    { quote: 'A deployment was crashlooping in production on out-of-memory. I gave Kepler the heap dump and the code, and it pointed to the exact place causing it.', name: 'Lokesh Waran', role: 'Engineering, Cimba AI', photo: 'q-lokesh.webp', link: 'https://www.linkedin.com/in/lokesh-waran-3a2860159/' },
    { quote: 'I showed Kepler to our senior VP of platform infrastructure. He was impressed and told me to keep going. Now I’m bringing the wider team on.', name: 'Jason Powell', role: 'Senior Infrastructure Engineer, Skillable', photo: 'q-jason.webp', link: 'https://www.linkedin.com/in/jpisgeek/' },
    { quote: 'It feels like talking to a chat agent, so there was nothing to learn. It just works.', name: 'Chindu Reddy', role: 'AI engineer', photo: 'q-chindu.webp', link: 'https://www.linkedin.com/in/chindu-reddy-r9/' },
  ],
}

/** People who did more than try it. Nobody here repeats a person quoted above. Keep each line 83 to 87
 *  characters so every card wraps to the same two lines. */
export const HELPED: { name: string; role: string; photo?: string; link?: string }[] = [
  { name: 'Hemant Kumar', photo: 'q-hemant.webp', link: 'https://www.linkedin.com/in/hemant-kumar-8a9375b7/', role: 'Built a headless driver that injects faults into Kepler and scores how it handles them.' },
  { name: 'Sagar Utekar', photo: 'q-sagar.webp', link: 'https://www.linkedin.com/in/sagar-utekar/', role: 'Organised Hack Day Pune with Cloud Native Pune for Hacktoberfest, and filled the room.' },
  { name: 'Learn with DevOps Engineer', photo: 'q-lwde.webp', link: 'https://www.youtube.com/@learnwithdevopsengineer', role: 'Stopped a database on purpose and showed 25,000 followers Kepler finding the cause.' },
  { name: 'Rashi', photo: 'q-rashi.webp', link: 'https://www.linkedin.com/in/rashi-malikk/', role: 'RubixKube team. Built Kepler, ran the cohort and office hours, shaped it from feedback.' },
]

/** Display names from the Kepler Discord member list (11 Nov 2026), without the founder, the bots, and entries that
 *  are an email or a bare number. */
export const MEMBERS = ["Shubham","Imran","Bloom","Røháñ","Prasenjit","Maverick","Rashi","MEHUL","Saurabh","Sh3r!ff","Nandini Deshmukh","ground_control🛂","soham","Adil Majeed","Vineet Srivastav","gaurav","Sachin Govind","him7797","Kanva","Gaurav - CPO : MindHub","Kundan Singh","Puran","Jayakumar k k","Swastik","Bikram Debnath","ElmetaDor","Shiv","Roy","Suraj Kumar","Saurabh Hirani","vinay kornapalli","Rajneesh","Vivek SRE","Lokesh","Dipti","sarkar.arthur","DosaDynamite","Ishant","Randy Bias 🇺🇸🇵🇭🇸🇰","Jaideep","Sarthak Basu","Amana","Sonu Singh","mahala","ramiyengar","Rohan Mainali","Kage","bhakt","Titan valker","pacifer26","Aadish Sanghai","🧋","Kartikey","Raghav","Soul Surfer🌄","Samir Wankhede","shruti_01","Ajay Kumar","irbansin","cheerful_panda_54306","Gayatri","Anirudh.D","Kaif","Hemant","Aryan","Talin","nuke","simpliplay","propaine can","Dark Legend","sridhark","sohamdev77","wityliti","JohnP","Sourav","pithagora","vikas","KubeNinja","Kashyap","Gojo2811","ash__","csdeepak2005","Aaradhy Chinche","kaysin","edward007","NetworksGT","Chindu R","Prakash","skg-net","Pramod Thombare","jpisgeek","Vivek Shukla","Simha","Suz_Jailbreak","Atharva Joshi","Parth Nerkar","Tech@2005","hemanthbalaji.","Vaishnav","Rishi Mondal","wipphanp","Yoga","Manthan","Karan Verma"]

export const FOUNDER = {
  name: 'Priyank Upadhyay',
  role: 'Founder, RubixKube',
  photoAlt: 'Priyank Upadhyay on stage, mid-sentence, microphone in hand.',
  letter: [
    "I have spent most of my working life keeping other people's systems alive. Coding agents got a perfect world model for free. The rest of us got dashboards at 3am. Kepler is my attempt at the other half: an agent that learns your infrastructure the way a good colleague does, and asks before it touches anything.",
    'Hundreds of operators used the beta and shaped what it is today. On 20 November it opens to everyone. It ships every week and it is not finished. If something breaks or feels wrong, tell me on the',
  ],
  letterEnd: ' I would rather hear it now than after it is polished.',
}
