import { expect, it } from 'vitest'
import { inputValue } from '../src/runtime/shared/input-value'
it('preserves false, zero and empty text without converting absence to a fact', () => {
  expect(inputValue('boolean', false)).toBe(false)
  expect(inputValue('number', 0)).toBe(0)
  expect(inputValue('string', '')).toBe('')
  expect(inputValue('boolean', undefined)).toBeUndefined()
  expect(inputValue('string', null)).toBeUndefined()
})
it('does not coerce or mutate incompatible JSON drafts into valid component values', () => {
  const draft = { count: '4', value: { private: true } }
  expect(inputValue('number', draft.count)).toBeUndefined()
  expect(inputValue('string', draft.value)).toBeUndefined()
  expect(inputValue('boolean', [false])).toBeUndefined()
  expect(inputValue('number', Number.NaN)).toBeUndefined()
  expect(draft).toEqual({ count: '4', value: { private: true } })
})
