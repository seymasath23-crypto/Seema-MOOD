export type CatMode = 'walk' | 'play'

// A flat black cat: a wide head with pointed ears, big gold-ringed eyes, and a bow in the mood's colour.
// A faint rim keeps the black shapes readable on a dark background.
const FUR = '#16191d'
const RIM = '#454b55'
const GOLD = '#e8b33a'
const PUPIL = '#0b0d10'
const LIGHT = '#c9ced6'

const BLINK = '<animate attributeName="ry" values="R;R;0.8;R" keyTimes="0;0.92;0.96;1" dur="3.4s" repeatCount="indefinite"/>'
const blink = (ry: number) => BLINK.replace(/R/g, String(ry))

function bow(x: number, y: number, color: string, scale = 1): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 0 L-15 -9 Q-18 0 -15 9 Z M0 0 L15 -9 Q18 0 15 9 Z" fill="${color}" stroke-linejoin="round"/><rect x="-4" y="-4.5" width="8" height="9" rx="3" fill="${color}"/><path d="M-3 -2 v4 M3 -2 v4" stroke="${PUPIL}" stroke-opacity="0.25" stroke-width="1"/></g>`
}

// The playing cat sitting, seen from the front: big head, ringed eyes, bow tie, a curl of tail; one paw bats at the yarn.
function frontCat(color: string): string {
  return `
<ellipse cx="72" cy="128" rx="34" ry="4" fill="${PUPIL}" opacity="0.18"/>
<g>
<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.2s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="-8 92 124;8 92 124;-8 92 124" dur="1.3s" repeatCount="indefinite"/>
<path d="M88 124 Q122 128 121 114 Q120 104 110 108" stroke="${FUR}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
<path d="M54 92 Q52 128 58 128 L86 128 Q92 128 90 92 Z" fill="${FUR}" stroke="${RIM}" stroke-width="1.5"/>
<ellipse cx="96" cy="112" rx="6" ry="5" fill="${FUR}" stroke="${RIM}" stroke-width="1.5"><animate attributeName="cx" values="94;110;94" dur="0.9s" repeatCount="indefinite"/><animate attributeName="cy" values="114;104;114" dur="0.9s" repeatCount="indefinite"/></ellipse>
<g><animateTransform attributeName="transform" type="rotate" values="-5 72 90;5 72 90;-5 72 90" dur="1.8s" repeatCount="indefinite"/>
<path d="M26 54 L26 12 L48 32 Q72 26 96 32 L118 12 L118 54 Q118 94 72 94 Q26 94 26 54 Z" fill="${FUR}" stroke="${RIM}" stroke-width="1.5" stroke-linejoin="round"/>
<ellipse cx="50" cy="58" rx="15" ry="15" fill="${PUPIL}" stroke="${GOLD}" stroke-width="4">${blink(15)}</ellipse>
<ellipse cx="94" cy="58" rx="15" ry="15" fill="${PUPIL}" stroke="${GOLD}" stroke-width="4">${blink(15)}</ellipse>
<circle cx="45" cy="52" r="2.6" fill="#ffffff" opacity="0.8"/>
<circle cx="89" cy="52" r="2.6" fill="#ffffff" opacity="0.8"/>
</g>
${bow(72, 96, color)}
</g>`
}

const YARN = `<g><animateTransform attributeName="transform" type="translate" values="0 0;-22 0;0 0" dur="0.9s" repeatCount="indefinite"/>
<g><animateTransform attributeName="transform" type="rotate" values="0 150 118;360 150 118" dur="0.9s" repeatCount="indefinite"/>
<circle cx="150" cy="118" r="11" fill="#e8708a"/><path d="M141 113 q9 5 18 0 M140 120 q10 6 20 0 M144 108 q6 3 12 0" stroke="#b8445f" stroke-width="1.8" fill="none" stroke-linecap="round"/></g>
<path d="M161 124 q14 4 22 -5" stroke="#e8708a" stroke-width="2" fill="none" stroke-linecap="round"/></g>`

// The cat sits and bats at a ball of yarn. All motion is SMIL, so no redraw timer is needed.
export function catSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 134" width="72" height="48">${frontCat(color)}${YARN}</svg>`
}
