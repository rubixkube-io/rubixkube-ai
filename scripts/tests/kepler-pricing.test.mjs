import test from 'node:test'
import assert from 'node:assert/strict'
import { PLANS, CREDIT, FAQ, formatMoney } from '../../src/app/(site)/kepler/pricing.ts'

test('formatMoney formats USD minor units', () => {
  assert.equal(formatMoney(2000, 'USD'), '$20.00')
  assert.equal(formatMoney(1600, 'USD'), '$16.00')
  assert.equal(formatMoney(0, 'USD'), '$0.00')
})

test('plans carry the agreed prices', () => {
  const byName = Object.fromEntries(PLANS.map((p) => [p.name, p]))
  assert.deepEqual(Object.keys(byName), ['Free', 'Pro'])
  assert.deepEqual(byName.Pro.price, { monthly: 2000, annual: 1600 })
  assert.equal(byName.Pro.recommended, true)
  assert.equal(byName.Free.recommended, false)
  assert.equal(byName.Free.price.monthly, 0)
  assert.equal(byName.Pro.price.annual * 12, 19200)
})

test('AI credit is a one-time buy, not a plan', () => {
  assert.equal(CREDIT.tag, 'One-time')
  assert.ok(!PLANS.some((p) => p.name === CREDIT.name))
})

test('Pro includes hosted models, not a dollar amount', () => {
  const pro = PLANS.find((p) => p.name === 'Pro')
  assert.ok(pro.includes.includes('Hosted models included'))
  assert.ok(!pro.includes.some((line) => line.includes('$')))
})

test('FAQ explains the limits', () => {
  assert.equal(FAQ.length, 4)
  assert.ok(FAQ.some((f) => f.answer.includes('every 5 hours') && f.answer.includes('every week')))
})
