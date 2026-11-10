import test from 'node:test'
import assert from 'node:assert/strict'
import { PLANS, USAGE_PRICES, FAQ, formatMoney, keplerPrice } from '../../src/app/(site)/kepler/pricing.ts'

test('formatMoney formats USD minor units', () => {
  assert.equal(formatMoney(2000, 'USD'), '$20.00')
  assert.equal(formatMoney(1600, 'USD'), '$16.00')
  assert.equal(formatMoney(0, 'USD'), '$0.00')
})

test('plans carry the agreed prices', () => {
  const byName = Object.fromEntries(PLANS.map((p) => [p.name, p]))
  assert.deepEqual(Object.keys(byName), ['Free', 'Pro', 'Team'])
  assert.deepEqual(byName.Pro.price, { monthly: 2000, annual: 1600 })
  assert.equal(byName.Pro.recommended, true)
  assert.equal(byName.Free.recommended, false)
  assert.equal(byName.Free.price.monthly, 0)
  assert.equal(byName.Team.price, null)
  assert.equal(byName.Pro.price.annual * 12, 19200)
})

test('keplerPrice is provider plus 10%, rounded to a cent', () => {
  assert.equal(keplerPrice(null), null)
  assert.equal(keplerPrice(300), 330)
  assert.equal(keplerPrice(125), 138)
  assert.equal(keplerPrice(105), 116)
  assert.equal(keplerPrice(1), 1)
})

test('usage rows and FAQ are present', () => {
  assert.deepEqual(USAGE_PRICES.map((r) => r.model), ['kepler-fast', 'kepler-expert'])
  assert.equal(FAQ.length, 3)
})
