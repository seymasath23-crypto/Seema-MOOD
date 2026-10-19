import type { HatKey } from './sprite'

export type CatMode = 'walk' | 'play'

// A black cat. A soft violet rim keeps it visible on dark backgrounds.
const FUR = '#1f1d24'
const RIM = '#5b5668'
const EYE = '#f5d547'
const INK = '#0d0c10'
const PINK = '#f4a6b7'
const LIGHT = '#cfcad8'
const PAW = '#2e2b36'

const HATS: Record<HatKey, string> = {
  hardhat:
    '<path d="M50 42 a20 19 0 0 1 40 0 z" fill="#f5c542"/><rect x="46" y="40" width="48" height="6" rx="3" fill="#e0a920"/><rect x="66" y="21" width="8" height="13" rx="2" fill="#e0a920"/>',
  beret:
    '<ellipse cx="68" cy="38" rx="25" ry="9" fill="#d94b4b" transform="rotate(-8 68 38)"/><circle cx="66" cy="28" r="3.2" fill="#b43a3a"/>',
  explorer:
    '<path d="M47 41 a23 19 0 0 1 46 0 z" fill="#8b5a2b"/><rect x="41" y="39" width="58" height="5" rx="2.5" fill="#6e4720"/><rect x="48" y="33" width="44" height="5" fill="#d94b4b"/>',
  cap: '<path d="M49 42 a21 20 0 0 1 42 0 z" fill="#1f9d6e"/><rect x="47" y="39" width="46" height="6" rx="3" fill="#177a55"/><circle cx="70" cy="18" r="6" fill="#f4f4f4"/>',
}

const BLINK = '<animate attributeName="ry" values="R;R;0.6;R" keyTimes="0;0.9;0.95;1" dur="3.2s" repeatCount="indefinite"/>'
const blink = (ry: number) => BLINK.replace(/R/g, String(ry))

// One leg seen from the side, swinging from the hip. Two legs share a phase, the other two run opposite.
function leg(x: number, phase: 'a' | 'b'): string {
  const swing = phase === 'a' ? '-22;22;-22' : '22;-22;22'
  return `<g><animateTransform attributeName="transform" type="rotate" values="${swing
    .split(';')
    .map(a => `${a} ${x} 94`)
    .join(';')}" dur="0.6s" repeatCount="indefinite"/><path d="M${x} 94 L${x} 122" stroke="${FUR}" stroke-width="8" stroke-linecap="round"/><circle cx="${x}" cy="122" r="4.5" fill="${PAW}"/></g>`
}

// The walking cat in profile, facing right, about 150 by 130 before scaling.
function sideCat(hat: HatKey): string {
  return `
<g>
<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="0.3s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="-8 32 80;8 32 80;-8 32 80" dur="1.2s" repeatCount="indefinite"/>
<path d="M34 82 C10 76 6 50 20 34" stroke="${RIM}" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M34 82 C10 76 6 50 20 34" stroke="${FUR}" stroke-width="8" fill="none" stroke-linecap="round"/></g>
${leg(48, 'b')}${leg(98, 'a')}
<ellipse cx="72" cy="84" rx="40" ry="20" fill="${FUR}" stroke="${RIM}" stroke-width="2"/>
${leg(56, 'a')}${leg(90, 'b')}
<path d="M100 50 L103 26 L113 44 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2" stroke-linejoin="round"/>
<path d="M116 44 L126 26 L128 50 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2" stroke-linejoin="round"/>
<path d="M104 44 L105 33 L110 42 Z" fill="${PINK}"/>
<path d="M119 42 L124 33 L125 45 Z" fill="${PINK}"/>
<circle cx="114" cy="62" r="21" fill="${FUR}" stroke="${RIM}" stroke-width="2"/>
<ellipse cx="121" cy="59" rx="4.5" ry="5.5" fill="${EYE}">${blink(5.5)}</ellipse>
<ellipse cx="122" cy="59" rx="1.6" ry="4.5" fill="${INK}">${blink(4.5)}</ellipse>
<path d="M132 66 l4 -1 l-2 4 z" fill="${PINK}"/>
<path d="M130 72 q3 3 6 0" stroke="${LIGHT}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
<path d="M128 68 l18 -4 M128 71 l18 1" stroke="${LIGHT}" stroke-width="1.2" stroke-linecap="round"/>
<g transform="translate(58 12) scale(0.8)">${HATS[hat]}</g>
</g>`
}

