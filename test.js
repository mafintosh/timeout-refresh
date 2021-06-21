const tape = require('tape')
const def = require('./index.js')
const browser = require('./browser.js')

run('', def)
run('browser: ', browser)

function run (prefix, Timeout) {
  tape(`${prefix}refresh`, t => {
    let refreshing = true
    let timedOut = false

    const ctx = {}
    const to = new Timeout(100, function () {
      t.ok(ctx === this)
      t.ok(!refreshing)
      timedOut = true
    }, ctx)

    const i = setInterval(() => {
      to.refresh()
    }, 50)

    setTimeout(() => {
      refreshing = false
      clearInterval(i)
      setTimeout(() => {
        t.ok(timedOut)
        t.end()
      }, 100)
    }, 500)
  })

  tape(`${prefix}destroy`, t => {
    let timedOut = false

    const to = new Timeout(100, () => {
      t.fail('should be destroyed')
      timedOut = true
    })

    const i = setInterval(() => {
      to.refresh()
    }, 50)

    setTimeout(() => {
      clearInterval(i)
      to.destroy()
      setTimeout(() => {
        t.ok(!timedOut)
        t.end()
      }, 100)
    }, 500)
  })

  tape(`${prefix}cannot be refreshed after call`, t => {
    t.plan(2)

    let timedOut = false

    const to = new Timeout(50, () => {
      t.notOk(timedOut, 'did not already timeout')
      t.pass('should be destroyed')
      to.refresh()
      timedOut = true
    })

    setTimeout(() => {
      t.end()
    }, 500)
  })
}
