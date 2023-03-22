import { expect, it } from 'vitest'

function plusOne (num) {
  return num + 1
}

it('should be plus one', () => {
  expect(plusOne(2)).toBe(3)
})