// The playing cat, seen from the front, batting at the yarn.
function frontCat(hat: HatKey): string {
  return `
<g>
<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1.2s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="-12 94 100;12 94 100;-12 94 100" dur="1.1s" repeatCount="indefinite"/>
<path d="M94 102 C128 104 136 76 118 64" stroke="${RIM}" stroke-width="14" fill="none" stroke-linecap="round"/>
<path d="M94 102 C128 104 136 76 118 64" stroke="${FUR}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
<ellipse cx="70" cy="102" rx="30" ry="22" fill="${FUR}" stroke="${RIM}" stroke-width="2"/>
<ellipse cx="54" cy="121" rx="9" ry="6" fill="${PAW}" stroke="${RIM}" stroke-width="1.5"/>
<ellipse cx="86" cy="121" rx="9" ry="6" fill="${PAW}" stroke="${RIM}" stroke-width="1.5"/>
<ellipse cx="100" cy="104" rx="8" ry="6" fill="${PAW}" stroke="${RIM}" stroke-width="1.5"><animate attributeName="cx" values="100;116;100" dur="0.9s" repeatCount="indefinite"/><animate attributeName="cy" values="104;96;104" dur="0.9s" repeatCount="indefinite"/></ellipse>
<g><animateTransform attributeName="transform" type="rotate" values="-6 70 100;6 70 100;-6 70 100" dur="1.6s" repeatCount="indefinite"/>
<path d="M38 50 L40 16 L64 36 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2" stroke-linejoin="round"/>
<path d="M102 50 L100 16 L76 36 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2" stroke-linejoin="round"/>
<path d="M44 40 L44 25 L57 35 Z" fill="${PINK}"/>
<path d="M96 40 L96 25 L83 35 Z" fill="${PINK}"/>
<ellipse cx="70" cy="64" rx="36" ry="30" fill="${FUR}" stroke="${RIM}" stroke-width="2"/>
<ellipse cx="55" cy="63" rx="6" ry="7" fill="${EYE}">${blink(7)}</ellipse>
<ellipse cx="85" cy="63" rx="6" ry="7" fill="${EYE}">${blink(7)}</ellipse>
<ellipse cx="55" cy="63" rx="2" ry="5.5" fill="${INK}">${blink(5.5)}</ellipse>
<ellipse cx="85" cy="63" rx="2" ry="5.5" fill="${INK}">${blink(5.5)}</ellipse>
<ellipse cx="45" cy="77" rx="6" ry="4" fill="${PINK}" opacity="0.45"/>
<ellipse cx="95" cy="77" rx="6" ry="4" fill="${PINK}" opacity="0.45"/>
<path d="M67 72 h6 l-3 4 z" fill="${PINK}"/>
<path d="M63 80 q3.5 4 7 0 q3.5 4 7 0" stroke="${LIGHT}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M30 70 l14 3 M30 78 l14 -1 M110 70 l-14 3 M110 78 l-14 -1" stroke="${LIGHT}" stroke-width="1.4" stroke-linecap="round"/>
${HATS[hat]}
</g>
</g>`
}

const YARN = `<g><animateTransform attributeName="transform" type="translate" values="0 0;-26 0;0 0" dur="0.9s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="0 215 118;360 215 118" dur="0.9s" repeatCount="indefinite"/>
<circle cx="215" cy="118" r="13" fill="#e8708a"/><path d="M204 112 q11 6 22 0 M203 120 q12 7 24 0 M208 106 q7 4 14 0" stroke="#b8445f" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<path d="M228 124 q16 4 24 -6" stroke="#e8708a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`

// Walking: the cat crosses the strip from left to right, then starts again off the left edge.
// Playing: the front-facing cat bats at a ball of yarn. All motion is SMIL, so no redraw timer is needed.
export function catSvg(hat: HatKey, mode: CatMode): string {
  const scene =
    mode === 'walk'
      ? `<g><animateTransform attributeName="transform" type="translate" values="-160 0;580 0" dur="6s" repeatCount="indefinite"/>${sideCat(hat)}</g>`
      : `${frontCat(hat)}${YARN}`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 134" width="200" height="48">${scene}</svg>`
}
