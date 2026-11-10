import { test } from 'node:test'
import assert from 'node:assert/strict'
import { formatDuration, formatMonth, monthOf } from '../src/months.js'

test('formatDuration counts both the first and the last month', () => {
  assert.equal(formatDuration('2021-07', '2026-11'), '5 yrs 5 mos')
  assert.equal(formatDuration('2021-04', '2021-06'), '3 mos')
  assert.equal(formatDuration('2021-04', '2021-04'), '1 mo')
  assert.equal(formatDuration('2021-01', '2021-12'), '1 yr')
  assert.equal(formatDuration('2020-12', '2021-12'), '1 yr 1 mo')
  assert.equal(formatDuration('2021-07', '2026-06'), '5 yrs')
})

test('formatMonth names the month and monthOf zero-pads it', () => {
  assert.equal(formatMonth('2021-07'), 'Jul 2021')
  assert.equal(formatMonth('2021-12'), 'Dec 2021')
  assert.equal(monthOf(new Date(2026, 0, 5)), '2026-01')
  assert.equal(monthOf(new Date(2026, 10, 5)), '2026-11')
})
