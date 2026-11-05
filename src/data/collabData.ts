export interface CollabProject {
  id: string;
  projectNumber: string;
  title: string;
  subtitle?: string;
  artist?: string;
  description: string;
  artwork: string;
  artworkAlt: string;
  streamUrl: string;
  streamLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

export interface MetricFeature {
  id: string;
  category: string;
  metric: string;
  metricLabel: string;
  title: string;
  brand?: string;
  description: string;
  artwork: string;
  artworkAlt: string;
  primaryUrl: string;
  primaryLabel: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

export const FEATURED_PROJECT: CollabProject = {
  id: 'thoda-sa',
  projectNumber: 'Featured Project — 01',
  title: 'Thoda Sa',
  artist: 'Gunda feat. Varun Nimbolkar & Unkill ji',
  description: "Contributed signature sitar work and production to the track 'Thoda Sa' by Gunda, released via Azadi Records.",
  artwork: '/images/collab/thoda-sa.webp',
  artworkAlt: 'Thoda Sa single cover artwork by Gunda featuring Varun Nimbolkar and Unkill ji',
  streamUrl: 'https://music.apple.com/us/song/1840842812',
  streamLabel: 'Listen to Track',
};

export const SELECTED_COLLABORATIONS: CollabProject[] = [
  {
    id: 'tienas',
    projectNumber: 'Project 02',
    title: 'Tienas',
    description: 'Partnered with hip-hop/indie artist Tienas on cross-genre music projects, blending intricate sitar dynamics with contemporary urban beats.',
    artwork: '/images/collab/tienas-collab.webp',
    artworkAlt: 'Tienas and Varun Nimbolkar collaboration cover artwork',
    streamUrl: 'https://music.apple.com/us/album/okay/1839760278?i=1839760422',
    streamLabel: 'Listen to Track',
  },
  {
    id: 'amritha-thankachy',
    projectNumber: 'Project 03',
    title: 'Amritha Thankachy',
    subtitle: 'Reinventing Daras Bina',
    description: 'Joined forces with singer-composer Amritha Thankachy, merging Hindustani/Carnatic sensibilities with contemporary production styles.',
    artwork: '/images/collab/amritha-thankachy.webp',
    artworkAlt: "Reinventing Monty Sharma's Daras Bina cover artwork featuring Amritha Thankachy and Varun Nimbolkar",
    streamUrl: 'https://music.apple.com/us/album/reinventing-daras-bina-feat-varun-nimbolkar/1715017136?i=1715017137',
    streamLabel: 'Listen to Track',
  },
  {
    id: 'maya',
    projectNumber: 'Project 04',
    title: 'Maya',
    artist: 'Derek & The Cats',
    description: "Featured artist on the track 'Maya' from the album People to Meet, Places to See.",
    artwork: '/images/collab/maya.png',
    artworkAlt: "Maya track artwork from Derek & The Cats' album People to Meet, Places to See",
    streamUrl: 'https://www.amazon.com/music/player/artists/B0944N9V1H/varun-nimbolkar',
    streamLabel: 'Listen to Track',
    secondaryUrl: 'https://rollingstoneindia.com/review-rundown-tanmaya-bhatnagar-anoushka-maskey-apoorva-krishna/',
    secondaryLabel: 'Press Coverage',
  },
  {
    id: 'the-unposted-letter',
    projectNumber: 'Project 05',
    title: 'The Unposted Letter',
    subtitle: 'With Saee Tembhekar',
    description: 'A collaborative single featuring vocalist Saee Tembhekar, which received coverage across Rockstreet Journal (RSJ Buzz) and Rolling Stone India.',
    artwork: '/images/collab/unposted-letter.webp',
    artworkAlt: 'The Unposted Letter single cover artwork by Varun Nimbolkar featuring Saee Tembhekar',
    streamUrl: 'https://music.apple.com/us/album/the-unposted-letter-feat-saee-tembhekar-single/1575459665',
    streamLabel: 'Listen to Track',
  },
];

export const BRAND_PARTNERSHIP: MetricFeature = {
  id: 'fabindia',
  category: 'Brand Partnerships & In-Store Curation',
  metric: '12',
  metricLabel: 'Months',
  title: 'Watching Her Dance',
  brand: 'FabIndia',
  description: "His acoustic track 'Watching Her Dance' was selected by FabIndia to be played across all of its retail stores throughout India for a continuous 12-month period as part of their curated in-store playlist.",
  artwork: '/images/collab/watching-her-dance.webp',
  artworkAlt: "Watching Her Dance single artwork curated for FabIndia in-store rotation nationwide",
  primaryUrl: 'https://music.apple.com/us/album/watching-her-dance-single/1566189013',
  primaryLabel: 'Listen to Track',
  secondaryUrl: 'https://www.fabindia.com/',
  secondaryLabel: 'Visit FabIndia',
};

export const AI_INNOVATION: MetricFeature = {
  id: 'beatoven-ai',
  category: 'Sound Design & AI Music Innovation',
  metric: '400+',
  metricLabel: 'Sitar Loops & Phrases',
  title: 'Beatoven AI',
  description: 'Contributed a custom library of over 400 sitar-based loops and phrases for the sample library of Beatoven, an innovative AI-driven music composition software designed for creators and filmmakers.',
  artwork: '/images/collab/beatoven-ai.png',
  artworkAlt: 'Beatoven.ai generative sound design brand artwork and sitar sample library',
  primaryUrl: 'https://www.beatoven.ai/',
  primaryLabel: 'Visit Beatoven.ai',
  secondaryUrl: 'https://www.beatoven.ai/about',
  secondaryLabel: 'About Beatoven',
};

