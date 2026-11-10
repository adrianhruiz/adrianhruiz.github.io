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

test('the hero links to the social profiles and the closing block to the email, once each', () => {
  const hero = root.slice(root.indexOf('<header'), root.indexOf('</header>'))
  const contact = root.slice(root.indexOf('id="contact"'), root.indexOf('</section>', root.indexOf('id="contact"')))
  assert.ok(hero.includes('linkedin.com') && hero.includes('github.com/adrianhruiz"'))
  assert.ok(!hero.includes('mailto:'))
  assert.ok(contact.includes('href="mailto:groveh8@gmail.com"'))
  assert.ok(contact.includes('>groveh8@gmail.com<'))
  assert.ok(!contact.includes('linkedin.com') && !contact.includes('github.com'))
})
