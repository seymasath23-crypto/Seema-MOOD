export type Mood = 'create' | 'build' | 'organize' | 'learn'

declare module 'claude-code' {
  interface PluginState {
    'seyma-mood': { mood: Mood; frame: number; isWorking: boolean; catMode: 'walk' | 'play' }
  }
}
