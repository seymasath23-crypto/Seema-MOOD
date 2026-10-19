import type { HatKey } from './sprite'

export type CatMode = 'walk' | 'play'

const FUR = '#d97757'
const SHADE = '#b85a3c'
const INK = '#201a17'
const PINK = '#f4a6b7'
const CREAM = '#f6d9c6'

const HATS: Record<HatKey, string> = {
  hardhat:
    '<path d="M50 42 a20 19 0 0 1 40 0 z" fill="#f5c542"/><rect x="46" y="40" width="48" height="6" rx="3" fill="#e0a920"/><rect x="66" y="21" width="8" height="13" rx="2" fill="#e0a920"/>',
  beret:
    '<ellipse cx="68" cy="38" rx="25" ry="9" fill="#d94b4b" transform="rotate(-8 68 38)"/><circle cx="66" cy="28" r="3.2" fill="#b43a3a"/>',
  explorer:
    '<path d="M47 41 a23 19 0 0 1 46 0 z" fill="#8b5a2b"/><rect x="41" y="39" width="58" height="5" rx="2.5" fill="#6e4720"/><rect x="48" y="33" width="44" height="5" fill="#d94b4b"/>',
  cap: '<path d="M49 42 a21 20 0 0 1 42 0 z" fill="#1f9d6e"/><rect x="47" y="39" width="46" height="6" rx="3" fill="#177a55"/><circle cx="70" cy="18" r="6" fill="#f4f4f4"/>',
}

// The cat is drawn once at 140 by 134 and shown at half size. It walks across the strip while Claude runs tools
// and plays with a ball of yarn the rest of the time. Everything moves with SMIL, so no redraw timer is needed.
export function catSvg(hat: HatKey, mode: CatMode): string {
  const walking = mode === 'walk'
  const pawL = walking
    ? `<ellipse cx="54" cy="121" rx="9" ry="6" fill="${CREAM}"><animate attributeName="cy" values="121;114;121" dur="0.5s" repeatCount="indefinite"/></ellipse>`
    : `<ellipse cx="54" cy="121" rx="9" ry="6" fill="${CREAM}"/>`
  const pawR = walking
    ? `<ellipse cx="86" cy="121" rx="9" ry="6" fill="${CREAM}"><animate attributeName="cy" values="114;121;114" dur="0.5s" repeatCount="indefinite"/></ellipse>`
    : `<ellipse cx="86" cy="121" rx="9" ry="6" fill="${CREAM}"/>`
  const swat = walking
    ? ''
    : `<ellipse cx="100" cy="104" rx="8" ry="6" fill="${CREAM}"><animate attributeName="cx" values="100;116;100" dur="0.9s" repeatCount="indefinite"/><animate attributeName="cy" values="104;96;104" dur="0.9s" repeatCount="indefinite"/></ellipse>`
  const body = `
<g>
<animateTransform attributeName="transform" type="rotate" values="${walking ? '-5 70 125;5 70 125;-5 70 125' : '0 70 125;0 70 125'}" dur="${walking ? '0.5s' : '1s'}" repeatCount="indefinite"/>
<g>
<animateTransform attributeName="transform" type="rotate" values="-12 94 100;12 94 100;-12 94 100" dur="${walking ? '0.5s' : '1.1s'}" repeatCount="indefinite"/>
<path d="M94 102 C128 104 136 76 118 64" stroke="${FUR}" stroke-width="10" fill="none" stroke-linecap="round"/>
</g>
<ellipse cx="70" cy="102" rx="30" ry="22" fill="${FUR}"/>
${pawL}${pawR}${swat}
<g>
<animateTransform attributeName="transform" type="rotate" values="${walking ? '0 70 100;0 70 100' : '-6 70 100;6 70 100;-6 70 100'}" dur="1.6s" repeatCount="indefinite"/>
<path d="M38 50 L40 16 L64 36 Z" fill="${FUR}"/>
<path d="M102 50 L100 16 L76 36 Z" fill="${FUR}"/>
<path d="M44 40 L44 25 L57 35 Z" fill="${PINK}"/>
<path d="M96 40 L96 25 L83 35 Z" fill="${PINK}"/>
<ellipse cx="70" cy="64" rx="36" ry="30" fill="${FUR}"/>
<path d="M70 36 v8 M61 38 v6 M79 38 v6" stroke="${SHADE}" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="55" cy="64" rx="5" ry="6.5" fill="${INK}"><animate attributeName="ry" values="6.5;6.5;0.8;6.5" keyTimes="0;0.9;0.95;1" dur="3.2s" repeatCount="indefinite"/></ellipse>
<ellipse cx="85" cy="64" rx="5" ry="6.5" fill="${INK}"><animate attributeName="ry" values="6.5;6.5;0.8;6.5" keyTimes="0;0.9;0.95;1" dur="3.2s" repeatCount="indefinite"/></ellipse>
<circle cx="57" cy="61" r="1.8" fill="#fff"/>
<circle cx="87" cy="61" r="1.8" fill="#fff"/>
<ellipse cx="45" cy="76" rx="6" ry="4" fill="${PINK}" opacity="0.65"/>
<ellipse cx="95" cy="76" rx="6" ry="4" fill="${PINK}" opacity="0.65"/>
<path d="M67 72 h6 l-3 4 z" fill="${PINK}"/>
<path d="M63 80 q3.5 4 7 0 q3.5 4 7 0" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M30 70 l14 3 M30 78 l14 -1 M110 70 l-14 3 M110 78 l-14 -1" stroke="${CREAM}" stroke-width="1.6" stroke-linecap="round"/>
${HATS[hat]}
</g>
</g>`
  const cat = walking
    ? `<g><animateTransform attributeName="transform" type="translate" values="0 0;300 0;0 0" dur="7s" repeatCount="indefinite"/><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="0.5s" repeatCount="indefinite"/>${body}</g></g>`
    : `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1.2s" repeatCount="indefinite"/>${body}</g>`
  const yarn = walking
    ? ''
    : `<g><animateTransform attributeName="transform" type="translate" values="0 0;-26 0;0 0" dur="0.9s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="0 215 118;360 215 118" dur="0.9s" repeatCount="indefinite"/>
<circle cx="215" cy="118" r="13" fill="#e8708a"/><path d="M204 112 q11 6 22 0 M203 120 q12 7 24 0 M208 106 q7 4 14 0" stroke="#b8445f" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<path d="M228 124 q16 4 24 -6" stroke="#e8708a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 134" width="200" height="48">${cat}${yarn}</svg>`
}
