// A little pixel creature drawn in half-block characters: two pixel rows per text row.
export type HatKey = 'explorer' | 'cap' | 'beret' | 'hardhat'

export const HAT_KEYS: HatKey[] = ['explorer', 'cap', 'beret', 'hardhat']

const COLORS: Record<string, string> = {
  o: '#d97757',
  d: '#201a17',
  e: '#201a17',
  p: '#f4a6b7',
  b: '#8b5a2b',
  r: '#d94b4b',
  g: '#1f9d6e',
  y: '#f5c542',
  w: '#f4f4f4',
  k: '#6b6b6b',
  t: '#e0b25a',
}

const BLANK = '...............'

// Narrow hats that sit between the cat's ears (columns 5 to 9), drawn over the top four rows.
const HATS: Record<HatKey, string[]> = {
  explorer: ['......bbb......', '.....bbbbb.....', '.....bbbbb.....', '.....rrrrr.....'],
  cap: ['......www......', '.....ggggg.....', '.....ggggg.....', '.....ggggg.....'],
  beret: ['...............', '......rrr......', '.....rrrrr.....', '.....rrrrr.....'],
  hardhat: ['......yyy......', '.....yyyyy.....', '.....yyyyy.....', '.....yyyyy.....'],
}

// An orange cat: pointed ears with pink insides, eyes, a muzzle and nose, whiskers, a tail and paws.
const CAT = [
  '...............',
  '..oo.......oo..',
  '..opo.....opo..',
  '..ooooooooooo..',
  '..ooeoooooeoo..',
  '..ooeoooooeoo..',
  '..oooowpwoooo..',
  'ww.ooooooooo.ww',
  '...ooooooooo..o',
  '...ooooooooo.oo',
]
const PAWS_A = ['...oo.o.o.oo...', '...oo.o.o.oo...']
const PAWS_B = ['...o.oo.oo.o...', '...o.oo.oo.o...']

/** Pixel rows (14, so 7 text rows) for one animation tick n: a one-pixel hop, a blink, walking paws. */
export function pixels(hat: HatKey, n: number): string[] {
  const blink = n % 8 === 5
  const body = [...CAT, ...(n % 2 === 0 ? PAWS_A : PAWS_B)].map(r => (blink ? r.replace(/e/g, 'o') : r))
  const rows = body.map((row, i) => {
    const over = HATS[hat][i]
    if (!over) return row
    return [...row].map((c, x) => (over[x] !== '.' ? over[x] : c)).join('')
  })

  return n % 2 === 0 ? [...rows, BLANK, BLANK] : [BLANK, ...rows, BLANK]
}

export type Cell = { text: string; fg?: string; bg?: string }

/** Folds pixel rows into text rows of runs, so each run is one coloured Text. */
export function paint(rows: string[]): Cell[][] {
  const out: Cell[][] = []
  for (let i = 0; i + 1 < rows.length; i += 2) {
    const line: Cell[] = []
    for (let c = 0; c < rows[i].length; c++) {
      const top = COLORS[rows[i][c]]
      const bottom = COLORS[rows[i + 1][c]]
      let cell: Cell
      if (top && bottom) cell = { text: '▀', fg: top, bg: bottom }
      else if (top) cell = { text: '▀', fg: top }
      else if (bottom) cell = { text: '▄', fg: bottom }
      else cell = { text: ' ' }
      const last = line[line.length - 1]
      if (last && last.fg === cell.fg && last.bg === cell.bg) last.text += cell.text
      else line.push(cell)
    }
    out.push(line)
  }
  return out
}
