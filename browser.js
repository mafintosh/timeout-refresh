class Timeout {
  constructor (ms, fn, ctx) {
    this.ms = ms
    this.ontimeout = fn
    this.context = ctx || null
    this.called = false
    this._timeout = setTimeout(call, ms, this)
  }

  refresh () {
    if (this.called || this.ontimeout === null) return
    clearTimeout(this._timeout)
    this._timeout = setTimeout(call, this.ms, this)
  }

  destroy () {
    this.ontimeout = null
    clearTimeout(this._timeout)
  }
}

function call (self) {
  self.called = true
  self.ontimeout.call(self.context)
}

module.exports = Timeout
