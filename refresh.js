class Timeout {
  constructor (ms, fn, ctx) {
    this.ms = ms
    this.ontimeout = fn
    this.context = ctx || null
    this.called = false
    this._timeout = setTimeout(call, ms, this)
    this._timeout.unref()
  }

  refresh () {
    if (this.called || this.ontimeout === null) return
    this._timeout.refresh()
  }

  destroy () {
    this.ontimeout = null
    clearTimeout(this._timeout)
  }
}

function call (timer) {
  timer.called = true
  timer.ontimeout.call(timer.context)
}

module.exports = Timeout
