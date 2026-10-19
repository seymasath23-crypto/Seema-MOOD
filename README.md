# seyma-mood

A mood bar for Claude Code. Pick how you feel and Claude changes with it.

- **Four moods:** Create, Build, Organize and Learn. Click a button above the prompt, or type `/mood build`.
- **Tone:** each mood gives Claude a short instruction, such as "short and visual" for Create or "direct and practical" for Build.
- **Remembers you:** your last mood comes back in the next session.
- **A working cat:** in the desktop app a small black cat walks from left to right while Claude runs tools, and plays with yarn while it thinks. In a terminal you get a block-pixel version.
- **Hats:** the cat wears a different hat for each mood.

## Install

In a terminal, run these one at a time:

```
claude plugin marketplace add seymasath23-crypto/Seema-MOOD
claude plugin install seyma-mood@seyma-mood
```

In the desktop app, click **+** next to the prompt box, then **Plugins**, then **Add marketplace** and enter `seymasath23-crypto/Seema-MOOD`. Then add the `seyma-mood` plugin.

Needs Claude Code 2.1.287 or newer. Restart the session after installing.

## Use

- `/mood create`, `/mood build`, `/mood organize`, `/mood learn`
- Change the tones, colours and hints at the top of `hooks/register.tsx`.

## Notes

The mood tone is added to Claude's system prompt through the `prompt.compose` hook. Where an organization manages Claude Code, that part may not run.

## The mods I use with it

This repo's marketplace also lists the mods I use. They are other people's work and nothing is copied here: each entry points to the author's own repository. Read a mod's repository before you install it.

| Mod | Author | What it is |
|---|---|---|
| `savvy-flow` | JohnnyVizz | Plan, delegate to worker subagents, review |
| `savvy-progress` | JohnnyVizz | Progress bar and live agents panel |
| `skins` | hellosverre | Themes and a usage band |
| `filetree` | data-goblin | File tree that shows what Claude is doing |
| `cache-tax` | karanb192 | Prompt cache cost and keep-warm |
| `blast-radius`, `replay-theater`, `token-weather` | Anthropic samples | See the playground repo |

Install any of them from this marketplace, for example:

```
claude plugin install savvy-progress@seyma-mood
```

My own personal skills and the plugins synced from my claude.ai account are not part of this repo.
