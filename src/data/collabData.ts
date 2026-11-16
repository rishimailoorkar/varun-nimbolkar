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

export interface BrandCollab {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  brand: string;
  description: string;
  artwork: string;
  artworkAlt: string;
  primaryUrl: string;
  primaryLabel: string;
}

export const SELECTED_COLLABORATIONS: CollabProject[] = [
  {
    id: 'tienas',
    projectNumber: 'Project 01',
    title: 'Tienas',
    description: 'Partnered with hip-hop/indie artist Tienas on cross-genre music projects, blending intricate sitar dynamics with contemporary urban beats.',
    artwork: '/images/collab/tienas-collab.webp',
    artworkAlt: 'Tienas and Varun Nimbolkar collaboration cover artwork',
    streamUrl: 'https://music.apple.com/us/album/okay/1839760278?i=1839760422',
    streamLabel: 'Listen to Track',
  },
  {
    id: 'thoda-sa',
    projectNumber: 'Project 02',
    title: 'Thoda Sa',
    artist: 'Gunda feat. Varun Nimbolkar & Unkill ji',
    description: "Contributed signature sitar work and production to the track 'Thoda Sa' by Gunda, released via Azadi Records.",
    artwork: '/images/collab/thoda-sa.webp',
    artworkAlt: 'Thoda Sa single cover artwork by Gunda featuring Varun Nimbolkar and Unkill ji',
    streamUrl: 'https://music.apple.com/us/song/1840842812',
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
];

export const BRAND_COLLABORATION: BrandCollab = {
  id: 'khaddar-ind',
  category: 'Brand Collaboration',
  title: 'Khaddar Ind',
  subtitle: 'A Varun Nimbolkar Edit',
  brand: 'Artists & Allies',
  description:
    'A conscious brand collaboration celebrating creators who honor tradition while shaping contemporary narratives. Varun’s distinctive musical practice weaves Indian classical foundations with modern acoustic-electronic exploration, storytelling, and cultural dialogue.',
  artwork: '/images/collab/khaddar-edit-square.webp',
  artworkAlt: 'Khaddar Ind — A Varun Nimbolkar Edit campaign photography',
  primaryUrl: 'https://khaddar.shop/community2',
  primaryLabel: 'Explore Collaboration',
};
