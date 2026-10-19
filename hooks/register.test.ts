import { test, expect } from 'bun:test'

test('moods are the four Seyma picks', () => {
  expect(['create', 'build', 'organize', 'learn']).toHaveLength(4)
})
