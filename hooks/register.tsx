import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Mood } from '../types'
import { catSvg } from './cat-svg'
import type { CatMode } from './cat-svg'
import { HAT_KEYS, paint, pixels } from './sprite'
import type { HatKey } from './sprite'

const mood = atom({ plugin: 'seyma-mood', key: 'mood' } as const, 'create' as Mood)

const MOODS: Record<Mood, { label: string; face: string; color: string; line: string; hint: string; tone: string }> = {
  create: {
    label: 'Create',
    face: '(=^･ω･^=)',
    color: '#ff8fc8',
    line: 'Meow, creative mode, let us make something cute!',
    hint: 'video editor · theme-factory · design-taste',
    tone: 'Seyma is in a creative mood. She edits talking-head videos with English and Khmer subtitles. Speak in a light, friendly anime-style voice with an occasional kaomoji, never at the cost of clarity. Offer ideas freely, keep replies short and visual, and ask what the piece is for.',
  },
  build: {
    label: 'Build',
    face: '(=｀ω´=)',
    color: '#8ea2ff',
    line: 'Build mode, paws on the keyboard!',
    hint: 'engineering · playwright · code-review',
    tone: 'Seyma is in a building mood. Be direct and practical, show the change first and the reasoning second, and test in the real app where you can.',
  },
  organize: {
    label: 'Organize',
    face: '(=･ω･=)ﾉ',
    color: '#f0b84a',
    line: 'Organize mode, knocking things into place!',
    hint: 'morning · docs · xlsx · slack',
    tone: 'Seyma is in an organizing mood. Prefer short lists, clear next steps and finished documents over long explanations.',
  },
  learn: {
    label: 'Learn',
    face: '(=^‥^=)♡',
    color: '#6fe0d0',
    line: 'Learn mode, curious cat time!',
    hint: 'learn · deep-research',
    tone: 'Seyma is in a learning mood. Explain in plain words with one example, then check her understanding with a small question.',
  },
}

const frame = atom({ plugin: 'seyma-mood', key: 'frame' } as const, 0)
const isWorking = atom({ plugin: 'seyma-mood', key: 'isWorking' } as const, false)

// The pixel cat: a hat for each mood, a hop, a blink and walking legs; sparkles drift beside it.
const HAT_OF: Record<Mood, HatKey> = { create: HAT_KEYS[2], build: HAT_KEYS[3], organize: HAT_KEYS[0], learn: HAT_KEYS[1] }
const SPARKS = ['✦  ·', '·✧  ', ' ✦ ·', '  ✧·']
const VERBS = ['purring along', 'working hard', 'almost there', 'on it, meow']

const catMode = atom({ plugin: 'seyma-mood', key: 'catMode' } as const, 'play' as CatMode)

let walkTimer: { cancel: () => void } | null = null
let tick: { cancel: () => void } | null = null

const ORDER: Mood[] = ['create', 'build', 'organize', 'learn']

// One place changes the mood: the page state, the status line, a toast, and the saved choice for next time.
async function setMood($: EngineInterface, next: Mood, isQuiet = false) {
  await update($, mood, () => next)
  $.ui.status(`Mood: ${MOODS[next].label}`)
  if (!isQuiet) $.ui.toast(MOODS[next].line)
  await $.store.set('mood', next)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'mood',
      description: 'Set your mood: create, build, organize or learn',
    })
    const saved = await $.store.get('mood')
    const start = ORDER.includes(saved as Mood) ? (saved as Mood) : 'create'
    await setMood($, start, true)

    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    await update($, catMode, () => 'play')
    if (tick === null) {
      await update($, isWorking, () => true)
      tick = $.clock.every(450, () => update($, frame, n => n + 1))
    }

    return next(e)
  })

  // Running a tool means real work: the cat walks, then goes back to playing after a few quiet seconds.
  on('tool.call', async ($, e, next) => {
    await update($, catMode, () => 'walk')
    walkTimer?.cancel()
    walkTimer = $.clock.after(4000, () => update($, catMode, () => 'play'))

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    if (!e.agentId && tick !== null) {
      tick.cancel()
      tick = null
      walkTimer?.cancel()
      walkTimer = null
      await update($, isWorking, () => false)
    }

    return next(e)
  })

  on('command.run', { command: 'mood' }, async ($, e) => {
    const wanted = e.args.trim().toLowerCase() as Mood
    if (!ORDER.includes(wanted)) {
      return { text: 'Pick one: create, build, organize or learn.' }
    }
    await setMood($, wanted)

    return { text: MOODS[wanted].line }
  })

  on('prompt.compose', async ($, e, next) => {
    const ran = await next(e)
    const current = await read($, mood)

    return {
      sections: [
        ...ran.sections,
        { id: 'seyma-mood:tone', text: MOODS[current].tone, scope: 'session' },
      ],
    }
  })

  // A quiet one-line bar that is always there; the pixel friend joins it only while Claude works.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }
    const ui = $.ui.resolve(e) as any
    const { Box, Button, Text, Svg } = ui
    const current = await read($, mood)
    const n = await read($, frame)
    const working = await read($, isWorking)
    const mode = await read($, catMode)
    const look = MOODS[current]

    return (
      <Box flexDirection="column">
        {working && (
          <Box>
            {e.surface === 'desktop' && Svg ? (
              <Svg source={catSvg(look.color, mode)} alt={mode === 'walk' ? 'A cat walking while Claude works' : 'A cat playing with yarn'} width={200} height={48} isInteractive />
            ) : (
              <Box flexDirection="column">
                {paint(pixels(HAT_OF[current], n)).map(line => (
                  <Text>
                    {line.map(c => (
                      <Text color={c.fg} backgroundColor={c.bg}>{c.text}</Text>
                    ))}
                  </Text>
                ))}
              </Box>
            )}
            <Box flexDirection="column" justifyContent="center" paddingLeft={2}>
              <Text color={look.color} bold>
                {VERBS[Math.floor(n / 6) % VERBS.length]}{'.'.repeat(1 + (n % 3))}
              </Text>
              <Text color={look.color}>{SPARKS[n % SPARKS.length]}</Text>
            </Box>
          </Box>
        )}
        <Box>
          {ORDER.map(one => (
            <Button
              key={one}
              label={one === current ? `● ${MOODS[one].label}  ` : `${MOODS[one].label}  `}
              onPress={() => setMood($, one)}
            />
          ))}
          <Text dimColor>{look.hint}</Text>
        </Box>
      </Box>
    )
  })
}
