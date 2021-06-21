const timers = require('timers')

const noop = () => {}
const enroll = timers.enroll || noop // eslint-disable-line
const active = timers._unrefActive || timers.active || noop // eslint-disable-line
const unenroll = timers.unenroll || noop // eslint-disable-line

class Timeout {
  constructor (ms, ontimeout, context) {
    this.ms = ms
    this.ontimeout = ontimeout
    this.context = context || null
    this.called = false
    enroll(this, ms)
    active(this)
  }

  _onTimeout () {
    this.called = true
    this.ontimeout.call(this.context)
  }

  refresh () {
    if (this.called || this.ontimeout === null) return
    active(this)
  }

  destroy () {
    this.ontimeout = null
    unenroll(this)
  }
}

module.exports = Timeout
