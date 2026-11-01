import type { SVGProps } from 'react';

// Iconoir outline paths, bundled here so every control renders without an icon font or CDN.
type IconProps = SVGProps<SVGSVGElement>;
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, xmlns: 'http://www.w3.org/2000/svg' };

export function ArrowUpRight(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M6 19 19 6M19 6v12.48M19 6H6.52" /></svg>; }
export function ArrowDown(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M12 3v18m0 0 8.5-8.5M12 21l-8.5-8.5" /></svg>; }
export function ArrowUp(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M12 21V3m0 0 8.5 8.5M12 3l-8.5 8.5" /></svg>; }
export function Download(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M6 20h12M12 4v12m0 0 3.5-3.5M12 16l-3.5-3.5" /></svg>; }
export function NavArrowDown(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="m6 9 6 6 6-6" /></svg>; }
export function Play(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032L6.906 4.537Z" /></svg>; }
export function SoundHigh(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M1 13.857v-3.714a2 2 0 0 1 2-2h2.9c.196 0 .387-.057.55-.165l6-3.956A1 1 0 0 1 14 4.857v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z" /><path d="M17.5 7.5s1.5 1.5 1.5 4-1.5 4m3-11s2.5 2.5 2.5 7-2.5 7" /></svg>; }
export function SoundOff(props: IconProps) { return <svg {...base} width={24} height={24} {...props}><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9c.196 0 .387-.057.55-.165l6-3.956A1 1 0 0 1 15 4.857v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" /><path d="m18 10 4 4m0-4-4 4" /></svg>; }
