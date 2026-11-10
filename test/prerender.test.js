// Checks the prerendered page in dist/, so it runs after the build (`npm test` does both)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync('dist/index.html', 'utf8')
const rootStart = html.indexOf('<div id="root">')
const root = html.slice(rootStart, html.indexOf('<script', rootStart))

test('the meta descriptions carry the same years of experience as the hero', () => {
  assert.ok(!html.includes('__YEARS__'))
  const meta = html.match(/Software developer with (\d+) years/g)
  assert.equal(meta.length, 2)
  const hero = root.match(/<span>(\d+)<!-- --> years<\/span>/)[1]
  assert.ok(meta.every((line) => line.endsWith(`${hero} years`)))
})

test('the prerendered nav has no scroll state, so hydration matches', () => {
  assert.ok(!root.includes('aria-current'))
  assert.ok(!root.includes('nav-mark'))
})
