const to = setTimeout(() => {}, 1000)
clearTimeout(to)

module.exports = to.refresh
  ? require('./refresh.js')
  : globalThis.process?.versions?.electron
    ? require('./browser.js')
    : require('./timers.js')
