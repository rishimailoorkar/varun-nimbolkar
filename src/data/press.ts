export interface PressArticle {
  number: string;
  date: string;
  publication: string;
  headline: string;
  url?: string;
  author?: string;
  content?: string;
  clippingImage?: string;
  thumbnailImage?: string;
}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    number: '01',
    date: 'September 2026',
    publication: 'MID-DAY',
    headline: 'Witness this immersive fusion performance in Bandra this week with a sitar',
    url: 'https://www.mid-day.com/mumbai-guide/things-to-do/article/witness-this-immersive-fusion-performance-by-varun-nimbolkar-in-bandra-this-week-with-a-sitar-23650986',
    clippingImage: '/images/press kit/mid-day-bandra.webp',
    content: 'Feature about Varun Nimbolkar and his immersive fusion performance in Bandra this week with a sitar.',
  },
  {
    number: '02',
    date: 'October 2025',
    publication: 'HOMEGROWN MAGAZINE',
    headline: "Varun Nimbolkar's Indian Experimental Fusion EP Doubles Down On Emotive Storytelling",
    url: 'https://homegrown.co.in/homegrown-creators/varun-nimbolkars-indian-experimental-fusion-ep-doubles-down-on-emotive-storytelling',
    clippingImage: '/images/press kit/homegrown-bah-bah-black-sheep.webp',
    content: 'Feature about Varun Nimbolkar’s Indian experimental fusion EP Bah Bah Black Sheep doubling down on emotive storytelling.',
  },
  {
    number: '03',
    date: 'October 2025',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: "Varun Nimbolkar's 'Bah Bah Black Sheep' Sits Comfortably Between Indian Classical and Electronica",
    url: 'https://theindianmusicdiaries.com/varun-nimbolkars-bah-bah-black-sheep-sits-comfortably-between-indian-classical-and-electronica/',
    clippingImage: '/images/press kit/timd-bah-bah-black-sheep.webp',
    content: 'Review of Bah Bah Black Sheep EP blending Indian classical and electronica.',
  },
  {
    number: '04',
    date: '26 July 2025',
    publication: 'THE NAVHIND TIMES — ZEST',
    headline: 'Strings and Stories',
    author: 'Adithi Sharma',
    content: 'Feature about the Varun Nimbolkar Collective and its debut performance in Goa.',
    url: '/images/press kit/strings-and-stories.webp',
    thumbnailImage: '/images/press kit/navhind-strings-and-stories.webp',
    clippingImage: '/images/press kit/strings-and-stories.webp',
  },
  {
    number: '05',
    date: '21 September 2026',
    publication: 'MID-DAY — THE GUIDE',
    headline: 'String Theory',
    author: 'Devashish Kamble',
    content: 'Feature about Varun Nimbolkar and his fusion music, combining sitar with genres such as Hip-Hop, Afro and Rock.',
    url: '/images/press kit/string-theory.webp',
    thumbnailImage: '/images/press kit/mid-day-string-theory.webp',
    clippingImage: '/images/press kit/string-theory.webp',
  },
  {
    number: '06',
    date: 'February 2026',
    publication: 'HOMEGROWN MAGAZINE',
    headline: 'Art That Inspires: 7 Homegrown Musicians On The Books That Shaped Their Sound',
    url: 'https://homegrown.co.in/homegrown-creators/art-that-inspires-7-homegrown-musicians-on-the-books-that-shaped-their-sound',
    clippingImage: '/images/press kit/homegrown-art-that-inspires.webp',
    content: 'Feature on Varun Nimbolkar discussing books and literature that inspired his musical sound.',
  },
  {
    number: '07',
    date: 'August 2025',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: "Derek & The Cats' 'People to Meet, Places to See' is a Record Both You and Your Dad Can Dance To",
    url: 'https://theindianmusicdiaries.com/derek-the-cats-people-to-meet-places-to-see-is-a-record-both-you-and-your-dad-can-dance-to/',
    clippingImage: '/images/press kit/timd-derek-and-the-cats.webp',
    content: 'Album review for Derek & The Cats feature record.',
  },
];

