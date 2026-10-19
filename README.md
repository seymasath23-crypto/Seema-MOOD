# seyma-mood

A mood bar for Claude Code. Pick how you feel and Claude changes with it.

- **Four moods:** Create, Build, Organize and Learn. Click a button above the prompt, or type `/mood build`.
- **Tone:** each mood gives Claude a short instruction, such as "short and visual" for Create or "direct and practical" for Build.
- **Remembers you:** your last mood comes back in the next session.
- **A working cat:** in the desktop app a small cat walks while Claude runs tools and plays with yarn while it thinks. In a terminal you get a block-pixel version.
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
